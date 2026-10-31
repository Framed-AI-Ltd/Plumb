# UI research and how Plumb meets it

Sources: [Ant Design colours](https://ant.design/docs/spec/colors) and [values](https://ant.design/docs/spec/values) · [NN/g 10 heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) · [NN/g flat design](https://www.nngroup.com/articles/flat-design/) · [NN/g colour](https://www.nngroup.com/articles/color-enhance-design/) · [Laws of UX](https://lawsofux.com/) · [Apple HIG colour](https://developer.apple.com/design/human-interface-guidelines/color) · [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) · [Refactoring UI](https://refactoringui.com/) · home-services colour research ([Logoworks](https://logoworks.com/how-to-choose-brand-colors/), [Cube Creative](https://cubecreative.design/blog/small-business-marketing/color-psychology-home-service-branding)).

| Principle (source) | How Plumb meets it |
| --- | --- |
| **Visibility of system status** (NN/g 1) | Journey stepper, file reading states, partial totals, toasts after actions, draft and "not applied" labels |
| **Match the real world** (NN/g 2) | Contractor vocabulary: allowance, provisional sum, revision, site visit. Units always explicit |
| **User control and freedom** (NN/g 3) | Dismiss/discard on every AI draft, Cancel in dialogs, change previews before applying |
| **Consistency and standards** (NN/g 4, Jakob's law, Ant "Certain") | Ant conventions: line tabs, Alert-style callouts, 10-shade ramps, Ant neutral levels. One meaning per colour (Apple) |
| **Error prevention** (NN/g 5) | Issue dialogs name the recipient and revision; stale approvals flagged; "Prepare proposal" disabled while items are unpriced |
| **Recognition over recall** (NN/g 6, Miller) | Open items show the next step and owner; sources shown inline; share preview lists exactly what is sent |
| **Flexibility** (NN/g 7) | Compact density, keyboard support throughout via React Aria, filter chips |
| **Aesthetic and minimalist** (NN/g 8, Ant "Keep restraint") | Neutral-first, about 60-30-10; no gradients; colour only for meaning |
| **Recover from errors** (NN/g 9) | Field errors with icon, plain words, and the fix ("Enter the 6-digit number from the city notice") |
| **Help in context** (NN/g 10) | Field descriptions, provenance tooltips, assistant answers with sources |
| **Flat 2.0 signifiers** (NN/g) | Buttons keep fills and a 2 px Ant shadow; inputs keep a visible edge; cards lift with shadow |
| **Fewer borders** (Refactoring UI) | Cards separate by shadow and space; tables use row hairlines only |
| **Hick's law, one clear action** | One primary button per region |
| **Fitts's law / target size** (WCAG 2.5.8) | Controls 34 px (28 compact, 42 touch); icon buttons ≥ 28 px |
| **Proximity and common region** (Gestalt) | Label → field → help stacked tightly; related facts grouped in cards |
| **Goal gradient / Zeigarnik** | Journey stepper and "Almost there — one quantity to measure" |
| **Peak-end** | Issue and approve moments get a calm dialog and a confirming toast |
| **Doherty threshold** | 120–200 ms transitions; no blocking animations; reduced motion respected |
| **Use of colour** (WCAG 1.4.1, Apple) | Status always has icon + text; lifecycle uses shapes (dot, dashed, check) |
| **Contrast** (WCAG 1.4.3 / 1.4.11) | 180 automated pairs at AA; focus ring 3:1; small-control boundaries 3:1 |
| **Content on hover** (WCAG 1.4.13) | Tooltips are supplementary, dismissible (React Aria) |
| **Increased contrast / forced colours** (Apple, WCAG) | `prefers-contrast: more` restores full 3:1 boundaries and card outlines; forced-colours outlines |

## Known trade-off to decide
**Input boundaries:** Outlined fields are the supported input treatment. Keep visible labels, focus indicators and increased-contrast borders; verify affected states with browser and accessibility checks.
