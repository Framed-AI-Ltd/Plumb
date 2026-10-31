import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexWrap": "wrap",
        "overflowWrap": "anywhere",
        "alignItems": "center",
        "gap": tokens.space3,
        "fontWeight": 500,
        "fontSize": "0.8125rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.text
    }
});
