import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
assert.equal(pkg.name, '@framed-ai/plumb');
assert.match(pkg.version, /^\d+\.\d+\.\d+$/);
assert.equal(process.env.GITHUB_REPOSITORY, 'Framed-AI-Ltd/Plumb');
assert.equal(process.env.GITHUB_REF, `refs/tags/v${pkg.version}`);
const tag = git('rev-parse', `v${pkg.version}^{commit}`);
assert.equal(tag, git('rev-parse', 'HEAD'));
git('merge-base', '--is-ancestor', tag, 'origin/main');
// Release tags must point to the current main tip; no stale or feature-branch publication.
assert.equal(tag, git('rev-parse', 'origin/main'));
assert.equal(pkg.license, 'PolyForm-Noncommercial-1.0.0');
assert.equal(pkg.repository.url, 'git+https://github.com/Framed-AI-Ltd/Plumb.git');
await import('./release-guard.mjs');
console.log(`Validated main source for v${pkg.version}`);
