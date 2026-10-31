import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "gridColumnEnd": -1,
        "gridColumnStart": 1,
        "display": "flex",
        "gap": tokens.space3,
        "alignItems": "flex-start",
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space4,
        "marginBlockEnd": tokens.space3,
        "borderRadius": tokens.radiusMd,
        "backgroundColor": tokens.errorBg,
        "color": tokens.text,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal"
    }
});
