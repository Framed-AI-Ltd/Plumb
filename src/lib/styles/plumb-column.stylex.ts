import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "textAlign": {
            "default": null,
            ":is(.plumb-table .plumb-column)": "start"
        },
        "fontWeight": {
            "default": null,
            ":is(.plumb-table .plumb-column)": 400
        },
        "fontSize": {
            "default": null,
            ":is(.plumb-table .plumb-column)": "0.75rem"
        },
        "lineHeight": {
            "default": null,
            ":is(.plumb-table .plumb-column)": 1.5
        },
        "fontFamily": {
            "default": null,
            ":is(.plumb-table .plumb-column)": tokens.fontBody
        },
        "fontStyle": {
            "default": null,
            ":is(.plumb-table .plumb-column)": "normal"
        },
        "color": {
            "default": null,
            ":is(.plumb-table .plumb-column)": tokens.textTertiary,
            ":is(.plumb-table .plumb-column[data-hovered])": tokens.text
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-table .plumb-column)": "transparent",
            ":is(.plumb-table[data-sticky] .plumb-column)": tokens.bgContainer
        },
        "padding": null,
        "paddingTop": {
            "default": null,
            ":is(.plumb-table .plumb-column)": tokens.space4,
            ":is(.plumb-line-grid .plumb-column[role=\"columnheader\"])": tokens.space3
        },
        "paddingRight": {
            "default": null,
            ":is(.plumb-table .plumb-column)": tokens.space5,
            ":is(.plumb-line-grid .plumb-column)": tokens.space4
        },
        "paddingBottom": {
            "default": null,
            ":is(.plumb-table .plumb-column)": tokens.space3,
            ":is(.plumb-line-grid .plumb-column)": tokens.space3
        },
        "paddingLeft": {
            "default": null,
            ":is(.plumb-table .plumb-column)": tokens.space5,
            ":is(.plumb-line-grid .plumb-column)": tokens.space4
        },
        "whiteSpace": {
            "default": null,
            ":is(.plumb-table .plumb-column)": "nowrap"
        },
        "outline": {
            "default": null,
            ":is(.plumb-table .plumb-column)": "none",
            ":is(.plumb-table .plumb-column[data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "cursor": {
            "default": null,
            ":is(.plumb-table .plumb-column[data-allows-sorting])": "pointer"
        },
        "position": {
            "default": null,
            ":is(.plumb-table[data-sticky] .plumb-column)": "sticky"
        },
        "insetBlockStart": {
            "default": null,
            ":is(.plumb-table[data-sticky] .plumb-column)": 0
        },
        "zIndex": {
            "default": null,
            ":is(.plumb-table[data-sticky] .plumb-column)": 1
        },
        "boxShadow": {
            "default": null,
            ":is(.plumb-table[data-sticky] .plumb-column)": `inset 0 -1px 0 ${tokens.borderSecondary}`
        },
        "outlineOffset": {
            "default": null,
            ":is(.plumb-table .plumb-column[data-focus-visible])": "-2px"
        }
    }
});
