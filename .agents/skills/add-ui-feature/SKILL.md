---
name: add-ui-feature
description: Compose supported Plumb UI features with accessible states, StyleX and browser checks.
---

Read AGENTS and the applicable short feature spec. Search Plumb exports/catalogue before creating components. Keep public APIs compatible; new application code nests app → features → lib, with no upward imports.

In consuming apps, compose `@framed/plumb` primitives. Inside this library, import shared `lib` modules or feature index facades, never the package entry from a lower layer; use React Aria, Lucide outline icons, approved Denim and StyleX semantic tokens. Put EN/FR copy in messages. Preserve unknown amounts, sources, draft acceptance and customer/private boundaries.

Use existing query hooks for server state. When none exist, keep a caller-owned interface and document the integration gap; do not fabricate services or add a query dependency without the required approved plan. Preserve user input through mutation failure and prevent duplicate submission.

Add stories for empty/loading/error/read-only/draft and narrow layouts. Test the real browser path with keyboard, focus restoration, accessible names, failed requests and successful state transitions where the app supports them. Do not claim end-to-end backend coverage from fixture tests.

Run pnpm check, relevant browser checks, catalogue and package smoke for exports. Inspect actual light/dark and narrow output and report owner approval separately.
