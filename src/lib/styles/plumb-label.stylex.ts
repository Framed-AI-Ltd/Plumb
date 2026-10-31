import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontWeight": 500,
        "fontSize": "0.8125rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": {
            "default": tokens.text,
            ":is(.plumb-step-row[data-status=\"skipped\"] .plumb-label)": tokens.textSecondary
        },
        "flex": {
            "default": null,
            ":is(.plumb-takeoff-list .plumb-label)": "1"
        }
    }
});
