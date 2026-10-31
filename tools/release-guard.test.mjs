import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const guard = fileURLToPath(new URL('./release-guard.mjs', import.meta.url));

test('publication accepts the registered npm scope and rejects another organization', () => {
  const root = mkdtempSync(join(tmpdir(), 'plumb-release-identity-'));
  try {
    writeFileSync(join(root, 'LICENSE'), '# PolyForm Noncommercial License 1.0.0\n');
    writeFileSync(join(root, 'CHANGELOG.md'), '## [0.0.1] - 2026-10-31\n');
    for (const name of ['@framed-ai/plumb', '@unregistered-org/plumb']) {
      writeFileSync(join(root, 'package.json'), JSON.stringify({ name, version: '0.0.1', license: 'PolyForm-Noncommercial-1.0.0' }));
      const result = spawnSync(process.execPath, [guard], { cwd: root, encoding: 'utf8' });
      if (name === '@framed-ai/plumb') {
        assert.equal(result.status, 0, result.stderr);
      } else {
        assert.equal(result.status, 1);
        assert.match(result.stderr, /must publish as @framed-ai\/plumb/);
      }
    }
  } finally { rmSync(root, { recursive: true, force: true }); }
});
