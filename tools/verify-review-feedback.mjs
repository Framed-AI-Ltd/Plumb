import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const regressionPath = /^(?:tests\/.*\.(?:[cm]?[jt]sx?)|.*\.(?:test|spec)\.[cm]?[jt]sx?|\.semgrep\/.*\.(?:ya?ml|[jt]sx?)|eslint\.config\.[cm]?js|tools\/eslint[^/]*\/.*|\.(?:agents|claude)\/hooks\/.*|\.husky\/.*|\.github\/workflows\/.*\.ya?ml)$/;

// This checks a reviewer's explicit declaration against the actual diff. It cannot
// discover omitted findings or prove that a declared regression detects a defect.
export function verifyFeedback(body, changedFiles, addedAgentLines) {
  const blocks = [...body.matchAll(/<!--\s*review-feedback\s*\n([\s\S]*?)-->/g)];
  if (blocks.length !== 1) throw new Error('Provide exactly one review-feedback JSON declaration.');
  const declaration = JSON.parse(blocks[0][1]);
  if (declaration.status === 'no-findings') {
    if (declaration.findings?.length) throw new Error('no-findings cannot include findings.');
    return;
  }
  if (declaration.status !== 'addressed' || !Array.isArray(declaration.findings) || !declaration.findings.length) {
    throw new Error('Declare no-findings or addressed with a nonempty findings list.');
  }
  const ids = new Set();
  for (const finding of declaration.findings) {
    if (typeof finding.id !== 'string' || !finding.id.trim() || ids.has(finding.id)) throw new Error('Every finding needs a unique nonempty id.');
    ids.add(finding.id);
    const hasRegression = Array.isArray(finding.regressions) && finding.regressions.length > 0;
    const hasFallback = finding.prevention !== undefined;
    if (hasRegression === hasFallback) throw new Error(`${finding.id}: choose regression paths or one AGENTS prevention line.`);
    if (hasRegression) {
      for (const path of finding.regressions) {
        if (typeof path !== 'string' || !regressionPath.test(path) || !changedFiles.includes(path)) {
          throw new Error(`${finding.id}: regression must name an added/modified test, rule or hook in this PR: ${path}`);
        }
      }
    } else {
      const { line, reason } = finding.prevention ?? {};
      if (typeof reason !== 'string' || !reason.trim()) throw new Error(`${finding.id}: explain why automation is impractical.`);
      if (typeof line !== 'string' || line.includes('\n') || !/^[-*] \S/.test(line) || !addedAgentLines.includes(line)) {
        throw new Error(`${finding.id}: prevention must quote exactly one newly added AGENTS.md rule line.`);
      }
    }
  }
}

function git(args) {
  const result = spawnSync('git', args, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw new Error(`Cannot read review diff: ${result.error?.message ?? result.stderr}`);
  return result.stdout;
}

export function runFromEvent(eventPath) {
  const event = JSON.parse(readFileSync(eventPath, 'utf8'));
  const pr = event.pull_request;
  const base = pr?.base?.sha;
  const head = pr?.head?.sha;
  if (![base, head].every((sha) => typeof sha === 'string' && /^[a-f0-9]{40,64}$/.test(sha))) throw new Error('Expected a GitHub pull_request event with base/head commit SHAs.');
  const files = git(['diff', '--name-only', '--diff-filter=AMR', '-z', `${base}...${head}`]).split('\0').filter(Boolean);
  const additions = git(['diff', '--unified=0', `${base}...${head}`, '--', 'AGENTS.md'])
    .split('\n').filter((line) => line.startsWith('+') && !line.startsWith('+++')).map((line) => line.slice(1));
  verifyFeedback(pr.body ?? '', files, additions);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const eventPath = process.argv[2] ?? process.env.GITHUB_EVENT_PATH;
    if (!eventPath) throw new Error('Usage: node tools/verify-review-feedback.mjs <GitHub event JSON path>');
    runFromEvent(eventPath);
    console.log('Review feedback declaration matches changed regression paths or AGENTS fallback lines.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
