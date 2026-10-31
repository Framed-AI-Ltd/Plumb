import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "padding": tokens.space4,
        "borderRadius": tokens.radiusMd,
        "backgroundColor": tokens.fillLayout,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space2
    }
});
