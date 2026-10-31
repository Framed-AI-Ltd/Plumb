import { mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { api, requireCI, reviewIdentity, assertCurrent } from './codex-review-api.mjs';

requireCI();
const identity = reviewIdentity();
assertCurrent(await api(`pulls/${identity.number}`), identity);
const git = args => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 2 * 1024 * 1024 });
// Only validated numeric/SHA arguments; no checkout, install, PR scripts or PR config.
git(['fetch', '--no-tags', 'origin', identity.base, `refs/pull/${identity.number}/head:refs/review/head`]);
if (git(['rev-parse', 'refs/review/head']).trim() !== identity.head) throw new Error('Head moved while fetching; rerun review');
const mergeBase = git(['merge-base', identity.base, identity.head]).trim();
const diff = git(['diff', '--no-ext-diff', '--no-textconv', '--find-renames', `${mergeBase}...${identity.head}`]);
if (Buffer.byteLength(diff) > 250000) throw new Error('PR exceeds review budget; split it rather than truncate the review');
mkdirSync('review-input', { recursive: true });
mkdirSync('review-ai', { recursive: true });
writeFileSync('review-input/context.json', JSON.stringify({ ...identity, mergeBase }, null, 2));
writeFileSync('review-input/changes.diff', diff);
