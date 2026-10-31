import { appendFileSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const storyFile = /^stories\/.*\.stories\.[jt]sx?$/;
const safe = /^(?:docs\/|licenses\/|\.agents\/|\.claude(?:\/|$)|\.serena\/|\.husky\/|\.github\/(?:ISSUE_TEMPLATE\/|prompts\/|CODEOWNERS|dependabot\.yml|pull_request_template\.md)|(?:README|AGENTS|CLAUDE|CONTRIBUTING|CHANGELOG|LICENSE)(?:\.|$)|\.git(?:ignore|attributes)$)/;

export function classifyChanges(paths) {
  const ui = paths.filter(path => !safe.test(path) && !/^(?:tests\/.*\.test\.[jt]sx?|tools\/.*\.test\.mjs)$/.test(path));
  if (!ui.length) return { ui: false, scope: 'none', storyFiles: [] };
  // A shared import, compiler setting or package identity can affect every story.
  // Only story-only edits have sufficiently narrow provenance to select a subset.
  if (ui.every(path => storyFile.test(path))) return { ui: true, scope: 'stories', storyFiles: [...new Set(ui)].sort() };
  return { ui: true, scope: 'all', storyFiles: [] };
}

export function eventRange(event, name) {
  const range = name === 'pull_request' ? [event.pull_request?.base?.sha, event.pull_request?.head?.sha]
    : name === 'merge_group' ? [event.merge_group?.base_sha, event.merge_group?.head_sha]
    : [event.before, event.after];
  return range.every(value => typeof value === 'string' && /^[a-f0-9]{40,64}$/.test(value) && !/^0+$/.test(value)) ? range : null;
}

export function detectImpact(event, name, git = args => execFileSync('git', args, { encoding: 'utf8' })) {
  const range = eventRange(event, name);
  if (!range) return { ui: true, scope: 'all', storyFiles: [] };
  try {
    return classifyChanges(git(['diff', '--name-only', '-z', `${range[0]}...${range[1]}`]).split('\0').filter(Boolean));
  } catch {
    return { ui: true, scope: 'all', storyFiles: [] };
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const impact = detectImpact(event, process.env.GITHUB_EVENT_NAME);
  const output = `ui=${impact.ui}\nscope=${impact.scope}\nstory_files=${JSON.stringify(impact.storyFiles)}\n`;
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, output);
  console.log(JSON.stringify(impact));
}
