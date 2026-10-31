import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "grid",
            "@media (max-width: 640px)": "none"
        },
        "gridTemplateColumns": "24px minmax(0, 2fr) auto minmax(0, 1fr) minmax(0, 1.4fr) 12ch auto",
        "gap": tokens.space4,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.textTertiary
    }
});
