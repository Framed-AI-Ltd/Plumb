# How Plumb's colours were chosen

The colours were chosen one at a time, each derived from the one before, and then verified together. The source of truth is `tools/palette.mjs`. `pnpm tokens` proves contrast and `pnpm verify:palette` proves harmony and colour-blind safety.

Generated themes live in `src/lib/theme/tokens.stylex.ts`. The generated `src/styles/tokens.css` is retained for audits and is not imported or shipped as the component stylesheet.

## Method (research)
- **Ant Design:** colour is *restrained*: it passes on information, guides operations, and gives feedback. Every colour is a 10-shade ramp generated from one base (shade 6) with `@ant-design/colors`. Functional colours keep their conventional meanings.
- **NN/g:** about three colours in a 60-30-10 split, with dominant and secondary colours mostly neutral and the accent reserved for what matters. Colour psychology is weak evidence, so choose from brand traits and test with users.
- **Apple HIG:** don't use one colour for two meanings, don't rely on colour alone, and support dark mode and increased contrast.
- **Home-services branding research:** blue is the trust colour for people entering someone's home. A warmer, calmer blue with a warm accent feels more neighbourly than generic navy or SaaS blue.

## 1. Primary: Denim `#5c87b8`
**Brand traits:** dependable, homey, crafted, calm, precise.

| Candidate | Why not |
| --- | --- |
| Ant/SaaS blue `#1677ff` | Chroma 0.22; it's the "every other website" look |
| Navy | Heavy and corporate, not homey |
| Teal, forest | Too close to success green |
| Terracotta, amber | Collide with warning and error (amber was the rejected original) |
| Purple | Rejected in review |

Denim keeps blue's trust signal at a workwear chroma (OKLCH C 0.089), echoes contractors' denim and blueprints, and passes 6.1:1 with white text on its solid shade (shade 7).

## 2. Neutrals: cream, hue 72°
Denim's OKLCH hue is 252°, so its complement is 72°, a warm cream. The neutrals are tinted toward 72° so the page is warm and homey while Denim reads clearly against it. Text, borders, and fills are Ant's neutral levels of one warm ink (`#2a2118`-ish) over the background.

## 3. Secondary accent: Clay
Clay sits at Denim's warm split-complement (156° away). It appears in small doses only: category tags, avatars, and small icon tiles. It is never used for actions or status.

## 4. Functional colours
These use the same calm family as Denim, with hues far from it and from each other, and are tuned so they also separate **by lightness** for colour-blind users:
- **Success: jade** `ok(0.70 0.13 160)`
- **Warning: ochre** `ok(0.76 0.13 80)`
- **Error: brick** `ok(0.60 0.16 28)`
- **Info:** uses Denim, as in Ant.

## 5. Decorative colours
Rose, clay, honey, sage, spruce, and lake share one lightness (0.66–0.70) and one chroma band (0.065–0.085), with hues spread from 8° to 222°. The purple quarter of the wheel is deliberately left empty. Equal weight makes them read as one family and keeps any one from shouting.

## 6. Verification (31 + 180 automated checks)
| Check | Result |
| --- | --- |
| Cream is Denim's complement | 180° ✓ |
| Clay is the warm split-complement | 156° ✓ |
| Brand vs success / warning / error hue | 102° / 172° / 133° ✓ |
| Brand and decorative chroma in 0.06–0.10 (no neon) | ✓ |
| Decorative lightness matched | ✓ |
| Normal, deuteranopia, protanopia, tritanopia: success, warning, error, and brand all ΔE2000 ≥ 12 apart on displayed shades | ✓ |
| WCAG AA for every text and status pair, both themes, cream and grey neutrals | 180/180 ✓ |

Colour is still never the only signal: every status has an icon and words.
