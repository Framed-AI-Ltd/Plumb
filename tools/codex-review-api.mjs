import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

export const repository = 'Framed-AI-Ltd/Plumb';
export const isCLI = url => process.argv[1] && url === pathToFileURL(resolve(process.argv[1])).href;
export function requireCI(env = process.env) {
  if (env.GITHUB_ACTIONS !== 'true' || env.GITHUB_REPOSITORY !== repository) throw new Error('Expected Plumb GitHub Actions context');
}
export async function api(path, options = {}) {
  if (!process.env.GH_TOKEN) throw new Error('Missing GitHub token');
  const response = await fetch(`https://api.github.com/repos/${repository}/${path}`, {
    ...options, signal: AbortSignal.timeout(30000),
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error(`GitHub API failed (${response.status})`);
  return response.json();
}
export function reviewIdentity(env = process.env) {
  const { REVIEW_PR: number, REVIEW_HEAD: head, REVIEW_BASE: base } = env;
  if (!/^[1-9]\d*$/.test(number ?? '') || ![head, base].every(sha => /^[a-f0-9]{40}$/.test(sha ?? ''))) throw new Error('Invalid immutable PR identity');
  return { number, head, base };
}
export function assertCurrent(pr, identity) {
  if (pr.state !== 'open' || pr.draft || pr.base.repo.full_name !== repository || pr.head.sha !== identity.head || pr.base.sha !== identity.base || String(pr.number) !== String(identity.number)) {
    throw new Error('PR is closed, draft, or changed since authorization; request a fresh review');
  }
}
