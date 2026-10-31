# Releasing @framed-ai/plumb

Use Node 24 and the pnpm version in `package.json`. Gitflow uses `main` for released source, `develop` for integration and `release/<version>` for stabilization. Feature branches start from `develop`; hotfixes start from `main`. Finish normal releases through reviewed PRs and the merge queue, then backmerge `main` into `develop`.

A stable release needs matching package/version/tag identity, a dated changelog entry, signed source, successful checks and explicit owner visual approval. The npm workflow validates the tagged commit against the current `main` tip, rebuilds/tests/packs it without npm publication credentials, then publishes only that run's verified archive from the protected `npm` environment. There is no npm-token fallback.

## Initial 0.0.1 handoff

The initial local Gitflow branches and signed `v0.0.1` tag are prepared before any push. The previous modernization changeset has been removed. Owner visual approval was recorded on 2026-10-31.

1. Add your selected public SSH key to the `Dev-Addict` GitHub account as a **Signing key**. A key registered only for authentication does not satisfy signed-commit verification. Confirm the commit email is verified on that account.
2. Authenticate GitHub locally with `gh auth login`, then `gh auth setup-git`. Push the branches first, keeping the release tag local until setup and CI are ready:

   ```sh
   git push -u origin main
   git push -u origin develop
   git push -u origin release/0.0.1
   ```

3. As an organization administrator, run `pnpm repo:configure --apply` and inspect `review-setup/github-readback.json`. This activates the documented repository protections, security settings, npm approval environment and Pages configuration. If the first Pages attempt ran before Pages was configured, rerun it afterwards. Configure another eligible code owner before relying on owner-authored PRs: GitHub does not allow authors to approve their own PRs.
4. CI's non-AI gates must be green. Configure native Codex automatic reviews in your ChatGPT account separately; the API-backed review workflow is disabled on GitHub, so no `OPENAI_API_KEY` is required for release setup.
5. If `@framed-ai/plumb` does not yet exist on npm, establish the package before configuring its trusted publisher. The prepared bootstrap archive is a distinct prerelease, so it does not consume `0.0.1`. Use an npm account authorized for the `framed-ai` organization in a trusted temporary release environment (for example, an ephemeral Codespace), keeping publishing credentials off development machines:

   ```sh
   npm login
   npm publish release/bootstrap/framed-ai-plumb-0.0.1-bootstrap.0.tgz --access public --tag bootstrap --ignore-scripts
   npm logout
   ```

   This is a one-time manual account bootstrap. It uses the normal interactive npm/2FA channel; no npm token belongs in the repository or CI. On a fresh checkout, regenerate the two archives with `pnpm pack --pack-destination release`, then `node tools/prepare-bootstrap.mjs release/framed-ai-plumb-0.0.1.tgz`. The helper prepares files locally and runs no publication command. Skip bootstrap if the package already exists.

6. In npm's package settings, add the GitHub Actions trusted publisher with organization **Framed-AI-Ltd**, repository **Plumb**, workflow **publish.yml**, environment **npm**. Allow direct publishing for this connection: the workflow uses `npm publish`, not stage-only publishing. Use exact capitalization. Create it shortly before the first automated publish; an unvalidated publisher configuration currently expires after two days. See [npm's trusted-publisher guide](https://docs.npmjs.com/trusted-publishers/).
7. After source CI and account setup are ready, push the signed tag and approve the workflow's `npm` environment deployment:

   ```sh
   git push origin v0.0.1
   ```

   Check that `@framed-ai/plumb@0.0.1` is public on npm, has provenance, and installs in a clean consumer. The bootstrap prerelease uses the `bootstrap` tag; the stable workflow publication establishes `latest`.
8. Optionally create the GitHub Release page after the tag is present, using the prepared notes:

   ```sh
   gh release create v0.0.1 --verify-tag --title "Plumb 0.0.1" --notes-file docs/releases/0.0.1.md
   gh workflow run pages.yml --ref main
   ```

   Inspect `https://framed-ai-ltd.github.io/Plumb/`, including an iframe story and `licenses/`. The local Pages-path smoke check cannot verify GitHub's live environment configuration.

## Later releases

Cut `release/<version>` from `develop`, stabilize it through reviewed PRs, update the version and dated changelog, merge to `main`, sign/tag the current main commit and push only with owner authorization. Backmerge to `develop`. npm trusted publishing then handles routine releases without a long-lived npm token or another bootstrap package.
