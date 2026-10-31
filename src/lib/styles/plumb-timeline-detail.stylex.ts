import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "marginBlockStart": tokens.space3,
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space4,
        "borderRadius": tokens.radiusMd,
        "backgroundColor": tokens.fillLayout,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.text
    }
});
