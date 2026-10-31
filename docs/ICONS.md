# Icons

**Decision (2026-10-29):** Plumb uses **[Lucide](https://lucide.dev)** for all interface icons, through the `lucide-react` package (version range in `package.json`). The original Framed Design system uses the same library.

## Why Lucide
- **Fits the look.** Single-weight outline icons with rounded line ends suit the calm, flat 2.0 style. They sit quietly next to Inter text and don't compete with colour.
- **Consistent.** One stroke weight, one 24 px grid, and one corner style across about 1,500 icons, so mixed screens stay even.
- **Covers the trade.** It includes building and home icons (`Hammer`, `Wrench`, `Ruler`, `House`, `Bath`, `CookingPot`, `Layers`) alongside the usual interface set.
- **Practical.** It is open source (ISC licence), tree-shakeable (only imported icons ship), and React components take `size`, `color`, and `strokeWidth` props.

## How to use icons
1. **Import named icons from `lucide-react`.** Don't add another icon set, and don't paste raw SVGs. The only hand-drawn SVG is the tooltip arrow (`src/components/feedback.tsx`).
2. **Let components size them.** Plumb's CSS sets icon size per component; don't pass `size` in app code unless a component asks for it.

   | Context | Size |
   | --- | --- |
   | Badges, tags, source lines, inline meta | 12 px |
   | Buttons, menu items, nav, fields, table cells | 16 px |
   | Callouts, toasts, approval headers | 16–20 px |
   | Icon tiles: sm / md / lg | 15 / 18 / 22 px |
   | Empty states, file drop | 20–22 px |

3. **Let colour inherit.** Icons use `currentColor`, so they take the text or tone colour of their component. Don't colour icons on their own; status icons get their colour from `--success-icon`, `--warning-icon`, `--error-icon`, or `--info-icon`.
4. **Keep the default stroke.** Don't change `strokeWidth`. The only exception is the check mark inside checkboxes and steps, which uses 3 so it reads at 12 px.
5. **Never use an icon alone to carry meaning.** Pair it with a visible label. If a button is icon-only, use `IconButton`, which requires a `label` for its accessible name. Decorative icons get `aria-hidden`.

## One icon, one meaning
Reuse these consistently so an icon always says the same thing:

| Meaning | Icon |
| --- | --- |
| AI draft, inferred by Framed | `Sparkles`, and only for AI |
| Source document | `FileText` |
| Confirmed: verified, success, done | `CircleCheck` |
| Not confirmed yet: unverified source, proposed lifecycle, missing input | `CircleDashed` (the dashed circle always means "not confirmed yet", matching dashed outlines for drafts) |
| Unknown | `CircleHelp` |
| Warning or conflict / error / info | `TriangleAlert` / `CircleAlert` / `Info` |
| Contractor-only, private | `Lock` |
| Shared with customer | `Users` |
| Send, issue | `Send` |
| Measured | `Ruler` |
| Lifecycle: current / approved / completed (proposed: see above) | `CircleDot` / `Check` / `BadgeCheck` |
| Allowance / provisional / contingency / option / excluded | `Wallet` / `Hourglass` / `ShieldCheck` / `GitBranch` / `CircleSlash` |
| Reading, in progress | `Loader` |

Category tags (trades, rooms) don't carry icons in dense views such as tables. Rooms may use an icon in tiles and in the space tree.

## Changing the icon set
Treat it like a colour change: update this file, swap the package, rerun `pnpm check` and `pnpm review`, and review screenshots before adopting it.
