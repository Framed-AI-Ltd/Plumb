import assert from 'node:assert/strict';
import { appendFileSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function selectStories(index, scope, files) {
  const entries = Object.values(index.entries).filter(entry => entry.type === 'story');
  assert(entries.length, 'Storybook must contain stories');
  assert(entries.every(entry => /^[-a-z0-9]+$/.test(entry.id)), 'Invalid story ID');
  if (scope !== 'stories') return entries.map(entry => entry.id);
  assert(Array.isArray(files) && files.every(file => typeof file === 'string'), 'Expected changed story files');
  const byFile = new Map();
  for (const entry of entries) {
    const path = entry.importPath?.replace(/^\.\//, '');
    byFile.set(path, [...(byFile.get(path) ?? []), entry.id]);
  }
  // Deleted/renamed stories or an unfamiliar Storybook index require a full pass.
  if (!files.length || files.some(file => !byFile.has(file))) return entries.map(entry => entry.id);
  return [...new Set(files.flatMap(file => byFile.get(file)))];
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const index = JSON.parse(readFileSync('storybook-static/index.json', 'utf8'));
  const stories = selectStories(index, process.env.CI_UI_SCOPE, JSON.parse(process.env.CI_STORY_FILES || '[]'));
  if (process.env.GITHUB_ENV) appendFileSync(process.env.GITHUB_ENV, `VISUAL_STORY_IDS=${stories.join(',')}\n`);
  console.log(`Selected ${stories.length} stories (${process.env.CI_UI_SCOPE || 'all'} coverage).`);
}
