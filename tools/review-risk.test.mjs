import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isHighRiskDiff } from './review-risk.mjs';
test('runtime, workflow, tooling, dependencies and config require a second opinion', () => {
  for (const path of ['src/components/CustomerView.tsx', 'src/new/Generic.ts', '.github/workflows/ci.yml', 'tools/build.mjs', '.storybook/main.ts', 'package.json', 'pnpm-lock.yaml', 'vite.lib.config.ts', '.husky/pre-commit', '.claude/settings.json', '.claude', '.agents/settings.json', '.agents/skills/frontier-review/SKILL.md', '.semgrep/rules.yml', 'AGENTS.md', 'CLAUDE.md']) assert(isHighRiskDiff(`diff --git a/${path} b/${path}\n+code`), path);
});
test('renames into runtime source are high risk', () => {
  assert(isHighRiskDiff('diff --git a/docs/example.md b/src/example.ts'));
});
test('plain documentation has primary independent reviews only', () => {
  assert.equal(isHighRiskDiff('diff --git a/docs/guide.md b/docs/guide.md\n+src/security.ts'), false);
});
