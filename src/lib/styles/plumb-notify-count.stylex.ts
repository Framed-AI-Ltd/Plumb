import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "insetBlockStart": "-6px",
        "insetInlineEnd": "-8px",
        "minInlineSize": "16px",
        "blockSize": "16px",
        "paddingInline": "4px",
        "borderRadius": tokens.radiusPill,
        "backgroundColor": tokens.errorSolid,
        "color": tokens.onAccent,
        "fontFamily": tokens.fontBody,
        "fontWeight": 600,
        "fontSize": "0.625rem",
        "lineHeight": "16px",
        "textAlign": "center"
    }
});
