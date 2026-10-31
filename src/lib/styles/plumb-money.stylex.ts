import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontVariantNumeric": {
            "default": "tabular-nums",
            ":is([data-size=\"lg\"])": "tabular-nums"
        },
        "whiteSpace": "nowrap",
        "fontWeight": {
            "default": null,
            ":is([data-emphasis=\"strong\"])": 600,
            ":is([data-size=\"lg\"])": 600
        },
        "fontSize": {
            "default": null,
            ":is([data-size=\"lg\"])": "1.5rem"
        },
        "lineHeight": {
            "default": null,
            ":is([data-size=\"lg\"])": 1.2
        },
        "fontFamily": {
            "default": null,
            ":is([data-size=\"lg\"])": tokens.fontBody
        },
        "fontStyle": {
            "default": null,
            ":is([data-size=\"lg\"])": "normal"
        },
        "letterSpacing": {
            "default": null,
            ":is([data-size=\"lg\"])": "-0.01em"
        },
        "flex": {
            "default": null,
            ":is(.plumb-approval-head > .plumb-money)": "none"
        },
        "justifySelf": {
            "default": null,
            ":is(.plumb-schedule-row > .plumb-money)": "end"
        }
    }
});
