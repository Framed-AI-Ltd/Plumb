import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { captureKey, compareCaptures } from './visual-diff.mjs';

test('Playwright capture keys match committed reference keys across platforms', () => {
  assert.equal(captureKey('stories-responsive-story-rendering-and-visual-evidence-360-light/buttons--default.png'), '360-light/buttons--default.png');
  assert.equal(captureKey('stories-responsive-story-rendering-and-visual-evidence-1440-dark\\buttons--default.png'), '1440-dark/buttons--default.png');
});

test('selected evidence reports changes and missing references without inventing absent uncaptured failures', async () => {
  const root = await mkdtemp(join(tmpdir(), 'plumb-visual-evidence-'));
  try {
    const base = join(root, 'base'), head = join(root, 'head'), out = join(root, 'out');
    await mkdir(join(base, '360-light'), { recursive: true });
    await mkdir(join(base, '768-light'), { recursive: true });
    await mkdir(join(head, 'stories-responsive-story-rendering-and-visual-evidence-360-light', 'attachments'), { recursive: true });
    await writeFile(join(base, '360-light', 'buttons--default.png'), 'reference');
    await writeFile(join(base, '768-light', 'buttons--default.png'), 'uncaptured tablet');
    const folder = join(head, 'stories-responsive-story-rendering-and-visual-evidence-360-light');
    await writeFile(join(folder, 'buttons--default.png'), 'changed');
    await writeFile(join(folder, 'new--story.png'), 'new');
    await writeFile(join(folder, 'attachments', 'duplicate.png'), 'ignore');
    const rows = await compareCaptures(base, head, out, true);
    assert.equal(rows.length, 2);
    assert.notEqual(rows[0].base, rows[0].head);
    assert.equal(rows[1].base, null);
    assert.match(await readFile(join(out, 'index.html'), 'utf8'), /does not grant owner approval/);
    await rm(head, { recursive: true }); await mkdir(head);
    await assert.rejects(compareCaptures(base, head, out, true), /No proposed visual captures/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
