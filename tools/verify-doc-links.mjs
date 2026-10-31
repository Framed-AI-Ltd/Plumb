import { readFile, readdir, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function missingLinks(paths) {
  const missing = [];
  for (const file of paths) {
    const text = await readFile(file, 'utf8');
    for (const match of text.matchAll(/(?<!!)\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)/g)) {
      const link = match[1].replace(/^<|>$/g, '');
      if (/^[a-z][a-z0-9+.-]*:/i.test(link) || link.startsWith('#')) continue;
      const target = decodeURIComponent(link.split('#')[0].split('?')[0]);
      if (!target) continue;
      try { await access(resolve(dirname(file), target)); }
      catch { missing.push({ file, line: text.slice(0, match.index).split('\n').length, target: link }); }
    }
  }
  return missing;
}
async function markdown(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await markdown(path));
    else if (/\.mdx?$/.test(entry.name)) result.push(path);
  }
  return result;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const paths = ['README.md', 'CONTRIBUTING.md', 'AGENTS.md', 'CLAUDE.md'];
  for (const directory of ['docs', '.agents', 'stories', 'licenses', 'patches']) paths.push(...await markdown(directory));
  const missing = await missingLinks(paths);
  if (missing.length) {
    for (const item of missing) console.error(`${item.file}:${item.line}: missing ${item.target}`);
    process.exitCode = 1;
  } else console.log(`Relative documentation links verified in ${paths.length} files.`);
}
