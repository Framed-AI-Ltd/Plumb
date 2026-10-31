// Screenshot changes are review evidence, never automatic visual approval.
import { readdir, readFile, mkdir, writeFile, appendFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

export function captureKey(path) {
  return path.replaceAll('\\', '/').replace(/^stories-responsive-story-rendering-and-visual-evidence-(\d+-(?:light|dark))\//, '$1/');
}

async function inventory(dir) {
  const result = new Map();
  async function walk(path) {
    for (const entry of await readdir(path, { withFileTypes: true })) {
      const file = join(path, entry.name);
      if (entry.isDirectory()) { if (entry.name !== 'attachments') await walk(file); }
      else if (entry.name.endsWith('.png')) result.set(captureKey(relative(dir, file)), await readFile(file));
    }
  }
  await walk(dir);
  return result;
}

export async function compareCaptures(base, head, out, capturedOnly = false) {
  const a = await inventory(base), b = await inventory(head);
  const hash = bytes => bytes ? createHash('sha256').update(bytes).digest('hex') : null;
  const names = capturedOnly ? [...b.keys()] : [...new Set([...a.keys(), ...b.keys()])];
  const rows = names.sort().map(name => ({ name, base: hash(a.get(name)), head: hash(b.get(name)) }));
  if (!b.size || !rows.length) throw new Error('No proposed visual captures found');
  const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  const img = bytes => bytes ? `<img src="data:image/png;base64,${bytes.toString('base64')}" alt="story capture">` : '<p>Absent</p>';
  await mkdir(out, { recursive: true });
  await writeFile(join(out, 'report.json'), JSON.stringify(rows, null, 2));
  await writeFile(join(out, 'index.html'), `<!doctype html><meta charset="utf-8"><title>Visual review evidence</title><style>body{font:16px system-ui}section{border-top:1px solid;overflow:auto}.pair{display:flex;gap:16px}.pair>div{flex:1;min-width:0}img{max-width:100%}</style><h1>Visual review evidence</h1><p>Pixel differences are advisory and may include platform rendering. Inspect changes; this report does not grant owner approval.</p>${rows.map(row => `<section><h2>${esc(row.name)} — ${row.base === row.head ? 'identical' : 'changed'}</h2><div class="pair"><div><h3>Reference</h3>${img(a.get(row.name))}</div><div><h3>Proposed</h3>${img(b.get(row.name))}</div></div></section>`).join('')}`);
  return rows;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [base, head, out = 'visual-diff'] = process.argv.slice(2);
  if (!base || !head) throw new Error('Usage: node tools/visual-diff.mjs BASE HEAD [OUT] [--captured-only]');
  const rows = await compareCaptures(base, head, out, process.argv.includes('--captured-only'));
  const summary = `${rows.filter(row => row.base !== row.head).length}/${rows.length} captures changed; inspect ${out}/index.html. Pixel changes are advisory; rendering and accessibility checks remain blocking.`;
  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary + '\n');
}
