import { appendFileSync } from 'node:fs';
import { api, requireCI, reviewIdentity, assertCurrent, isCLI } from './codex-review-api.mjs';

export function parseReview(raw) {
  const review = JSON.parse(raw);
  if (!review || typeof review.summary !== 'string' || !review.summary.trim() || review.summary.length > 2000 || !Array.isArray(review.findings) || review.findings.length > 30) throw new Error('Invalid Codex review');
  for (const finding of review.findings) {
    if (!finding || !['bug', 'security', 'performance', 'maintainability'].includes(finding.category) || !['critical', 'high', 'medium', 'low'].includes(finding.severity) ||
      !Number.isSafeInteger(finding.line) || finding.line < 1 || ![finding.file, finding.reason, finding.suggestion].every(value => typeof value === 'string' && value.trim()) ||
      finding.file.length > 500 || finding.reason.length > 1200 || finding.suggestion.length > 800) throw new Error('Invalid Codex finding');
  }
  return review;
}
const escape = text => text.replace(/([\\`*_[\]<>])/g, '\\$1').replace(/@/g, '@\u200b');
export function formatReview(review, identity) {
  const sections = review.findings.map(f => `- **${f.severity.toUpperCase()} · ${f.category}** — ${escape(f.file)}:${f.line}\n  ${escape(f.reason)}\n  Suggestion: ${escape(f.suggestion)}`);
  const body = `## Codex review\nReviewed commit: \`${identity.head}\`\n\n${escape(review.summary)}\n\n${sections.join('\n\n') || 'No supported findings.'}\n\nScope: bugs, security, performance, maintainability/idiomatic code. Read-only review; no PR code or tests executed. Human review remains required.`;
  if (body.length > 60000) throw new Error('Review exceeds comment budget; inspect the artifact');
  return body;
}
export async function reportReview(raw, identity, request = api) {
  const review = parseReview(raw);
  assertCurrent(await request(`pulls/${identity.number}`), identity);
  await request(`issues/${identity.number}/comments`, { method: 'POST', body: JSON.stringify({ body: formatReview(review, identity) }) });
  return { review, blocked: review.findings.some(f => ['critical', 'high'].includes(f.severity)) };
}
if (isCLI(import.meta.url)) {
  requireCI();
  const identity = reviewIdentity();
  const { review, blocked } = await reportReview(process.env.REVIEW_RESULT, identity);
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, formatReview(review, identity));
  if (blocked) throw new Error('High/critical findings require resolution and another review');
}
