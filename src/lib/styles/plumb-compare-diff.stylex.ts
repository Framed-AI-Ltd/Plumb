import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.textTertiary,
        "content": {
            "default": null,
            ":is(.plumb-compare-diff[data-differs])::before": "\"≠ \""
        },
        "opacity": {
            "default": null,
            ":is(:not([data-differs]))": 1
        },
        "display": {
            "default": null,
            ":is([data-differs])": "none"
        }
    }
});
