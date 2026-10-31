# Architecture

`src/index.ts` is the public package entry. Nested `src/lib` folders hold shared UI components, theme/locale utilities and styles. `src/features/<domain>` holds domain patterns with index facades. Compatibility facades preserve internal callers during migration; consumers import `@framed-ai/plumb`.

Dependencies flow from app/public entry to features to shared lib. Features may use another feature's public facade; imports into another feature's internals fail lint. Shared lib cannot import features or app. Each component usually has its own file, with types and pure helpers separated where useful. File-length warnings above 100 and 200 lines remain advisory; generated data and tightly coupled logic should not be split arbitrarily.

Behavior comes from React Aria. Components retain controlled/uncontrolled props, accessible names, focus behavior and asynchronous error handling. Visible words use the English/French message catalogs. Unknowns remain null, private information stays outside customer payloads and AI output remains a draft until acceptance.

Authored styles use StyleX, compiled through the official Vite plugin in the library and Storybook builds. Global reset/font bootstrap and documented third-party markup exceptions stay narrowly scoped. Numeric geometry calculated from measurements and consumer-supplied React style overrides remain inline; visual recipes and theme values compile through StyleX. Palette inputs remain in `tools/palette.mjs`; generated theme values are checked for light/dark contrast. Denim and outlined fields are the supported brand and field chrome.

`pnpm build` creates ESM JavaScript, TypeScript declarations and stylesheet/font/locale assets. Consumers load `@framed-ai/plumb/styles.css` once and optionally `fonts.css`; they do not need a StyleX build plugin. Package smoke checks use the actual packed tarball in an isolated strict NodeNext consumer and verify ESM/SSR plus assets.

`pnpm check` runs token contrast, palette, localization, strict types, lint, unit tests, rule regressions and catalog freshness. Interaction/calendar browser checks, responsive screenshots, visual regression and Semgrep supplement those checks in CI. Screenshots require inspection before baseline changes; passing automation does not grant owner visual approval.

Gitflow, repository protections and release procedures are described in [GITFLOW.md](GITFLOW.md), [CI-SETUP.md](CI-SETUP.md) and [RELEASE.md](RELEASE.md). Remote protections, verified signing, trusted publishing and provider access require live account setup and readback.
