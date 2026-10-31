import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": null,
            ":is(.plumb-select-value .plumb-check)": "none"
        },
        "visibility": {
            "default": null,
            ":is(.plumb-item .plumb-check)": "hidden",
            ":is(.plumb-item[data-selected] .plumb-check)": "visible"
        },
        "color": {
            "default": null,
            ":is(.plumb-item .plumb-check)": tokens.accentText
        }
    }
});
