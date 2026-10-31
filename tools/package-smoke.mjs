// Exercise the actual tarball from an isolated consumer, without registry access.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const temporary = await mkdtemp(join(tmpdir(), "plumb-package-smoke-"));
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const run = (command, args, cwd = root) => execFileSync(command, args, { cwd, stdio: "inherit" });
try {
  // prepack builds from source; the smoke never invokes publishing lifecycle hooks.
  run(pnpm, ["pack", "--pack-destination", temporary]);
  const archives = (await readdir(temporary)).filter((name) => name.endsWith(".tgz"));
  assert.equal(archives.length, 1, "pack must create one tarball");
  const consumer = join(temporary, "consumer");
  const modules = join(consumer, "node_modules");
  const installed = join(modules, ...pkg.name.split("/"));
  await mkdir(installed, { recursive: true });
  run("tar", ["-xzf", join(temporary, archives[0]), "-C", installed, "--strip-components=1"]);
  const packedMetadata = JSON.parse(await readFile(join(installed, "package.json"), "utf8"));
  assert.equal(packedMetadata.license, pkg.license, "packed license metadata must match the source");
  for (const file of ["LICENSE", "docs/LICENSING.md"]) {
    const sourceText = await readFile(join(root, file), "utf8");
    assert.ok(sourceText.trim(), `${file} must not be empty`);
    assert.equal(await readFile(join(installed, file), "utf8"), sourceText, `${file} must ship unchanged`);
  }
  // Link only declared dependencies/peers plus compiler types. The package itself
  // is extracted, so its exports and relative declaration paths cannot use src/.
  const dependencies = new Set([...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {}), "@types"]);
  for (const dependency of dependencies) {
    const target = join(modules, dependency);
    await mkdir(dirname(target), { recursive: true });
    await symlink(join(root, "node_modules", dependency), target, process.platform === "win32" ? "junction" : "dir");
  }
  await writeFile(join(consumer, "package.json"), JSON.stringify({ private: true, type: "module" }));
  await writeFile(join(consumer, "smoke.tsx"), `import { Button, LocaleProvider, Money, ThemeProvider, ToastProvider } from ${JSON.stringify(pkg.name)};
export const app = <LocaleProvider locale="en-CA" currency="CAD"><ThemeProvider theme="light"><Money amount={31580}/><Button variant="primary">Send proposal</Button><ToastProvider/></ThemeProvider></LocaleProvider>;
`);
  run(process.execPath, [join(root, "node_modules/typescript/bin/tsc"), "smoke.tsx", "--noEmit", "--strict", "--skipLibCheck", "false", "--module", "NodeNext", "--moduleResolution", "NodeNext", "--jsx", "react-jsx", "--target", "ES2022", "--resolveJsonModule", "--esModuleInterop"], consumer);
  await writeFile(join(consumer, "smoke.mjs"), `import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import React from "react";
import { renderToString } from "react-dom/server";
import { Button, LocaleProvider, Money, ThemeProvider, ToastProvider } from ${JSON.stringify(pkg.name)};
const require = createRequire(import.meta.url);
const html = renderToString(React.createElement(LocaleProvider, { locale: "en-CA", currency: "CAD" }, React.createElement(ThemeProvider, { theme: "light" }, React.createElement(Money, { amount: 31580 }), React.createElement(Button, { variant: "primary" }, "Send proposal"), React.createElement(ToastProvider))));
assert.match(html, /31,580\\.00/);
assert.match(html, /Send proposal/);
for (const asset of ["styles.css", "fonts.css", "i18n/en.json", "i18n/fr.json"]) {
  const contents = await readFile(require.resolve(${JSON.stringify(pkg.name)} + "/" + asset), "utf8");
  assert.ok(contents.length, asset + " must not be empty");
  if (asset.endsWith(".json")) assert.ok(Object.keys(JSON.parse(contents)).length);
  if (asset === "fonts.css") {
    for (const match of contents.matchAll(/@import\\s+["']([^"']+)["']/g)) assert.ok(require.resolve(match[1]));
  }
}
console.log("Packed consumer: strict NodeNext types, ESM/SSR, CSS, fonts and both locales passed.");
`);
  run(process.execPath, ["smoke.mjs"], consumer);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
