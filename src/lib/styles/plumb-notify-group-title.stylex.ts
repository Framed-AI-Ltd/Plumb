import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": tokens.space1,
        "marginLeft": 0,
        "fontWeight": 500,
        "fontSize": "0.6875rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.textTertiary
    }
});
