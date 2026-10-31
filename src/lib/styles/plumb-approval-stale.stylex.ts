import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "gap": tokens.space3,
        "alignItems": "flex-start",
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space4,
        "borderRadius": tokens.radiusMd,
        "backgroundColor": tokens.warningBg,
        "color": tokens.text,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal"
    }
});
