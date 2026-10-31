# Plumb design principles

**Plumb should feel like a calm, well-kept home office: warm, orderly, and trustworthy with money.** It is built on Ant Design's values (Natural, Certain, Meaningful, Growing) and on the research in [RESEARCH.md](RESEARCH.md).

## 1. Restraint first (Ant "Keep restraint", NN/g minimalist design)
Colour is used to inform, guide, and give feedback, and almost never to decorate. Aim for roughly **60 % cream neutrals, 30 % white surfaces and ink, 10 % colour**. Use no gradients, glows, or decorative illustration in working screens.

## 2. One colour, one meaning (Apple HIG, Ant functional colours)
| Colour | Meaning | Where |
| --- | --- | --- |
| **Denim** (brand) | Act, selected, link, focus, info | Primary button, current nav item, selected tab, links |
| **Jade / ochre / brick** | Success / warning or unknown / error | Badges, callouts, field errors, icons |
| **Decorative** (clay, rose, honey, sage, lake, spruce) | *Which category* | Small tags, avatars, small icon tiles only |
| **Cream neutrals** | Everything else | Pages, cards, text, borders |

Never put status colours on decoration, or decorative colours on status. Colour is always paired with an icon and words. See [COLOR.md](COLOR.md) for how each colour was chosen and verified.

## 3. Soft depth, few lines (NN/g flat 2.0, Refactoring UI)
- Cards separate by soft shadow and space, not borders. Tables use row hairlines only.
- Things you can press keep visible signifiers: filled or bordered buttons with a slight 2 px shadow, and fields with a visible edge.
- Floating layers (menus, dialogs, drawers) use the stronger shadow.

## 4. One loud thing per region (Hick's law, Von Restorff)
Use at most one primary button per card, panel, or dialog. Everything else is `secondary`, `soft`, or `ghost`.

## 5. Friendly, exact type
Plus Jakarta Sans for headings, Inter for everything else. Money and quantities use tabular figures and explicit units and currencies.

## 6. Speak like a helpful neighbour (NN/g "match the real world")
Use plain, specific words, name the person, and say what happens next and what doesn't. For example: "Alex will receive revision P-003. Rates and notes stay with you."

## Truth principles (Framed product rules)
7. **Unknowns stay unknown.** Use `Unknown` and `Provenance kind="unknown"`, never 0 or a guess. Partial totals say "partial".
8. **Facts show how they're known.** `Provenance` (supplied, inferred, measured, verified, conflicting) plus `SourceTag`.
9. **Drafts look like drafts.** Dashed outline and an "AI draft" or "Preview · not applied" label. AI edits apply to the working draft only (`DraftSuggestion`, `ChangePreview`).
10. **Lifecycle is visible without colour.** Current, proposed, approved, and completed have distinct shapes (`LifecycleTag`). Stale approvals are flagged (`ApprovalSnapshot`).
11. **Private stays private, visibly.** `VisibilityTag`, `EstimateBreakdown view="customer"`, and a `SharePreview` before any external action.
12. **Money is honest.** Allowances, provisional sums, contingency, and exclusions use `ItemKind` and never blend into fixed totals. The arithmetic is inspectable (`EstimateBreakdown`).
13. **Deliberate decisions get a pause.** Issuing, sharing, and approving go through a `Dialog` that names the recipient and revision.

## Icons
Lucide only, sized and coloured by the component, never the sole carrier of meaning, and one icon per meaning (for example, `Sparkles` only for AI). See [ICONS.md](ICONS.md).

## Accessibility baseline
WCAG 2.2 AA for every text and status pair (proven by `pnpm tokens`), colour-blind-safe status colours (`pnpm verify:palette`), keyboard and screen-reader support via React Aria, and support for reduced motion, increased contrast, and forced colours. The input-boundary trade-off is described in [RESEARCH.md](RESEARCH.md).
