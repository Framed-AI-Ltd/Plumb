# Task procedures

Read the project rules first. Load only the procedure relevant to the task:

- [Add UI feature](../../.agents/skills/add-ui-feature/SKILL.md): Plumb composition, StyleX, query hooks, accessible browser flows.
- [Code review](../../.agents/skills/code-review/SKILL.md): evidence, regressions and review feedback.
- [Security review](../../.agents/skills/security-review/SKILL.md): privacy boundaries, secrets and threat-focused checks.
- [Frontier review](../../.agents/skills/frontier-review/SKILL.md): independently requested second review.
- [Release](../../.agents/skills/release/SKILL.md): local package evidence and explicitly authorized publication.

For nontrivial high-risk auth/data/money/infrastructure/new-dependency work, present an approximately 20-line plan for approval before implementation. Include intended behavior, affected boundaries, acceptance criteria, risks, tests and rollback. Reuse already approved scope; a plan is not permission to publish.

Feature specs live individually in `docs/features/`. A spec describes supported behavior and acceptance criteria, not an inventory or future roadmap. Feature IDs are stable references.

Both file-size limits (100 and 200 lines) are nonblocking maintainability warnings. Document justified exceptions; preserve coherent responsibilities.

## Review feedback declaration

The PR template contains one `review-feedback` JSON comment. After review, declare `no-findings`, or `addressed` with every finding's stable ID and changed regression paths. For a nonautomatable catch, provide `prevention.line` quoting exactly one new AGENTS bullet and `prevention.reason` explaining why automation is impractical. Example:

```json
{"status":"addressed","findings":[{"id":"R1","regressions":["tests/money.test.ts"]},{"id":"R2","prevention":{"line":"- Preserve the supplied source label when reviewing scope imports.","reason":"The supplied source is a visual artifact outside automated fixtures."}}]}
```

`node tools/verify-review-feedback.mjs <GitHub-event-json>` checks the declaration against added/modified paths and added AGENTS lines in the actual PR diff. `node --test tools/verify-review-feedback.test.mjs` tests the checker, including real Git history. The checker cannot discover undeclared catches, establish that a test covers the claimed defect, or judge whether a prevention line is concrete enough; reviewers must inspect those claims. A matching filename alone is not evidence that the regression fails before the fix.
