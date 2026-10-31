import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "flex",
            "@media (max-width: 640px)": "none"
        },
        "alignItems": "center",
        "gap": tokens.space2,
        "listStyle": "none",
        "margin": 0,
        "padding": 0,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.textSecondary
    }
});
