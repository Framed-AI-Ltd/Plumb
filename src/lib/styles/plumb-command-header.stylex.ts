import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.textTertiary,
        "paddingTop": tokens.space3,
        "paddingRight": tokens.space3,
        "paddingBottom": tokens.space1,
        "paddingLeft": tokens.space3
    }
});
