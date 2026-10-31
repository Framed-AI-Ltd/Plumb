import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "listStyle": "none",
        "margin": 0,
        "padding": 0,
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space2,
        "inlineSize": "100%",
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal"
    }
});
