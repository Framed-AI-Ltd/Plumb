// Explicit operator action only; uses gh's existing authenticated session, never reads credentials.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
const repo = 'Framed-AI-Ltd/Plumb';
if (!process.argv.includes('--apply')) throw new Error('Read docs/CI-SETUP.md, then pass --apply to configure the public repository');
function api(method, path, body) {
  const r = spawnSync('gh', ['api', '--method', method, '-H', 'Accept: application/vnd.github+json', '-H', 'X-GitHub-Api-Version: 2022-11-28', path, ...(body ? ['--input', '-'] : [])], { input: body ? JSON.stringify(body) : undefined, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`GitHub API ${method} ${path} failed: ${r.stderr}`);
  return r.stdout.trim() ? JSON.parse(r.stdout) : null;
}
const path = `repos/${repo}`;
const current = api('GET', path);
assert.equal(current.full_name, repo);
assert.equal(current.visibility, 'public', 'Create the approved public repository before setup');
// Branch creation is deliberately separate: both branches must contain reviewed, signed source.
for (const branch of ['main', 'develop']) {
  api('GET', `${path}/branches/${branch}`);
  const commit = api('GET', `${path}/commits/${branch}`);
  assert.equal(commit.commit.verification.verified, true,
    `${branch} must have a verified signed tip before activating protection`);
}
api('PATCH', path, { default_branch: 'main', allow_merge_commit: true, allow_squash_merge: false, allow_rebase_merge: false, delete_branch_on_merge: true, allow_auto_merge: true, security_and_analysis: { secret_scanning: { status: 'enabled' }, secret_scanning_push_protection: { status: 'enabled' } } });
api('PUT', `${path}/vulnerability-alerts`);
api('PUT', `${path}/automated-security-fixes`);
const existing = api('GET', `${path}/rulesets`);
const branches = ['main', 'develop', 'release/**', 'hotfix/**'];
for (const branch of branches) {
  const name = `Plumb ${branch} integration`;
  const rules = [
    { type: 'deletion' }, { type: 'non_fast_forward' }, { type: 'required_signatures' },
    { type: 'pull_request', parameters: { required_approving_review_count: 1, dismiss_stale_reviews_on_push: true, require_code_owner_review: true, require_last_push_approval: true, required_review_thread_resolution: true, allowed_merge_methods: ['merge'] } },
    { type: 'required_status_checks', parameters: { strict_required_status_checks_policy: false, required_status_checks: [{ context: 'check' }, { context: 'accessibility' }, { context: 'workflow-security' }, { context: 'static-rules' }, { context: 'dependency-review' }] } },
  ];
  if (['main', 'develop'].includes(branch)) rules.push({ type: 'merge_queue', parameters: { check_response_timeout_minutes: 60, grouping_strategy: 'ALLGREEN', max_entries_to_build: 5, max_entries_to_merge: 5, merge_method: 'MERGE', min_entries_to_merge: 1, min_entries_to_merge_wait_minutes: 0 } });
  const body = { name, target: 'branch', enforcement: 'active', bypass_actors: [], conditions: { ref_name: { include: [`refs/heads/${branch}`], exclude: [] } }, rules };
  const prior = existing.find(r => r.name === name);
  const result = api(prior ? 'PUT' : 'POST', `${path}/rulesets${prior ? `/${prior.id}` : ''}`, body);
  const readback = api('GET', `${path}/rulesets/${result.id}`);
  assert.equal(readback.enforcement, 'active');
  assert.deepEqual(readback.conditions.ref_name, body.conditions.ref_name);
  for (const rule of rules) {
    const actual = readback.rules.find(r => r.type === rule.type);
    assert(actual, `Missing ${rule.type}`);
    for (const [key, value] of Object.entries(rule.parameters ?? {})) {
      assert.deepEqual(actual.parameters[key], value, `Wrong ${rule.type}.${key}`);
    }
  }
}
const tagName = 'Plumb release tags';
const tagPrior = existing.find(r => r.name === tagName);
api(tagPrior ? 'PUT' : 'POST', `${path}/rulesets${tagPrior ? `/${tagPrior.id}` : ''}`, { name: tagName, target: 'tag', enforcement: 'active', bypass_actors: [], conditions: { ref_name: { include: ['refs/tags/v*'], exclude: [] } }, rules: [{ type: 'deletion' }, { type: 'update' }] });
api('PUT', `${path}/environments/npm`, { reviewers: [{ type: 'User', id: api('GET', 'users/Dev-Addict').id }], prevent_self_review: false, deployment_branch_policy: { protected_branches: false, custom_branch_policies: true } });
const policies = api('GET', `${path}/environments/npm/deployment-branch-policies`).branch_policies;
if (!policies.some(p => p.name === 'v*' && p.type === 'tag')) api('POST', `${path}/environments/npm/deployment-branch-policies`, { name: 'v*', type: 'tag' });
const pages = spawnSync('gh', ['api', `${path}/pages`], { encoding: 'utf8' });
api(pages.status === 0 ? 'PUT' : 'POST', `${path}/pages`, { build_type: 'workflow' });
const settings = api('GET', path);
assert.equal(settings.default_branch, 'main');
assert.equal(settings.security_and_analysis.secret_scanning.status, 'enabled');
assert.equal(settings.security_and_analysis.secret_scanning_push_protection.status, 'enabled');
api('GET', `${path}/vulnerability-alerts`);
const fixes = api('GET', `${path}/automated-security-fixes`);
assert.equal(fixes.enabled, true);
await mkdir('review-setup', { recursive: true });
await writeFile('review-setup/github-readback.json', JSON.stringify({ repository: settings, rulesets: api('GET', `${path}/rulesets`), npmEnvironment: api('GET', `${path}/environments/npm`), pages: api('GET', `${path}/pages`) }, null, 2));
console.log('Configured; inspect review-setup/github-readback.json. npm trust and CI provider secrets remain separate manual setup.');
