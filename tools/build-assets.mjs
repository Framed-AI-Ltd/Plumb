// Copies the non-JS parts of the package into dist/ after `vite build` and `tsc`:
// - styles.css: base + vendor calendar bridge + compiled StyleX recipes/themes (plain CSS, concatenated in cascade order; no fonts)
// - fonts.css: the optional @fontsource imports
// - i18n/*.json: message catalogues, also referenced by the type declarations
// It also gives the declarations explicit `.js` extensions and JSON import attributes, which `nodenext`
// TypeScript projects require (bundler-resolution projects accept either).
import { cp, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

await mkdir("dist/i18n", { recursive: true });
const atomicAssets = (await readdir("dist/assets")).filter((name) => name.endsWith(".css")).map((name) => `assets/${name}`);
if (atomicAssets.length === 0) throw new Error("StyleX did not emit the compiled component and theme CSS");
const parts = await Promise.all([
  ...["base", "components"].map((name) => readFile(`src/styles/${name}.css`, "utf8")),
  ...atomicAssets.map((name) => readFile(`dist/${name}`, "utf8")),
]);
await writeFile("dist/styles.css", parts.join("\n"));
await cp("src/styles/fonts.css", "dist/fonts.css");
await cp("src/i18n", "dist/i18n", { recursive: true });
await cp("src/i18n", "dist/types/i18n", { recursive: true });

const exists = (p) => stat(p).then(() => true, () => false);
async function* walk(d) { for (const e of await readdir(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) yield* walk(p); else if (p.endsWith(".d.ts")) yield p; } }
for await (const file of walk("dist/types")) {
  const text = await readFile(file, "utf8");
  let out = "";
  let last = 0;
  for (const m of text.matchAll(/(from\s+|import\()(["'])(\.{1,2}\/[^"']+)\2/g)) {
    const spec = m[3];
    const base = join(dirname(file), spec);
    const typeOnly = /(?:import|export)\s+type\b[^;\n]*$/.test(text.slice(0, m.index));
    const fixed = spec.endsWith(".json") ? `${m[2]}${spec}${m[2]}${typeOnly ? "" : ' with { type: "json" }'}`
      : await exists(`${base}.d.ts`) ? `${m[2]}${spec}.js${m[2]}` : await exists(join(base, "index.d.ts")) ? `${m[2]}${spec}/index.js${m[2]}` : `${m[2]}${spec}${m[2]}`;
    out += text.slice(last, m.index) + m[1] + fixed;
    last = m.index + m[0].length;
  }
  await writeFile(file, out + text.slice(last));
}
console.log("dist: styles.css, fonts.css, i18n/, nodenext-ready declarations");
