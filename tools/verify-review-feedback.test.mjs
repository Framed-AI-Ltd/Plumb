import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyFeedback } from './verify-review-feedback.mjs';
const body = (value) => `<!-- review-feedback\n${JSON.stringify(value)}\n-->`;
const finding = (value) => body({ status: 'addressed', findings: [{ id: 'R1', ...value }] });

test('no findings is explicit, not inferred from an empty template', () => {
  assert.doesNotThrow(() => verifyFeedback(body({ status: 'no-findings' }), [], []));
  assert.throws(() => verifyFeedback('', [], []));
  assert.throws(() => verifyFeedback(body({ status: 'addressed', findings: [] }), [], []));
});
test('changed regression test or static rule satisfies an addressed finding', () => {
  for (const path of ['tests/money.test.ts', '.semgrep/rules.yml', 'eslint.config.js', '.claude/hooks/secrets.mjs', '.agents/hooks/secrets.mjs', '.husky/pre-commit']) {
    assert.doesNotThrow(() => verifyFeedback(finding({ regressions: [path] }), [path], []));
  }
});
test('unmodified tests, source-only edits and missing regression fail', () => {
  assert.throws(() => verifyFeedback(finding({ regressions: ['tests/money.test.ts'] }), ['src/money.ts'], []));
  assert.throws(() => verifyFeedback(finding({ regressions: ['src/money.ts'] }), ['src/money.ts'], []));
  assert.throws(() => verifyFeedback(finding({}), ['tests/money.test.ts'], []));
});
test('fallback requires one newly added AGENTS rule and a reason', () => {
  const line = '- Preserve explicit source attribution when applying imported scope items.';
  const prevention = { line, reason: 'This requires visual source review that current fixtures cannot represent.' };
  assert.doesNotThrow(() => verifyFeedback(finding({ prevention }), ['AGENTS.md'], [line]));
  assert.throws(() => verifyFeedback(finding({ prevention }), ['AGENTS.md'], []));
  assert.throws(() => verifyFeedback(finding({ prevention: { line, reason: '' } }), [], [line]));
  assert.throws(() => verifyFeedback(finding({ prevention: { line: `${line}\n- Another`, reason: 'manual' } }), [], [line]));
});
test('ambiguous, duplicate and contradictory declarations fail', () => {
  const value = { id: 'R1', regressions: ['tests/money.test.ts'] };
  assert.throws(() => verifyFeedback(body({ status: 'addressed', findings: [value, value] }), ['tests/money.test.ts'], []));
  assert.throws(() => verifyFeedback(body({ status: 'no-findings', findings: [value] }), [], []));
  assert.throws(() => verifyFeedback(body({ status: 'no-findings' }) + body({ status: 'no-findings' }), [], []));
  assert.throws(() => verifyFeedback(finding({ ...value, prevention: { line: '- Rule', reason: 'manual' } }), ['tests/money.test.ts'], ['- Rule']));
});

test('CLI validates a real committed diff and rejects an injected SHA as data', async () => {
  const { mkdtempSync, writeFileSync, mkdirSync, rmSync, existsSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join, resolve } = await import('node:path');
  const { execFileSync, spawnSync } = await import('node:child_process');
  const directory = mkdtempSync(join(tmpdir(), 'plumb-review-feedback-'));
  const git = (...args) => execFileSync('git', args, { cwd: directory, encoding: 'utf8' }).trim();
  const runner = resolve('tools/verify-review-feedback.mjs');
  try {
    git('init', '-q');
    git('config', 'user.name', 'Synthetic Review Test');
    git('config', 'user.email', 'test@example.invalid');
    writeFileSync(join(directory, 'AGENTS.md'), '# Rules\n');
    git('add', '.');
    git('-c', 'commit.gpgsign=false', 'commit', '-qm', 'base');
    const base = git('rev-parse', 'HEAD');
    mkdirSync(join(directory, 'tests'));
    writeFileSync(join(directory, 'tests', 'money.test.ts'), 'assert.equal(total(null), null);\n');
    git('add', '.');
    git('-c', 'commit.gpgsign=false', 'commit', '-qm', 'regression');
    const head = git('rev-parse', 'HEAD');
    const eventPath = join(directory, 'event.json');
    const event = (sha, declaration) => writeFileSync(eventPath, JSON.stringify({ pull_request: { base: { sha: base }, head: { sha }, body: declaration } }));
    event(head, finding({ regressions: ['tests/money.test.ts'] }));
    const run = () => spawnSync(process.execPath, [runner, eventPath], { cwd: directory, encoding: 'utf8' });
    assert.equal(run().status, 0);
    event(head, finding({ regressions: ['tests/not-changed.test.ts'] }));
    assert.equal(run().status, 1);
    event(`${head};touch INJECTED`, body({ status: 'no-findings' }));
    assert.equal(run().status, 1);
    assert.equal(existsSync(join(directory, 'INJECTED')), false);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
