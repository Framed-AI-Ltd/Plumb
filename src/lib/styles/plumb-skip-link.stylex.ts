import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "insetInlineStart": tokens.space4,
        "insetBlockStart": tokens.space4,
        "zIndex": 300,
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space5,
        "borderRadius": tokens.radiusMd,
        "backgroundColor": tokens.accentSolid,
        "color": tokens.onAccent,
        "fontWeight": 500,
        "fontSize": "0.8125rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "transform": {
            "default": "translateY(-200%)",
            ":is(:focus)": "none"
        },
        "outline": {
            "default": null,
            ":is(:focus)": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "outlineOffset": {
            "default": null,
            ":is(:focus)": "2px"
        }
    }
});
