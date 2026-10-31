import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "flex": "none",
        "inlineSize": "16px",
        "blockSize": "16px",
        "marginBlockStart": "3px",
        "display": "grid",
        "placeItems": "center",
        "borderWidth": {
            "default": "1px",
            ":is(.plumb-check-row[data-selected] .plumb-box[data-shape=\"radio\"])": "5px"
        },
        "borderStyle": {
            "default": "solid",
            ":is(.plumb-check-row[data-selected] .plumb-box[data-shape=\"radio\"])": "solid"
        },
        "borderColor": {
            default: tokens.controlBorder,
            ":is(.plumb-check-row[data-selected] .plumb-box[data-shape=\"radio\"])": tokens.accentSolid,
            ":is(.plumb-check-row[data-hovered] .plumb-box)": tokens.accentSolid,
            ":is(.plumb-check-row[data-selected] .plumb-box)": tokens.accentSolid,
            ":is(.plumb-check-row[data-indeterminate] .plumb-box)": tokens.accentSolid,
            ":is(.plumb-check-row[data-invalid] .plumb-box)": tokens.errorSolid
        },
        "borderRadius": {
            "default": tokens.radiusXs,
            ":is(.plumb-check-row .plumb-box[data-shape=\"radio\"])": "50%"
        },
        "backgroundColor": {
            "default": tokens.bgContainer,
            ":is(.plumb-check-row[data-selected] .plumb-box)": tokens.accentSolid,
            ":is(.plumb-check-row[data-indeterminate] .plumb-box)": tokens.accentSolid,
            ":is(.plumb-check-row[data-selected] .plumb-box[data-shape=\"radio\"])": tokens.bgContainer
        },
        "color": tokens.onAccent,
        "transition": `background ${tokens.durationFast} ${tokens.ease}, border-color ${tokens.durationFast} ${tokens.ease}`,
        "outline": {
            "default": null,
            ":is(.plumb-check-row[data-focus-visible] .plumb-box)": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "outlineOffset": {
            "default": null,
            ":is(.plumb-check-row[data-focus-visible] .plumb-box)": "2px"
        }
    }
});
