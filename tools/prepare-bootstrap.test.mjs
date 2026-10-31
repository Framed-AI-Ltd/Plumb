import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { prepareBootstrap } from './prepare-bootstrap.mjs';

test('bootstrap preparation changes only a temporary prerelease, preserving the stable archive', () => {
  const directory = mkdtempSync(join(tmpdir(), 'plumb-bootstrap-test-'));
  try {
    const pkg = join(directory, 'package'); mkdirSync(pkg);
    const metadata = { name: '@framed/plumb', version: '0.0.1', license: 'PolyForm-Noncommercial-1.0.0', scripts: { prepare: 'must-not-run' }, devEngines: {} };
    writeFileSync(join(pkg, 'package.json'), JSON.stringify(metadata));
    writeFileSync(join(pkg, 'README.md'), '# Stable package');
    const original = join(directory, 'stable.tgz');
    execFileSync('tar', ['-czf', original, '-C', directory, 'package']);
    const bytes = readFileSync(original);
    const result = prepareBootstrap(original, join(directory, 'output'));
    const actual = JSON.parse(execFileSync('tar', ['-xOf', result, 'package/package.json'], { encoding: 'utf8' }));
    assert.equal(actual.version, '0.0.1-bootstrap.0');
    assert.equal(actual.license, metadata.license);
    assert(!actual.scripts && !actual.devEngines);
    assert.deepEqual(readFileSync(original), bytes);
    assert.deepEqual(JSON.parse(readFileSync(join(pkg, 'package.json'), 'utf8')), metadata);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
