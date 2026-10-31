@AGENTS.md

Use project skills in `.agents/skills` for procedures. Keep working context focused on the feature being changed.

Commands: `pnpm check`, `pnpm test:browser`, `pnpm test:calendar`, `pnpm package:smoke`, `pnpm catalog`, `pnpm dev`, `pnpm review`, `pnpm review:responsive`.
Static security checks: `semgrep scan --config .semgrep/rules.yml src`; validate rule fixtures with `node tools/verify-project-rules.mjs`.
