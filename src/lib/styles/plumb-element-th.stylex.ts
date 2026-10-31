import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "padding": {
            "default": null,
            ":is(.plumb-grid-total th)": tokens.space4,
            ":is(.plumb-month th)": tokens.space3
        },
        "paddingTop": {
            "default": null,
            ":is(.plumb-grid-group th)": tokens.space4
        },
        "paddingRight": {
            "default": null,
            ":is(.plumb-grid-group th)": tokens.space4
        },
        "paddingBottom": {
            "default": null,
            ":is(.plumb-grid-group th)": tokens.space2
        },
        "paddingLeft": {
            "default": null,
            ":is(.plumb-grid-group th)": tokens.space4
        },
        "fontWeight": {
            "default": null,
            ":is(.plumb-grid-group th)": 600,
            ":is(.plumb-grid-total th)": 600,
            ":is(.plumb-month th)": 400
        },
        "fontSize": {
            "default": null,
            ":is(.plumb-grid-group th)": "0.8125rem",
            ":is(.plumb-grid-total th)": "0.8125rem",
            ":is(.plumb-month th)": "0.75rem"
        },
        "lineHeight": {
            "default": null,
            ":is(.plumb-grid-group th)": 1.45,
            ":is(.plumb-grid-total th)": 1.45,
            ":is(.plumb-month th)": 1.5
        },
        "fontFamily": {
            "default": null,
            ":is(.plumb-grid-group th)": tokens.fontBody,
            ":is(.plumb-grid-total th)": tokens.fontBody,
            ":is(.plumb-month th)": tokens.fontBody
        },
        "fontStyle": {
            "default": null,
            ":is(.plumb-grid-group th)": "normal",
            ":is(.plumb-grid-total th)": "normal",
            ":is(.plumb-month th)": "normal"
        },
        "textAlign": {
            "default": null,
            ":is(.plumb-grid-group th)": "start",
            ":is(.plumb-grid-total th)": "start",
            ":is(.plumb-month th)": "start"
        },
        "borderBlockStartWidth": {
            "default": null,
            ":is(.plumb-grid-group th)": "1px"
        },
        "borderBlockStartStyle": {
            "default": null,
            ":is(.plumb-grid-group th)": "solid"
        },
        "borderBlockStartColor": {
            "default": null,
            ":is(.plumb-grid-group th)": tokens.border
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-grid-total th)": tokens.fillLayout
        },
        "color": {
            "default": null,
            ":is(.plumb-month th)": tokens.textTertiary
        }
    }
});
