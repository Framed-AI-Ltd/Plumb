import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "marginTop": tokens.space2,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingInlineStart": "18px",
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space2,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal"
    }
});
