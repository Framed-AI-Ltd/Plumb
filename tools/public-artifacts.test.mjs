import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { copyFontNotices, verifyFontNotices } from './font-notices.mjs';
import { missingLinks } from './verify-doc-links.mjs';

test('a Storybook font artifact is rejected without its notices or with an uncredited family', async () => {
  const output = await mkdtemp(join(tmpdir(), 'plumb-font-notices-'));
  try {
    await mkdir(join(output, 'assets'));
    await writeFile(join(output, 'assets/inter-test.woff2'), 'synthetic font fixture');
    await assert.rejects(verifyFontNotices(output));
    await copyFontNotices(output);
    await verifyFontNotices(output);
    await rm(join(output, 'licenses/inter.txt'));
    await assert.rejects(verifyFontNotices(output));
    await copyFontNotices(output);
    await writeFile(join(output, 'assets/uncredited-test.woff2'), 'synthetic font fixture');
    await assert.rejects(verifyFontNotices(output), /Add a notice/);
  } finally { await rm(output, { recursive: true, force: true }); }
});

test('documentation links fail for a missing local target, while anchors and external links remain valid', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'plumb-doc-links-'));
  try {
    const file = join(directory, 'README.md');
    await writeFile(file, '[missing](guide.md)\n[anchor](#heading)\n[external](https://example.test)');
    assert.deepEqual(await missingLinks([file]), [{ file, line: 1, target: 'guide.md' }]);
    await writeFile(join(directory, 'guide.md'), '# Guide');
    assert.deepEqual(await missingLinks([file]), []);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
