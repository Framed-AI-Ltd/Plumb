# Licensing Plumb

Plumb uses the **PolyForm Noncommercial License 1.0.0**, SPDX identifier `PolyForm-Noncommercial-1.0.0`. The complete, unmodified terms are in [LICENSE](../LICENSE); the [official text](https://polyformproject.org/licenses/noncommercial/1.0.0) is the source. This guide explains the public licence and records the separate named-individual permission below. The public licence text remains unchanged.

## Public licence

Project-authored code and accompanying documentation and design assets are offered under LICENSE unless a file identifies separate terms. The licence permits use, modification, and redistribution for its permitted purposes, subject to its conditions and notice requirements.

- Noncommercial purposes are permitted.
- Personal study, hobby projects, and the other personal uses listed in the licence are permitted without an anticipated commercial application.
- The licence expressly permits use by listed charitable, educational, public research, public safety or health, environmental protection, and government organizations, regardless of funding or funding obligations.
- Distributions must preserve the licence terms or their URL and any applicable `Required Notice:` lines.

The public licence is broader than personal-only use. Describe Plumb as **source-available under a noncommercial licence**; the project does not use an OSI-approved open-source licence.

## Separate commercial permission

Except for the named-individual permission below, for commercial use outside LICENSE's permitted purposes, obtain a separate written licence from the relevant copyright holders before proceeding. This can include use in a paid product or paid client project when no permitted-purpose provision applies.

For commercial licensing inquiries and administration, contact **Aria AzadiPour** or **Anskey Miranda** to request a separate written commercial licence. Pricing and contract terms are agreed separately. Permission must come from the relevant rights holders; a public repository, npm download, or unanswered request does not provide a separate commercial grant.

The public licence remains the default. Separate commercial agreements cover only the material and rights their grantors are entitled to license.

## Permission for Aria AzadiPour and Anskey Miranda

**Aria AzadiPour** and **Anskey Miranda** each have royalty-free permission to use, copy, modify, create derivative works from, distribute, sublicense, and sell Plumb for commercial or noncommercial projects outside Framed, without a licence fee or further commercial-licence approval.

This includes their own projects and work for other organizations or clients, provided those projects are not owned or controlled by Framed and are not undertaken on Framed's behalf. They may choose the licensing terms for those projects, subject to the rights and notices of any included third-party material.

This separate permission applies only to material and rights that Framed or the granting copyright holders are entitled to license. It does not relicense third-party material or outside contributions without the necessary authorization. Preserve applicable copyright and third-party notices. The warranty disclaimer and liability limitations in LICENSE apply to this permission. The public PolyForm Noncommercial licence remains the default for other users.

## Contributions and third-party material

Contributors retain ownership of their contributions. Submit only material you have permission to contribute under the project's licence. A pull request does not transfer copyright or, by itself, provide commercial relicensing rights. Before granting a commercial licence that includes outside contributions, maintainers must obtain the necessary rights from the relevant contributors; any contributor agreement is a separate decision.

Dependencies, fonts, icons, and other third-party material retain their respective licences and notices. Plumb's licence does not replace those terms or give the project authority to relicense material it does not own. See each dependency's distributed licence and the [icon guide](ICONS.md).

## Packaging and release

- `package.json` declares `PolyForm-Noncommercial-1.0.0`.
- The npm package includes LICENSE and this guide. `pnpm package:smoke` verifies that their contents and the licence metadata survive packing unchanged.
- `pnpm publish` checks that a licence is declared, LICENSE exists, and the selected PolyForm licence has the expected title. Repository URLs and the dated release changelog must also be resolved. Run `node tools/release-guard.mjs` to check these conditions without publishing.
- Keep this guide, README, contributor guidance, and package metadata synchronized when licensing changes.

Storybook redistributes Inter, Plus Jakarta Sans and Nunito Sans. Its build includes their unchanged copyright notices and OFL texts under `licenses/`; `pnpm verify:storybook` checks these artifacts before Pages upload.
