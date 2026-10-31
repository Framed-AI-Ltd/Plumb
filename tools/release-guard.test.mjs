import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, readFileSync, mkdirSync, chmodSync, realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

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

test('publisher expands exactly one archive as a local npm file spec, never GitHub shorthand', () => {
  const root = mkdtempSync(join(tmpdir(), 'plumb-publish-path-'));
  const workflow = readFileSync(new URL('../.github/workflows/publish.yml', import.meta.url), 'utf8');
  const script = workflow.split('name: Trusted publisher (no npm token)')[1].split('run: |')[1]
    .split('\n').filter(line => line.startsWith('          ')).map(line => line.slice(10)).join('\n');
  const globalRoot = spawnSync('npm', ['root', '-g'], { encoding: 'utf8' });
  assert.equal(globalRoot.status, 0, globalRoot.stderr);
  const executable = spawnSync('which', ['npm'], { encoding: 'utf8' });
  assert.equal(executable.status, 0, executable.stderr);
  // pnpm's managed Node can change npm's prefix without moving the npm executable.
  const candidates = [realpathSync(executable.stdout.trim()), join(globalRoot.stdout.trim(), 'npm/package.json')];
  const parser = candidates.flatMap(path => {
    try { return [createRequire(path).resolve('npm-package-arg')]; } catch { return []; }
  })[0];
  assert(parser, 'The installed npm parser must be available');
  try {
    mkdirSync(join(root, 'bin')); mkdirSync(join(root, 'release'));
    const stub = join(root, 'bin/npm');
    writeFileSync(stub, `#!/usr/bin/env node
const assert = require('node:assert/strict');
const spec = require(${JSON.stringify(parser)});
assert.equal(process.argv[2], 'publish');
assert.equal(spec(process.argv[3]).type, 'file');
assert(process.argv.includes('--ignore-scripts'));
assert(process.argv.includes('--provenance'));
`);
    chmodSync(stub, 0o755);
    const run = () => spawnSync('bash', ['-e', '-o', 'pipefail', '-c', script], {
      cwd: root, env: { ...process.env, PATH: `${join(root, 'bin')}:${process.env.PATH}` }, encoding: 'utf8',
    });
    assert.notEqual(run().status, 0, 'Missing archives must fail');
    writeFileSync(join(root, 'release/framed-ai-plumb-0.0.1.tgz'), 'synthetic');
    const result = run(); assert.equal(result.status, 0, result.stderr);
    writeFileSync(join(root, 'release/unexpected.tgz'), 'synthetic');
    assert.notEqual(run().status, 0, 'Ambiguous archives must fail');
  } finally { rmSync(root, { recursive: true, force: true }); }
});
