# Dependabot review - 2026-10-31

Scope: review the nine open Dependabot PRs, integrate compatible updates into develop, and preserve the published 0.0.1 release. No npm publication, main deployment, tag changes or new credentials are part of this maintenance.

| PR | Proposal | Decision and migration |
| --- | --- | --- |
| [14](https://github.com/Framed-AI-Ltd/Plumb/pull/14) | Lucide React 0.577.0 → 1.61.0 | Adopt the reviewed version exactly. Plumb uses none of the removed brand icons or UMD entry points. Preserve named icons and styling wrappers; test decorative hiding and explicit accessible labels. |
| [8](https://github.com/Framed-AI-Ltd/Plumb/pull/8) | Node typings 24.19.2 → 26.6.5 | Decline while .nvmrc and devEngines use Node 24. Newer runtime typings can accept APIs unavailable in the actual runtime. Retain 24.x and suppress major typing upgrades until an explicit runtime migration. |
| [7](https://github.com/Framed-AI-Ltd/Plumb/pull/7) | TypeScript 5.9.3 → 6.0.3 | Adopt. Existing explicit types, ES2022/Bundler settings and declaration rootDir satisfy the migration requirements. Validate lint support, declaration output and a strict NodeNext packed consumer without deprecation suppression. |
| [6](https://github.com/Framed-AI-Ltd/Plumb/pull/6) | Storybook 10.6.4 → 10.6.5 | Adopt core, React/Vite renderer, docs and accessibility addons together. The original core-only PR is incomplete for this repository's aligned-version policy. |
| [5](https://github.com/Framed-AI-Ltd/Plumb/pull/5) | Checkout 4.4.0 → 7.0.1 | Adopt the immutable upstream pin in every workflow. Retain disabled credential persistence, full-history/sparse settings and protected default-branch review helpers; do not opt out of safer fork-PR checks. |
| [4](https://github.com/Framed-AI-Ltd/Plumb/pull/4) | pnpm setup 4.3.0 → 6.1.0 | Adopt. This release explicitly supports the configured pnpm 12. Keep the existing Node 24 setup, explicit installs and cache settings. |
| [3](https://github.com/Framed-AI-Ltd/Plumb/pull/3) | Dependency review 4.9.0 → 5.0.0 | Adopt the Node 24 action on GitHub-hosted runners. Preserve moderate-severity blocking. Correct the bot diff's stale v4 comment to v5.0.0. |
| [2](https://github.com/Framed-AI-Ltd/Plumb/pull/2) | Pages artifact 3.0.1 → 5.0.0 | Adopt. Preserve the artifact path/name contract with deploy-pages v4, retention and license notices. Hidden files remain excluded by default. No Pages deployment is requested. |
| [1](https://github.com/Framed-AI-Ltd/Plumb/pull/1) | zizmor action 0.2.0 → 0.8.0 | Adopt the wrapper pin. Keep the explicit CLI pin and advanced-security=false, avoiding floating scanner versions or additional write permissions. |

The original PRs are superseded by the integrated, tested migration rather than merged with stale bases and overlapping lockfiles. Rejected/superseded PRs are closed after the replacement merges. The Dependabot ignore rule is stored in develop and becomes the default-branch configuration on the next normal promotion to main.

## Executable prevention

- tools/dependency-policy.test.mjs rejects mixed Storybook versions, Node/runtime typing mismatches, floating action refs, persisted checkout credentials and unsafe PR-checkout overrides.
- tests/icons.test.tsx exercises actual rendered Lucide SVG semantics and consumer-provided icon labels/classes.
- Existing packed-consumer checks compile declarations with strict NodeNext and exercise ESM/SSR, CSS, fonts and both locales.
- Existing Codex workflow tests retain protected default-branch helpers; the API-backed review workflow remains disabled on GitHub.

## Validation

The project gate (60 unit tests plus rule regressions), Storybook build, strict packed-consumer check, 21 browser regressions, calendar review and all six visual configurations passed locally. The replacement PR records the final rendered review, screenshot comparison and hosted CI evidence for its reviewed revision. Approved baselines are not updated automatically; automated checks do not grant owner visual approval.

## Primary sources

- [Lucide v1 migration](https://lucide.dev/guide/react/migration)
- [TypeScript 6 migration notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)
- [typescript-eslint supported versions](https://typescript-eslint.io/users/dependency-versions/)
- [Checkout v7 safety defaults](https://github.blog/changelog/2026-06-18-safer-pull_request_target-defaults-for-github-actions-checkout/)
- [pnpm action 6.1.0](https://github.com/pnpm/action-setup/releases/tag/v6.1.0)
- [Dependency review 5.0.0](https://github.com/actions/dependency-review-action/releases/tag/v5.0.0)
- [Pages artifact 5.0.0](https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0)
- [zizmor action 0.8.0](https://github.com/zizmorcore/zizmor-action/releases/tag/v0.8.0)
