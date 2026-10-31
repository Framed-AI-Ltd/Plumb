---
name: release
description: Prepare a Plumb release locally and publish only with explicit owner authorization.
---

Confirm scope, clean worktree, release branch, version, changelog, licence and supported public exports. Run pnpm check, pnpm build and pnpm package:smoke; inspect the tarball exports, CSS and declarations. Verify relevant rendered and browser results and owner visual approval separately.

Prepare release notes and reviewable local artifacts. Do not claim signing, authentication, branch protection or registry access is configured: check nonsecret metadata only and document setup gaps. Never read production credentials.

Tagging, pushing, publishing or deploying requires explicit owner authorization for the concrete release. Stop before those actions without it. Once authorized, use configured signing and least-privilege release credentials through the owner's normal secure channel; never commit them. Record actual results and rollback/version recovery limitations.
