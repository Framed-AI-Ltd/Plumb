// Checks the message catalogues: every locale has every key, the same {placeholders}, and the same plural
// shape; every key is used by a component; every key a component asks for exists.
import { readFile, readdir } from "node:fs/promises";

const dir = "src/i18n";
const locales = Object.fromEntries(await Promise.all((await readdir(dir)).filter((f) => f.endsWith(".json")).map(async (f) => [f.replace(".json", ""), JSON.parse(await readFile(`${dir}/${f}`, "utf8"))])));
const en = locales.en;
const holes = (v) => [...JSON.stringify(v).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
const problems = [];
for (const [lang, cat] of Object.entries(locales)) {
  for (const k of Object.keys(en)) {
    if (!(k in cat)) problems.push(`${lang}: missing "${k}"`);
    else if (typeof en[k] !== typeof cat[k]) problems.push(`${lang}: "${k}" must be ${typeof en[k] === "string" ? "a string" : "plural forms"}`);
    else if (holes(en[k]) !== holes(cat[k])) problems.push(`${lang}: "${k}" placeholders {${holes(cat[k])}} differ from en {${holes(en[k])}}`);
    if (typeof cat[k] === "object" && !("other" in cat[k])) problems.push(`${lang}: "${k}" needs an "other" form`);
  }
  for (const k of Object.keys(cat)) if (!(k in en)) problems.push(`${lang}: extra key "${k}"`);
}

// Usage: literal keys in t("…")/plural("…")/rich("…"), plus keys built from a prefix in template literals.
const files = [];
async function readSource(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await readSource(path);
    else if (/\.tsx?$/.test(entry.name)) files.push(await readFile(path, "utf8"));
  }
}
await readSource("src");
const src = files.join("\n");
const used = new Set([...src.matchAll(/\b(?:t|plural|rich)\(\s*"(\w+)"/g)].map((m) => m[1]));
for (const m of src.matchAll(/\b(?:t|plural)\(\s*\w+\s*\?\s*"(\w+)"\s*:\s*"(\w+)"/g)) { used.add(m[1]); used.add(m[2]); }
for (const m of src.matchAll(/t\(\s*\w+\s*===\s*"\w+"\s*\?\s*"(\w+)"\s*:\s*\w+\s*===\s*"\w+"\s*\?\s*"(\w+)"\s*:\s*"(\w+)"/g)) [1, 2, 3].forEach((i) => used.add(m[i]));
for (const m of src.matchAll(/"(\w+)"/g)) if (m[1] in en) used.add(m[1]);
const prefixes = [...src.matchAll(/`(\w+_)\$\{/g)].map((m) => m[1]);
for (const k of Object.keys(en)) if (!used.has(k) && !prefixes.some((p) => k.startsWith(p))) problems.push(`unused key "${k}"`);
for (const k of used) if (/^[a-z]\w*$/.test(k) && !(k in en) && new RegExp(`\\b(?:t|plural|rich)\\(\\s*"${k}"`).test(src)) problems.push(`missing key "${k}" (used in a component)`);

if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log(`i18n: ${Object.keys(en).length} keys × ${Object.keys(locales).length} locales, placeholders and plurals match.`);
