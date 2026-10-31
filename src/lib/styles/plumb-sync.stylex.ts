import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-flex",
        "alignItems": "center",
        "gap": tokens.space2,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": {
            "default": tokens.textSecondary,
            ":is([data-state=\"offline\"])": tokens.warningText,
            ":is([data-state=\"conflict\"])": tokens.warningText,
            ":is([data-state=\"failed\"])": tokens.warningText
        }
    }
});
