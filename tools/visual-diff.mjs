// Side-by-side PR evidence from base/head capture directories; no baseline acceptance.
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';
const [base, head, out = 'visual-diff'] = process.argv.slice(2);
if (!base || !head) throw new Error('Usage: node tools/visual-diff.mjs BASE_CAPTURE HEAD_CAPTURE [OUT]');
async function inventory(dir) {
  const result = new Map();
  async function walk(path) { for (const e of await readdir(path, { withFileTypes: true })) { const file = join(path, e.name); if (e.isDirectory()) { if (e.name !== 'attachments') await walk(file); } else if (e.name.endsWith('.png')) result.set(relative(dir, file), await readFile(file)); } }
  await walk(dir); return result;
}
const a = await inventory(base), b = await inventory(head);
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const hash = bytes => bytes ? createHash('sha256').update(bytes).digest('hex') : null;
const rows = [...new Set([...a.keys(), ...b.keys()])].sort().map(name => ({ name, base: hash(a.get(name)), head: hash(b.get(name)) }));
if (!rows.length) throw new Error('No visual captures found');
await mkdir(out, { recursive: true });
await writeFile(join(out, 'report.json'), JSON.stringify(rows, null, 2));
const image = bytes => bytes ? `<img src="data:image/png;base64,${bytes.toString('base64')}" alt="story capture">` : '<p>Absent</p>';
await writeFile(join(out, 'index.html'), `<!doctype html><meta charset="utf-8"><title>PR visual comparison</title><style>body{font:16px system-ui}section{border-top:1px solid;overflow:auto}.pair{display:flex;gap:16px}.pair>div{flex:1;min-width:0}img{max-width:100%}</style><h1>PR base/head visual evidence</h1><p>Byte changes flag captures for inspection; they are not visual approval.</p>${rows.map(r => `<section><h2>${esc(r.name)} — ${r.base === r.head ? 'identical' : 'changed'}</h2><div class="pair"><div><h3>Base</h3>${image(a.get(r.name))}</div><div><h3>Head</h3>${image(b.get(r.name))}</div></div></section>`).join('')}`);
console.log(`${rows.filter(r => r.base !== r.head).length}/${rows.length} captures changed; inspect ${out}/index.html`);
