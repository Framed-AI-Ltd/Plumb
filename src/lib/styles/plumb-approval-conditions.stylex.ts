import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "margin": 0,
        "paddingInlineStart": `calc(20px + ${tokens.space4} + 16px)`,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.textSecondary
    }
});
