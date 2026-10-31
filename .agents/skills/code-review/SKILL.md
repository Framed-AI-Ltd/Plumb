---
name: code-review
description: Review Plumb changes for defects, security, performance and maintainability with executable feedback.
---

Read the diff and relevant caller/test paths. Prioritize reachable defects, truth/privacy violations, broken contracts, async loss and accessibility failures. Distinguish confirmed issues from suggestions with file/line evidence and a concrete trigger.

Run focused checks where useful and state validation gaps. Avoid proposing a backend or unrelated redesign. Treat file-size warnings at 100 and 200 lines as nonblocking.

For each review catch, add an executable regression test, lint rule or hook in the same PR. If a robust automated check is impractical, add one concrete prevention line to AGENTS and explain why in the PR. Verify a regression fails on the faulty behavior and passes on the fix; do not merely assert wording.

Report findings in severity order, then checks and remaining uncertainty. Do not claim rendered, owner, security or signing approval from static success.
