import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "margin": 0,
        "paddingInlineStart": "20px",
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space3,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal"
    }
});
