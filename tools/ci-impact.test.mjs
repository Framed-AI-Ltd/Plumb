import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyChanges, detectImpact, eventRange } from './ci-impact.mjs';
import { selectStories } from './ci-stories.mjs';

test('documentation-only changes avoid UI work; unknown/shared/compiler/package changes fail open to full coverage', () => {
  assert.equal(classifyChanges(['README.md', 'docs/RELEASE.md']).ui, false);
  for (const path of ['package.json', 'pnpm-lock.yaml', 'patches/renderer.patch', 'src/lib/styles/button.stylex.ts', '.storybook/main.ts', 'tools/ci-impact.mjs', 'tests/browser/theme.tsx', 'unfamiliar.config']) {
    assert.equal(classifyChanges([path]).scope, 'all', path);
  }
});

test('story-only changes select exact story files; mixed source changes require full coverage', () => {
  assert.deepEqual(classifyChanges(['stories/components/Overview.stories.tsx', 'README.md']), {
    ui: true, scope: 'stories', storyFiles: ['stories/components/Overview.stories.tsx'],
  });
  assert.equal(classifyChanges(['stories/components/Overview.stories.tsx', 'src/lib/actions/button.tsx']).scope, 'all');
});

test('PR and merge queue use immutable base/head SHAs; missing history cannot silently skip UI', () => {
  const base = 'a'.repeat(40), head = 'b'.repeat(40);
  assert.deepEqual(eventRange({ merge_group: { base_sha: base, head_sha: head } }, 'merge_group'), [base, head]);
  const event = { pull_request: { base: { sha: base }, head: { sha: head } } };
  assert.equal(detectImpact(event, 'pull_request', args => {
    assert.deepEqual(args, ['diff', '--name-only', '-z', `${base}...${head}`]);
    return 'README.md\0';
  }).ui, false);
  assert.equal(detectImpact(event, 'pull_request', () => { throw new Error('shallow history'); }).scope, 'all');
  assert.equal(detectImpact({ before: '0'.repeat(40), after: head }, 'push').scope, 'all');
  assert.equal(detectImpact({ merge_group: { base_sha: base, head_sha: head } }, 'merge_group', () => 'stories/Buttons.stories.tsx\0').scope, 'stories');
  assert.equal(eventRange({ before: '$(unsafe)', after: head }, 'push'), null);
});

const index = { entries: {
  a: { type: 'story', id: 'buttons--default', importPath: './stories/Buttons.stories.tsx' },
  b: { type: 'story', id: 'forms--default', importPath: './stories/Forms.stories.tsx' },
  docs: { type: 'docs', id: 'start--docs' },
} };
test('story selection uses actual index ownership and includes new stories automatically', () => {
  assert.deepEqual(selectStories(index, 'stories', ['stories/Buttons.stories.tsx']), ['buttons--default']);
  assert.equal(selectStories(index, 'all', []).length, 2);
  assert.equal(selectStories(index, 'stories', ['stories/Deleted.stories.tsx']).length, 2);
  assert.equal(selectStories(index, 'stories', []).length, 2);
  assert.equal(selectStories({ entries: { ...index.entries, c: { type: 'story', id: 'new--example', importPath: './stories/New.stories.tsx' } } }, 'all', []).length, 3);
  assert.throws(() => selectStories({ entries: {} }, 'all', []), /must contain stories/);
  assert.throws(() => selectStories({ entries: { bad: { type: 'story', id: 'unsafe\nENV=value' } } }, 'all', []), /Invalid story ID/);
});
