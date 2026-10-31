# Contributing to Plumb

Read [AGENTS.md](AGENTS.md) for project invariants and [task procedures](docs/agents/workflow.md) for implementation and review.

Use the Node version in `.nvmrc` and the pnpm version in `package.json`. Run `pnpm install`, then `pnpm dev` for Storybook on port 6007. Credentials are unnecessary for local UI work; use synthetic data and never production secrets.

Reuse `docs/catalog.json`, `src/index.ts` and existing stories. New exports need authored API comments, catalogue output and named stories covering loading, empty, error, long text and narrow layouts. Write a short `docs/features/F-…-name.md` only for supported feature behavior: goal, acceptance criteria and explicit exclusions.

New styles use StyleX and existing semantic tokens. Preserve Denim and Lucide outline icon conventions. Edit palette sources rather than generated tokens. Retain EN/FR messages, React Aria accessibility and the truth/privacy rules in AGENTS.

Use Gitflow with isolated worktrees. Start `feature/*` from `develop`; merge reviewed features into `develop`, cut `release/*` from it, and merge releases into `main` and back into `develop`. Hotfixes start from `main` and return to both. Confirm available branches/remotes first; do not create or push remote branches without authorization. Use signed commits once the owner has configured a working signing identity; this checkout does not prove signing or branch protection is set up. Report unsigned local commits honestly.

Before requesting review, run `pnpm check` and `pnpm build`. Run relevant browser/calendar checks, `pnpm package:smoke` for API changes, and Storybook axe/screenshot review for visual changes. Inspect rendered light/dark and narrow layouts; record unrun checks. Add an Unreleased changelog entry. Automated checks do not grant owner visual approval.

Every review catch needs an executable regression in the same PR; when automation is impractical, record a one-line prevention rule in AGENTS and the reason in the PR. File-size warnings at 100 and 200 lines are both advisory; 200 carries a stronger diagnostic.

Contributions use [PolyForm Noncommercial 1.0.0](LICENSE). Preserve notices and contribute only material you may license under these terms; contributors retain copyright. See [licensing](docs/LICENSING.md).

Releases follow the [release procedure](.agents/skills/release/SKILL.md). Local packaging is permitted; publishing, tags and pushes need explicit owner authorization.

## Commit checks

`pnpm install` installs Husky locally through `prepare`. Each commit runs `pnpm check:static` against a temporary copy of the staged project: token/contrast freshness, palette provenance, EN/FR keys, TypeScript, ESLint (including accessibility and architecture rules), import cycles and public catalog freshness. Dependencies must be installed first. Checks preserve the working tree and index; stage all related generated files with their sources. Fix failures, run `pnpm generate` for stale generated output, stage the results and retry. The 100/200-line warnings remain advisory.

`pnpm check` runs the same static checks plus unit/rule regressions. Browser, visual, Semgrep and workflow-security checks remain separate CI gates. Husky installation is skipped in CI and production. Local hooks can be bypassed by Git, so required CI checks remain authoritative.
