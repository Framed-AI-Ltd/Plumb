import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { selectRelease } from './release-selection.mjs';

function fixture(run) {
  const root = mkdtempSync(join(tmpdir(), 'plumb-release-selection-'));
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  try {
    git('init', '-q', '-b', 'main');
    git('config', 'user.name', 'Synthetic Release'); git('config', 'user.email', 'release@example.test');
    git('config', 'commit.gpgsign', 'false'); git('config', 'tag.gpgsign', 'false');
    const pkg = { name: '@framed-ai/plumb', version: '0.0.1', license: 'PolyForm-Noncommercial-1.0.0', repository: { url: 'git+https://github.com/Framed-AI-Ltd/Plumb.git' } };
    writeFileSync(join(root, 'package.json'), JSON.stringify(pkg));
    git('add', '.'); git('commit', '-qm', 'Synthetic release');
    const tagCommit = git('rev-parse', 'HEAD'); git('tag', 'v0.0.1');
    writeFileSync(join(root, 'README.md'), 'Release controls updated');
    git('add', '.'); git('commit', '-qm', 'Synthetic workflow correction');
    const main = git('rev-parse', 'HEAD'); git('update-ref', 'refs/remotes/origin/main', main);
    run({ git, root, main, tagCommit, pkg });
  } finally { rmSync(root, { recursive: true, force: true }); }
}
const manual = main => ({ GITHUB_REPOSITORY: 'Framed-AI-Ltd/Plumb', GITHUB_EVENT_NAME: 'workflow_dispatch', GITHUB_REF: 'refs/heads/main', GITHUB_SHA: main });
const input = { inputs: { release_tag: 'v0.0.1' } };

test('protected retry resolves the exact unchanged historical tag, not the workflow revision', () => fixture(({ git, main, tagCommit }) => {
  assert.deepEqual(selectRelease(manual(main), input, git), { commit: tagCommit, tag: 'v0.0.1' });
  assert.notEqual(tagCommit, main);
  assert.throws(() => selectRelease({ ...manual(main), GITHUB_REF: 'refs/heads/feature/unsafe' }, input, git), /protected main/);
  assert.throws(() => selectRelease(manual(tagCommit), input, git), /current main/);
  assert.throws(() => selectRelease({ ...manual(main), GITHUB_REPOSITORY: 'fork/Plumb' }, input, git));
  for (const release_tag of ['main', '--help', 'v0.0.1;echo bad', 'v0.0.1\ncommit=bad']) {
    assert.throws(() => selectRelease(manual(main), { inputs: { release_tag } }, git), /stable release tag/);
  }
}));

test('normal tag publication still requires current main and rejects stale or mismatched source', () => fixture(({ git, main, tagCommit }) => {
  const push = { ...manual(main), GITHUB_EVENT_NAME: 'push', GITHUB_REF: 'refs/tags/v0.0.1', GITHUB_SHA: tagCommit };
  assert.throws(() => selectRelease(push, {}, git), /current main/);
  git('update-ref', 'refs/remotes/origin/main', tagCommit);
  assert.equal(selectRelease(push, {}, git).commit, tagCommit);
  assert.throws(() => selectRelease({ ...push, GITHUB_SHA: main }, {}, git), /tagged source/);
}));

test('retry rejects unmerged tags and mismatched package identities or versions', () => fixture(({ git, root, main, tagCommit, pkg }) => {
  git('checkout', '-qb', 'unmerged', tagCommit);
  writeFileSync(join(root, 'README.md'), 'Unmerged source');
  writeFileSync(join(root, 'package.json'), JSON.stringify({ ...pkg, version: '0.0.2' }));
  git('add', '.'); git('commit', '-qm', 'Unmerged'); git('tag', 'v0.0.2');
  assert.throws(() => selectRelease(manual(main), { inputs: { release_tag: 'v0.0.2' } }, git));
  git('checkout', '-q', 'main'); git('tag', 'v9.9.9');
  assert.throws(() => selectRelease(manual(main), { inputs: { release_tag: 'v9.9.9' } }, git));
  writeFileSync(join(root, 'package.json'), JSON.stringify({ ...pkg, name: '@wrong/plumb', version: '0.0.3' }));
  git('add', '.'); git('commit', '-qm', 'Wrong scope'); git('tag', 'v0.0.3');
  const wrong = git('rev-parse', 'HEAD'); git('update-ref', 'refs/remotes/origin/main', wrong);
  assert.throws(() => selectRelease(manual(wrong), { inputs: { release_tag: 'v0.0.3' } }, git), /framed-ai/);
}));

test('release workflow checks out the selected commit and retains credential isolation', () => {
  const workflow = readFileSync(new URL('../.github/workflows/publish.yml', import.meta.url), 'utf8');
  assert.match(workflow, /ref: \$\{\{ steps.source.outputs.commit \}\}/);
  assert.match(workflow, /working-directory: release-source/);
  assert(workflow.indexOf('path: release-source') < workflow.indexOf('- run: npm install --global'), 'Tagged-source directory must exist before default-directory commands');
  assert.match(workflow, /path: release-source\/release\/\*\.tgz/);
  const publisher = workflow.split('\n  publish:')[1];
  assert.match(publisher, /needs: verify/); assert.match(publisher, /environment: npm/);
  assert.match(publisher, /id-token: write/); assert.doesNotMatch(publisher, /actions\/checkout/);
  const configure = readFileSync(new URL('./configure-repository.mjs', import.meta.url), 'utf8');
  assert.match(configure, /name: 'main', type: 'branch'/);
});
