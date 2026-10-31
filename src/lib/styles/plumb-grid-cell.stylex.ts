import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "paddingTop": tokens.space3,
        "paddingRight": tokens.space4,
        "paddingBottom": tokens.space3,
        "paddingLeft": tokens.space4,
        "padding": {
            "default": null,
            ":is([data-picker])": "2px"
        },
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary,
        "outline": "none",
        "cursor": "cell",
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "textAlign": {
            "default": null,
            ":is([data-col=\"qty\"])": "end",
            ":is([data-col=\"rate\"])": "end",
            ":is([data-col=\"amount\"])": "end"
        },
        "fontVariantNumeric": {
            "default": null,
            ":is([data-col=\"qty\"])": "tabular-nums",
            ":is([data-col=\"rate\"])": "tabular-nums",
            ":is([data-col=\"amount\"])": "tabular-nums"
        },
        "boxShadow": {
            "default": null,
            ":is(.plumb-line-grid:focus-within .plumb-grid-cell[data-active])": `inset 0 0 0 2px ${tokens.focusRing}`,
            ":is(:focus-visible)": `inset 0 0 0 2px ${tokens.focusRing}`
        },
        "borderRadius": {
            "default": null,
            ":is(.plumb-line-grid:focus-within .plumb-grid-cell[data-active])": tokens.radiusXs
        },
        "minInlineSize": {
            "default": null,
            ":is([data-picker])": "220px"
        }
    }
});
