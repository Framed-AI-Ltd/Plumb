import { readFileSync, appendFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { api, repository, requireCI, reviewIdentity, isCLI } from './codex-review-api.mjs';

export function eligible(eventName, event) {
  if (event.repository?.full_name !== repository || event.repository.owner?.type !== 'Organization') return false;
  if (eventName === 'pull_request_target') {
    const pr = event.pull_request;
    return ['opened', 'synchronize', 'reopened', 'ready_for_review'].includes(event.action) &&
      pr?.author_association === 'MEMBER' && !pr.draft && ['main', 'develop'].includes(pr.base?.ref);
  }
  return eventName === 'issue_comment' && event.action === 'created' && Boolean(event.issue?.pull_request) &&
    event.comment?.author_association === 'MEMBER' && event.comment.body === '/codex-review' &&
    event.comment.user?.login === event.sender?.login;
}

export async function authorize(eventName, event, request = api) {
  if (!eligible(eventName, event)) return null;
  const number = event.pull_request?.number ?? event.issue.number;
  if (!Number.isSafeInteger(number) || number < 1) throw new Error('Invalid PR number');
  if (eventName === 'issue_comment') {
    if (!Number.isSafeInteger(event.comment.id) || event.comment.id < 1) throw new Error('Invalid comment ID');
    const comment = await request(`issues/comments/${event.comment.id}`);
    if (comment.author_association !== 'MEMBER' || comment.user.login !== event.sender.login || comment.body !== '/codex-review') return null;
  }
  const pr = await request(`pulls/${number}`);
  if (pr.number !== number || pr.base.repo.full_name !== repository) throw new Error('Unexpected PR repository');
  if (pr.state !== 'open' || pr.draft) return null;
  if (eventName === 'pull_request_target' && (!['main', 'develop'].includes(pr.base.ref) || pr.author_association !== 'MEMBER' || pr.user.login !== event.pull_request.user.login || pr.head.sha !== event.pull_request.head.sha)) return null;
  const identity = reviewIdentity({ REVIEW_PR: String(number), REVIEW_HEAD: pr.head.sha, REVIEW_BASE: pr.base.sha });
  const actor = event.sender?.login;
  if (!/^[A-Za-z0-9-]{1,39}$/.test(actor ?? '')) throw new Error('Expected human GitHub actor');
  return { number: identity.number, head: identity.head, base: identity.base, actor };
}

if (isCLI(import.meta.url)) {
  requireCI();
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const result = await authorize(process.env.GITHUB_EVENT_NAME, event);
  const output = result ? { allowed: 'true', ...result, trusted: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim() } : { allowed: 'false' };
  appendFileSync(process.env.GITHUB_OUTPUT, Object.entries(output).map(([key, value]) => `${key}=${value}\n`).join(''));
  console.log(result ? `Authorized Codex review for PR #${result.number}` : 'Review not authorized or no longer current');
}
