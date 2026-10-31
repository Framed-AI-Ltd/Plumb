import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "block",
            ":is(.plumb-select-value .plumb-item-description)": "none",
            ":is(.plumb-sync .plumb-item-description)": "inline"
        },
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.textSecondary,
        "flex": {
            "default": null,
            ":is(.plumb-question-head .plumb-item-description)": "1"
        },
        "flexBasis": {
            "default": null,
            ":is(.plumb-leveling-cell .plumb-item-description)": "100%"
        }
    }
});
