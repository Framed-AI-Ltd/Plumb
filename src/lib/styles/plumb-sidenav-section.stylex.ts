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
        "paddingTop": tokens.space6,
        "paddingRight": tokens.space4,
        "paddingBottom": tokens.space3,
        "paddingLeft": tokens.space4
    }
});
