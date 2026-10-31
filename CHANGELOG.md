# Changelog

All notable changes to `@framed-ai/plumb` follow [Semantic Versioning](https://semver.org/). Before 1.0, minor releases may change the API.

## [Unreleased]

### Changed

- Align Storybook core, renderer and addons at 10.6.5; adopt TypeScript 6.0.3 and Lucide React 1.61.0 while keeping Node 24 runtime typings.
- Update pinned GitHub Actions for checkout, pnpm setup, dependency review, Pages artifact upload and workflow security without relaxing permissions or checkout safety.

### Fixed

- Allow protected-main retries to rebuild existing release tags without moving them, while retaining npm environment approval and token-free publishing.
- Publish verified npm archives with explicit local paths so tarball names cannot be interpreted as GitHub repositories.

## [0.0.1] - 2026-10-31

### Added

- Initial public release of Plumb, Framed's React design system, using React Aria, StyleX, Denim and outlined inputs.
- English/French localization, component and page-template stories, accessibility checks and visual regression coverage.
- Gitflow guidance, Husky staged static checks, agent skills, member-gated Codex reviews, and GitHub Pages/npm publishing workflows.
- PolyForm Noncommercial licensing with separate commercial licensing contacts and the named-individual permission documented in [the licensing guide](docs/LICENSING.md).

### Fixed

- Consolidate PR browser, accessibility and screenshot evidence with conservative story selection; keep pixel differences advisory and retain full scheduled/manual visual reviews without imposing proposed-build style assertions on historical reference captures.
- Make disabled button colors, calendar icon sizing, confirmed overdue event colors and estimate-grid header spacing independent of compiled CSS order, preserving the approved visual baselines.
- Add Dependabot cooldowns and enable the approved solo-maintainer review policy for main/develop/release branches while retaining CI, signed commits and merge queues.
- Correct the npm scope to `@framed-ai/plumb`, including release guards, bootstrap archive names, generated metadata and consumer examples.
- Derive partial estimate totals from unpriced work, including customer views, while keeping options and exclusions outside the base price.
- Parse formatted text with forward-only lookaheads so malformed links cannot cause repeated full-string scans.
- Include unchanged font copyright notices and OFL terms in Storybook output, with artifact checks for missing notices and uncredited font families.
- Remove an obsolete migration-guide link and check repository-relative documentation links automatically.

### Security

- Use patched development glob/matcher dependencies with compatibility coverage for legacy lint consumers.

### Approval

- Owner approved the visual design on 2026-10-31. Automated checks remain separate from owner approval.
