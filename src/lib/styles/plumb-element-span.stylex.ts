import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "whiteSpace": {
            "default": null,
            ":is(.plumb-source > span)": "nowrap"
        },
        "hyphens": {
            "default": null,
            ":is(.plumb-approval-stale span)": "manual"
        },
        "flexBasis": {
            "default": null,
            ":is(.plumb-takeoff-scale > span)": "100%"
        },
        "display": {
            "default": null,
            ":is(.plumb-money-range-bar > span)": "block"
        },
        "blockSize": {
            "default": null,
            ":is(.plumb-money-range-bar > span)": "100%"
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-money-range-bar > span)": tokens.textTertiary
        },
        "borderRadius": {
            "default": null,
            ":is(.plumb-money-range-bar > span)": "inherit"
        }
    }
});
