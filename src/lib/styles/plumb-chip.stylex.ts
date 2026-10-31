import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-flex",
        "alignItems": "center",
        "gap": tokens.space3,
        "blockSize": "30px",
        "paddingInline": tokens.space4,
        "borderRadius": tokens.radiusPill,
        "backgroundColor": {
            "default": tokens.bgContainer,
            ":is([data-selected])": tokens.accentBg
        },
        "borderWidth": "1px",
        "borderStyle": "solid",
        "borderColor": {
            default: tokens.border,
            ":is([data-hovered])": tokens.controlBorder,
            ":is([data-selected])": tokens.accentSolid
        },
        "fontWeight": 500,
        "fontSize": "0.8125rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": {
            "default": tokens.text,
            ":is([data-selected])": tokens.accentText
        },
        "cursor": "pointer",
        "outline": {
            "default": "none",
            ":is([data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "transition": `background ${tokens.durationFast} ${tokens.ease}, border-color ${tokens.durationFast} ${tokens.ease}`,
        "outlineOffset": {
            "default": null,
            ":is([data-focus-visible])": "2px"
        }
    }
});
