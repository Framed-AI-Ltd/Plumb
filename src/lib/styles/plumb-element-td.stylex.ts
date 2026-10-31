import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "padding": {
            "default": null,
            ":is(.plumb-grid-total td)": tokens.space4,
            ":is(.plumb-month td)": {
                "default": tokens.space2,
                "@media (max-width: 640px)": "2px"
            }
        },
        "paddingTop": {
            "default": null,
            ":is(.plumb-grid-group td)": tokens.space4
        },
        "paddingRight": {
            "default": null,
            ":is(.plumb-grid-group td)": tokens.space4
        },
        "paddingBottom": {
            "default": null,
            ":is(.plumb-grid-group td)": tokens.space2
        },
        "paddingLeft": {
            "default": null,
            ":is(.plumb-grid-group td)": tokens.space4
        },
        "fontWeight": {
            "default": null,
            ":is(.plumb-grid-group td)": 500,
            ":is(.plumb-grid-total td)": 600
        },
        "fontSize": {
            "default": null,
            ":is(.plumb-grid-group td)": "0.8125rem",
            ":is(.plumb-grid-total td)": "0.8125rem"
        },
        "lineHeight": {
            "default": null,
            ":is(.plumb-grid-group td)": 1.45,
            ":is(.plumb-grid-total td)": 1.45
        },
        "fontFamily": {
            "default": null,
            ":is(.plumb-grid-group td)": tokens.fontBody,
            ":is(.plumb-grid-total td)": tokens.fontBody
        },
        "fontStyle": {
            "default": null,
            ":is(.plumb-grid-group td)": "normal",
            ":is(.plumb-grid-total td)": "normal"
        },
        "textAlign": {
            "default": null,
            ":is(.plumb-grid-group td)": "end",
            ":is(.plumb-grid-total td)": "end"
        },
        "borderBlockStartWidth": {
            "default": null,
            ":is(.plumb-grid-group td)": "1px",
            ":is(.plumb-month td)": "1px"
        },
        "borderBlockStartStyle": {
            "default": null,
            ":is(.plumb-grid-group td)": "solid",
            ":is(.plumb-month td)": "solid"
        },
        "borderBlockStartColor": {
            "default": null,
            ":is(.plumb-grid-group td)": tokens.border,
            ":is(.plumb-month td)": tokens.borderSecondary
        },
        "color": {
            "default": null,
            ":is(.plumb-grid-group td)": tokens.textSecondary
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-grid-total td)": tokens.fillLayout,
            ":is(.plumb-month td[data-empty])": tokens.fillLayout
        },
        "verticalAlign": {
            "default": null,
            ":is(.plumb-month td)": "top"
        },
        "blockSize": {
            "default": null,
            ":is(.plumb-month td)": "96px"
        },
        "borderInlineStartWidth": {
            "default": null,
            ":is(.plumb-month td:first-child)": 0,
            ":is(.plumb-month td)": "1px"
        },
        "borderInlineStartStyle": {
            "default": null,
            ":is(.plumb-month td)": "solid"
        },
        "borderInlineStartColor": {
            "default": null,
            ":is(.plumb-month td)": tokens.borderSecondary
        }
    }
});
