import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { eligible, authorize } from './codex-review-policy.mjs';
import { repository, assertCurrent, reviewIdentity } from './codex-review-api.mjs';
import { parseReview, reportReview, formatReview } from './codex-review-report.mjs';

const head = 'b'.repeat(40), base = 'a'.repeat(40);
const pr = () => ({ number: 7, state: 'open', draft: false, author_association: 'MEMBER', user: { login: 'member' }, head: { sha: head, repo: { full_name: 'member/fork' } }, base: { ref: 'develop', sha: base, repo: { full_name: repository } } });
const event = () => ({ action: 'opened', repository: { full_name: repository, owner: { type: 'Organization' } }, sender: { login: 'member' }, pull_request: pr() });
const manual = () => ({ ...event(), action: 'created', pull_request: undefined, issue: { number: 7, pull_request: {} }, comment: { id: 12, user: { login: 'member' }, author_association: 'MEMBER', body: '/codex-review' } });
const identity = { number: '7', head, base };
const finding = () => ({ category: 'bug', severity: 'high', file: 'src/file.ts', line: 3, reason: 'Concrete trigger and impact', suggestion: 'Fix the condition' });

test('automatic reviews require member authors, protected base and non-draft PRs; member forks qualify', async () => {
  assert(eligible('pull_request_target', event()));
  assert(await authorize('pull_request_target', event(), async () => pr()));
  for (const association of ['COLLABORATOR', 'CONTRIBUTOR', 'FIRST_TIMER', 'NONE']) {
    const e = event(); e.pull_request.author_association = association;
    assert.equal(await authorize('pull_request_target', e, () => assert.fail('must not call API')), null);
  }
  for (const mutate of [e => { e.pull_request.draft = true; }, e => { e.pull_request.base.ref = 'feature/unsafe'; }, e => { e.repository.owner.type = 'User'; }, e => { e.repository.full_name = 'elsewhere/repo'; }]) {
    const e = event(); mutate(e); assert(!eligible('pull_request_target', e));
  }
});

test('manual command is an exact new PR comment from a member, not an outside collaborator or edited comment', () => {
  assert(eligible('issue_comment', manual()));
  for (const mutate of [e => { e.comment.author_association = 'COLLABORATOR'; }, e => { e.action = 'edited'; }, e => { delete e.issue.pull_request; }, e => { e.comment.body = 'please /codex-review'; }, e => { e.sender.login = 'outsider'; }]) {
    const e = manual(); mutate(e); assert(!eligible('issue_comment', e));
  }
});

test('member can authorize an outsider PR; current comment membership/body and PR state are revalidated', async () => {
  const external = { ...pr(), author_association: 'NONE', user: { login: 'outsider' } };
  const request = async path => path.startsWith('issues/comments/') ? manual().comment : external;
  assert.deepEqual(await authorize('issue_comment', manual(), request), { ...identity, actor: 'member' });
  assert.equal(await authorize('issue_comment', manual(), async path => path.startsWith('issues/comments/') ? { ...manual().comment, author_association: 'NONE' } : external), null);
  assert.equal(await authorize('issue_comment', manual(), async path => path.startsWith('issues/comments/') ? manual().comment : { ...external, state: 'closed' }), null);
  await assert.rejects(authorize('issue_comment', manual(), async () => { throw new Error('API unavailable'); }), /API unavailable/);
});

test('changed heads, revoked automatic membership and invalid identities fail closed', async () => {
  assert.equal(await authorize('pull_request_target', event(), async () => ({ ...pr(), head: { sha: 'c'.repeat(40) } })), null);
  assert.equal(await authorize('pull_request_target', event(), async () => ({ ...pr(), author_association: 'NONE' })), null);
  assert.equal(await authorize('pull_request_target', event(), async () => ({ ...pr(), base: { ...pr().base, ref: 'feature/retargeted' } })), null);
  assert.throws(() => reviewIdentity({ REVIEW_PR: '7;echo injected', REVIEW_HEAD: head, REVIEW_BASE: base }));
  assert.throws(() => assertCurrent({ ...pr(), head: { sha: 'c'.repeat(40) } }, identity));
});

test('all four finding categories validate; malformed results are not passing reviews', () => {
  for (const category of ['bug', 'security', 'performance', 'maintainability']) assert(parseReview(JSON.stringify({ summary: 'Inspected scope', findings: [{ ...finding(), category }] })));
  for (const raw of ['not json', '{}', JSON.stringify({ summary: '', findings: [] }), JSON.stringify({ summary: 'ok', findings: [{ ...finding(), severity: 'unknown' }] })]) assert.throws(() => parseReview(raw));
});

test('report posts only for the reviewed head, preserves high severity, and neutralizes mentions/markup', async () => {
  const raw = JSON.stringify({ summary: 'Reviewed @member <script>', findings: [finding()] });
  const calls = [];
  const result = await reportReview(raw, identity, async (path, options) => { calls.push([path, options]); return pr(); });
  assert(result.blocked);
  assert.equal(calls[1][0], 'issues/7/comments');
  assert(!JSON.parse(calls[1][1].body).body.includes('@member'));
  assert(formatReview(result.review, identity).includes(head));
  let posts = 0;
  await assert.rejects(reportReview(raw, identity, async (_path, options) => { if (options) posts++; return { ...pr(), head: { sha: 'c'.repeat(40) } }; }), /changed/);
  assert.equal(posts, 0);
});

test('privileged workflow keeps membership gates, default-branch helpers, read-only pinned Codex and isolated writer', () => {
  const yaml = readFileSync('.github/workflows/ai-review.yml', 'utf8');
  assert.match(yaml, /branches: \[main, develop\]/);
  assert.match(yaml, /pull_request\.author_association == 'MEMBER'/);
  assert.match(yaml, /comment\.author_association == 'MEMBER'/);
  assert.match(yaml, /ref: \$\{\{ github\.event\.repository\.default_branch \}\}/);
  assert.match(yaml, /openai\/codex-action@[a-f0-9]{40}/);
  assert.match(yaml, /permission-profile: ':read-only'/);
  assert.match(yaml, /safety-strategy: drop-sudo/);
  assert(!yaml.includes('allow-users: "*"') && !yaml.includes('ANTHROPIC'));
  assert(!yaml.includes('ref: ${{ github.sha }}') && !yaml.includes('ref: ${{ github.event.pull_request.head.sha }}'));
  assert(!yaml.slice(0, yaml.indexOf('jobs:')).includes('concurrency:')); // Outsider comments must not cancel authorized reviews.
  assert.equal((yaml.match(/pull-requests: write/g) ?? []).length, 1);
  assert(!yaml.slice(yaml.indexOf('  review:'), yaml.indexOf('  report:')).includes('pull-requests: write'));
});

test('preparation reads immutable PR Git objects without loading head-controlled agent configuration', () => {
  const directory = mkdtempSync(join(tmpdir(), 'plumb-codex-objects-'));
  const git = (...args) => execFileSync('git', args, { cwd: directory, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  try {
    git('init', '-q'); git('config', 'user.name', 'Synthetic Review Test'); git('config', 'user.email', 'test@example.invalid');
    writeFileSync(join(directory, 'source.ts'), 'export const value = 1;\n');
    git('add', '.'); git('-c', 'commit.gpgsign=false', 'commit', '-qm', 'base'); const start = git('rev-parse', 'HEAD');
    mkdirSync(join(directory, '.codex')); writeFileSync(join(directory, '.codex/config.toml'), 'UNTRUSTED CONFIG');
    writeFileSync(join(directory, 'source.ts'), 'export const value = 2;\n');
    git('add', '.'); git('-c', 'commit.gpgsign=false', 'commit', '-qm', 'head'); const end = git('rev-parse', 'HEAD');
    git('update-ref', 'refs/pull/7/head', end); git('remote', 'add', 'origin', directory); git('checkout', '--detach', start);
    const current = { ...pr(), head: { sha: end }, base: { sha: start, repo: { full_name: repository } } };
    const preload = `globalThis.fetch = async () => ({ ok: true, json: async () => (${JSON.stringify(current)}) });`;
    execFileSync(process.execPath, ['--import', `data:text/javascript,${encodeURIComponent(preload)}`, resolve('tools/codex-review-prepare.mjs')], {
      cwd: directory, stdio: 'pipe', env: { ...process.env, GH_TOKEN: 'synthetic', GITHUB_ACTIONS: 'true', GITHUB_REPOSITORY: repository, REVIEW_PR: '7', REVIEW_HEAD: end, REVIEW_BASE: start },
    });
    assert(!existsSync(join(directory, '.codex/config.toml')));
    assert.equal(git('rev-parse', 'HEAD'), start);
    assert(readFileSync(join(directory, 'review-input/changes.diff'), 'utf8').includes('export const value = 2'));
    assert.equal(JSON.parse(readFileSync(join(directory, 'review-input/context.json'), 'utf8')).head, end);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
