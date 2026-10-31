import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "margin": 0,
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space4,
        "borderInlineStartWidth": "3px",
        "borderInlineStartStyle": "solid",
        "borderInlineStartColor": tokens.border,
        "backgroundColor": tokens.fillLayout,
        "borderTopLeftRadius": 0,
        "borderTopRightRadius": tokens.radiusMd,
        "borderBottomRightRadius": tokens.radiusMd,
        "borderBottomLeftRadius": 0,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
    }
});
