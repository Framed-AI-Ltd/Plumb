import ts from "typescript";
import { readdir, readFile } from "node:fs/promises";
import { resolve, dirname, relative } from "node:path";
import { pathToFileURL } from "node:url";

export function findCycles(graph) {
  const done = new Set(), active = new Set(), stack = [], cycles = [];
  function visit(file) {
    if (active.has(file)) { cycles.push([...stack.slice(stack.indexOf(file)), file]); return; }
    if (done.has(file)) return;
    active.add(file); stack.push(file);
    for (const dependency of graph.get(file) ?? []) visit(dependency);
    stack.pop(); active.delete(file); done.add(file);
  }
  for (const file of graph.keys()) visit(file);
  return cycles;
}

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => {
    const file = resolve(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(file) : /\.[jt]sx?$/.test(file) ? [file] : [];
  }))).flat();
}

export async function verifyImports(root = resolve("src")) {
  const files = await sourceFiles(root), graph = new Map();
  for (const file of files) {
    const source = ts.createSourceFile(file, await readFile(file, "utf8"), ts.ScriptTarget.Latest, true);
    const dependencies = [];
    for (const node of source.statements) {
      if ((!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) || !node.moduleSpecifier || node.isTypeOnly || node.importClause?.isTypeOnly) continue;
      // A named import/export containing only explicit type specifiers has no runtime edge.
      const bindings = node.importClause?.namedBindings ?? node.exportClause;
      if (bindings && "elements" in bindings && bindings.elements.length && bindings.elements.every(item => item.isTypeOnly) && !node.importClause?.name) continue;
      const specifier = node.moduleSpecifier.text;
      if (!specifier.startsWith(".")) continue;
      const target = ts.resolveModuleName(specifier, file, { moduleResolution: ts.ModuleResolutionKind.Bundler, resolveJsonModule: true }, ts.sys).resolvedModule?.resolvedFileName;
      if (!target) throw new Error(`Unresolved import ${relative(root, file)} -> ${specifier}`);
      if (target.startsWith(root + "/") && !target.endsWith(".json")) dependencies.push(resolve(dirname(file), relative(dirname(file), target)));
    }
    graph.set(file, dependencies);
  }
  const cycles = findCycles(graph);
  if (cycles.length) throw new Error(`Runtime import cycles:\n${cycles.map(cycle => cycle.map(file => relative(root, file)).join(" -> ")).join("\n")}`);
  console.log(`Import graph: ${files.length} files, no runtime cycles or unresolved relative imports.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await verifyImports();
