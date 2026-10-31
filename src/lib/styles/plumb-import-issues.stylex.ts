import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "gap": tokens.space3,
        "padding": tokens.space4,
        "borderRadius": tokens.radiusMd,
        "backgroundColor": tokens.warningBg,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal"
    }
});
