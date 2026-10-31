import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { checkStaged } from './pre-commit.mjs';

test('release archives are ignored while the release procedure remains trackable', () => {
  const root = mkdtempSync(join(tmpdir(), 'plumb-ignore-test-'));
  try {
    execFileSync('git', ['init', '-q', root]);
    writeFileSync(join(root, '.gitignore'), readFileSync(new URL('../.gitignore', import.meta.url)));
    const ignored = execFileSync('git', ['-C', root, 'check-ignore', '--stdin'], {
      input: 'release/package.tgz\n.agents/skills/release/SKILL.md\n', encoding: 'utf8',
    }).trim().split('\n');
    assert.deepEqual(ignored, ['release/package.tgz']);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

function fixture(run) {
  const root = mkdtempSync(join(tmpdir(), 'plumb-hook-test-'));
  try {
    execFileSync('git', ['init', '-q', root]);
    mkdirSync(join(root, 'node_modules'));
    writeFileSync(join(root, 'source.ts'), 'staged invalid code');
    execFileSync('git', ['-C', root, 'add', 'source.ts']);
    writeFileSync(join(root, 'source.ts'), 'unstaged fixed code');
    run(root);
    assert.equal(readFileSync(join(root, 'source.ts'), 'utf8'), 'unstaged fixed code');
    assert.equal(execFileSync('git', ['-C', root, 'show', ':source.ts'], { encoding: 'utf8' }), 'staged invalid code');
  } finally { rmSync(root, { recursive: true, force: true }); }
}

test('checks staged content, propagates failure, and preserves index/working tree', () => fixture(root => {
  let snapshot;
  const status = checkStaged(root, (_command, args, options) => {
    assert.deepEqual(args, ['check:static']);
    snapshot = options.cwd;
    assert.equal(readFileSync(join(snapshot, 'source.ts'), 'utf8'), 'staged invalid code');
    assert(existsSync(join(snapshot, 'node_modules')));
    return { status: 1 };
  });
  assert.equal(status, 1);
  assert(!existsSync(snapshot));
}));

test('passing static checks allow the commit and clean up the snapshot', () => fixture(root => {
  let snapshot;
  assert.equal(checkStaged(root, (_command, _args, options) => {
    snapshot = options.cwd;
    return { status: 0 };
  }), 0);
  assert(!existsSync(snapshot));
}));

test('missing check executable blocks the commit and cleans up', () => fixture(root => {
  let snapshot;
  assert.equal(checkStaged(root, (_command, _args, options) => {
    snapshot = options.cwd;
    return { status: null, error: new Error('missing pnpm') };
  }), 1);
  assert(!existsSync(snapshot));
}));
