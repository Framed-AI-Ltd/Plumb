# Working in Plumb

Plumb is Framed's contractor-first React design system, published as `@framed/plumb`.
Shared skills live in `.agents/skills`; `.claude` is a relative symlink to `.agents`. Read [CONTRIBUTING.md](CONTRIBUTING.md) and the relevant [procedure](docs/agents/workflow.md).

- Discover APIs in `src/index.ts` and `docs/catalog.json`; library internals import shared lib modules or feature facades; document new APIs and named stories, then `pnpm catalog`.
- Preserve unknowns (`null`, never zero), provenance, dashed AI drafts until acceptance, lifecycle distinctions, and private/customer boundaries. Money must retain allowances and contingency at face value.
- Use Plumb, React Aria, Lucide outline icons only, and the approved Denim palette. No new icon pack, palette or gradients. New styles use StyleX and semantic tokens; keep global/font bootstrap and third-party markup exceptions narrow.
- New application code follows nested `src/app` → `src/features/<feature>` → `src/lib`; lower layers never import higher ones. Existing library exports stay compatible.
- Visible copy uses EN/FR message keys; name icon controls, retain keyboard/focus behavior and test narrow, light/dark output.
- Keep typed input until async success and show errors inline. Use query hooks for server state; do not invent a backend, authentication or persistence.
- Files over 100 lines and over 200 lines produce advisory warnings (the latter is stronger); neither limit blocks a commit or justifies arbitrary splitting.
- Before nontrivial high-risk auth, data, money, infrastructure or new-dependency work, obtain approval of a concise plan (about 20 lines) with boundaries, risks, verification and rollback. Routine work proceeds within existing authorization.
- Work in an isolated Gitflow worktree: `feature/*` from `develop`, release branches from `develop`, hotfixes from `main`; confirm actual branch availability. Never rewrite shared history.
- Every review catch gets an executable regression test, lint rule or hook in the same PR. If automation is impractical, add one concrete prevention line here and explain why in the PR.
- Do not read `.env` files, AWS credential directories or production credentials. Use synthetic local fixtures. Repository permissions supplement the OS sandbox; they do not replace it.
- Local work only. Publishing, deployment, pushing and tags require explicit authorization. Signing and branch protection are setup requirements, not verified capabilities of this checkout.
- Keep generated output and docs synchronized. Record visible/API changes in the changelog; owner visual approval is separate from automated checks.
- Preserve PolyForm Noncommercial licensing and third-party notices; no commercial permission is implied.

`pnpm check` is the local gate; run relevant `pnpm test:browser`, `pnpm test:calendar`, rendered `pnpm review`, and `pnpm package:smoke` for API/package changes. Report unrun checks and actual screenshot inspection honestly.

- Privileged CI review helpers must come from the protected default branch; a PR base can be an unprotected feature branch. Verify this during workflow review.
