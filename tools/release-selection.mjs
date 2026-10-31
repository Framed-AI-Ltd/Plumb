import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function selectRelease(env, event, git) {
  assert.equal(env.GITHUB_REPOSITORY, 'Framed-AI-Ltd/Plumb');
  const manual = env.GITHUB_EVENT_NAME === 'workflow_dispatch';
  assert(manual || env.GITHUB_EVENT_NAME === 'push', 'Unsupported release event');
  const tag = manual ? event.inputs?.release_tag : env.GITHUB_REF?.replace(/^refs\/tags\//, '');
  assert.match(tag ?? '', /^v\d+\.\d+\.\d+$/, 'A stable release tag is required');
  const main = git('rev-parse', 'origin/main');
  const commit = git('rev-parse', `refs/tags/${tag}^{commit}`);
  assert.match(commit, /^[a-f0-9]{40}$/);
  if (manual) {
    assert.equal(env.GITHUB_REF, 'refs/heads/main', 'Retries must run from protected main');
    assert.equal(env.GITHUB_SHA, main, 'Retry controls must match current main');
    git('merge-base', '--is-ancestor', commit, main);
  } else {
    assert.equal(env.GITHUB_REF, `refs/tags/${tag}`);
    assert.equal(env.GITHUB_SHA, commit, 'Tag event must match tagged source');
    assert.equal(commit, main, 'New releases must tag current main');
  }
  const pkg = JSON.parse(git('show', `${commit}:package.json`));
  assert.equal(tag, `v${pkg.version}`);
  assert.equal(pkg.name, '@framed-ai/plumb');
  assert.equal(pkg.license, 'PolyForm-Noncommercial-1.0.0');
  assert.equal(pkg.repository?.url, 'git+https://github.com/Framed-AI-Ltd/Plumb.git');
  return { commit, tag };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
  const result = selectRelease(process.env, JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')), git);
  appendFileSync(process.env.GITHUB_OUTPUT, `commit=${result.commit}\ntag=${result.tag}\n`);
  console.log(`Verified release source ${result.tag} at ${result.commit}`);
}
