import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pullRequestParameters } from './repository-policy.mjs';

test('each configured Dependabot ecosystem retains at least seven days of cooldown', () => {
  const config = readFileSync(new URL('../.github/dependabot.yml', import.meta.url), 'utf8');
  const updates = config.split(/^ {2}- package-ecosystem: /m).slice(1);
  assert(updates.length >= 2, 'Expected explicit npm and GitHub Actions update blocks');
  for (const update of updates) {
    const days = update.match(/^ {4}cooldown:\n {6}default-days: (\d+)\s*$/m);
    assert(days && Number(days[1]) >= 7, `Missing safe cooldown for ${update.split('\n')[0]}`);
  }
});

test('solo integration branches require PRs and resolved threads without self-approval deadlocks', () => {
  for (const branch of ['main', 'develop']) {
    const policy = pullRequestParameters(branch);
    assert.equal(policy.required_approving_review_count, 0);
    assert.equal(policy.require_code_owner_review, false);
    assert.equal(policy.require_last_push_approval, false);
    assert.equal(policy.required_review_thread_resolution, true);
    assert.deepEqual(policy.allowed_merge_methods, ['merge']);
  }
});

test('release and hotfix approval requirements remain intact', () => {
  for (const branch of ['release/**', 'hotfix/**']) {
    const policy = pullRequestParameters(branch);
    assert.equal(policy.required_approving_review_count, 1);
    assert.equal(policy.require_code_owner_review, true);
    assert.equal(policy.require_last_push_approval, true);
  }
});
