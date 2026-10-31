import assert from 'node:assert/strict';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(new URL('../package.json', import.meta.url));
const notices = [
  ['inter.txt', join(dirname(require.resolve('@fontsource-variable/inter/package.json')), 'LICENSE')],
  ['plus-jakarta-sans.txt', join(dirname(require.resolve('@fontsource-variable/plus-jakarta-sans/package.json')), 'LICENSE')],
  ['nunito-sans.txt', join(root, 'licenses/nunito-sans.txt')],
];
async function* files(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else if (entry.isFile()) yield path;
  }
}
export async function copyFontNotices(output) {
  await mkdir(join(output, 'licenses'), { recursive: true });
  for (const [name, source] of notices) await writeFile(join(output, 'licenses', name), await readFile(source));
  await writeFile(join(output, 'licenses/index.html'), '<!doctype html><meta charset="utf-8"><title>Font licences</title><h1>Font licences</h1><ul>' +
    notices.map(([name]) => `<li><a href="${name}">${name}</a></li>`).join('') + '</ul>');
}
export async function verifyFontNotices(output) {
  for (const [name, source] of notices) {
    const expected = await readFile(source, 'utf8');
    assert.match(expected, /SIL OPEN FONT LICENSE Version 1\.1/, `${name}: full OFL text required`);
    assert.equal(await readFile(join(output, 'licenses', name), 'utf8'), expected, `${name}: notice must ship unchanged`);
  }
  let fonts = 0;
  for await (const path of files(output)) {
    if (!/\.woff2?$/i.test(path)) continue;
    assert.match(basename(path), /^(inter|plus-jakarta-sans|nunito-sans)[.-]/i, `Add a notice for the bundled font: ${path}`);
    fonts++;
  }
  assert(fonts > 0, 'Expected bundled Storybook fonts');
  console.log(`${fonts} font assets covered by three unchanged OFL notices.`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const output = resolve('storybook-static');
  if (!process.argv.includes('--check')) await copyFontNotices(output);
  await verifyFontNotices(output);
}
