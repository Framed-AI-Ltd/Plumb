import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "insetBlockEnd": `calc(${tokens.space2} + 22px)`,
        "insetInlineStart": tokens.space2,
        "display": "inline-flex",
        "alignItems": "center",
        "gap": "4px",
        "paddingBlock": "2px",
        "paddingInline": tokens.space3,
        "borderRadius": tokens.radiusPill,
        "backgroundColor": tokens.bgContainer,
        "color": tokens.accentText,
        "borderWidth": "1px",
        "borderStyle": "dashed",
        "borderColor": tokens.accentBorderHover,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal"
    }
});
