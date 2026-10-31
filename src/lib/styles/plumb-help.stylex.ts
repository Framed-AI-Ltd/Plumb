import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "outline": "none",
        "paddingBlock": tokens.space4,
        "paddingInline": tokens.space5,
        "maxInlineSize": "280px",
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.text,
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space2
    }
});
