import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "listStyle": "none",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": tokens.space2,
        "marginLeft": 0,
        "paddingInlineStart": tokens.space6,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal"
    }
});
