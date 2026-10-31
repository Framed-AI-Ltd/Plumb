# Local agent security setup

`.agents/settings.json` (also reached through the `.claude` symlink) permits selected local checks only. Docker commands are limited to config/ps; starting services, destructive cleanup and unrestricted shell commands are not blanket approved. The OS sandbox must enforce deny-read paths for child processes too; a tool-level Read deny alone cannot prevent `cat` or a spawned interpreter from reading credentials. Confirm sandbox support on the host before use. No production credentials belong in development.

Keep GateGuard, destructive Bash guards and secret-read guards active. Do not add project-path exemptions.

This library supplies UI components, not an authentication backend. Signing identities must be configured and verified for each checkout. Configure signing identity and branch protections through the owner's normal setup, then verify actual signed commits and protection results; do not claim them from these files.

Semgrep is a separate development prerequisite. Run `node tools/verify-project-rules.mjs`, then `semgrep scan --config .semgrep/rules.yml src`. Rules target narrow, demonstrated shapes and do not replace review of serializers or server authorization.

CI uses pinned `semgrep==1.183.0`, matching the validated fixture version. `node tools/verify-project-rules.mjs` validates rule fixtures; `node tools/verify-project-rules.mjs --scan` scans source and exits unsuccessfully on findings. Install the scanner separately in an isolated CI/development environment; no package runtime dependency is implied.

Loopback binding is enabled for the isolated Vite/Storybook/Playwright fixtures. Filesystem denials and strict sandbox startup remain enabled; this does not authorize publication or credential access.

Library, Storybook and test Vite configurations disable automatic dotenv discovery (`envDir: false`); these fixtures do not need environment files.

Shared skills use `.agents/skills` for cross-agent discovery. The settings JSON retains Claude's native schema; Codex and other agents use their own permission/sandbox configuration. A shared directory does not make those settings portable across runtimes.

Development security overrides pin `minimatch` 11.0.2 and `glob` 14.0.2. The small tracked minimatch patch restores legacy callable/default exports used by ESLint and its plugins without changing the patched matching engine. Dependency regressions exercise callable/named/ESM consumers, legacy ESLint overrides and Storybook globbing. Keep this compatibility coverage when updating or removing the overrides; no advisories are suppressed.
