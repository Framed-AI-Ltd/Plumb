import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": {
            "default": "relative",
            "::after": "absolute"
        },
        "display": "inline-flex",
        "alignItems": "center",
        "gap": tokens.space3,
        "paddingBlock": tokens.space4,
        "fontWeight": {
            default: 400,
            ":is([data-selected])": 550
        },
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": {
            "default": tokens.textSecondary,
            ":is([data-hovered])": tokens.accentText,
            ":is([data-selected])": tokens.accentText
        },
        "cursor": "pointer",
        "outline": {
            "default": "none",
            ":is([data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "content": {
            "default": null,
            "::after": "\"\""
        },
        "insetInline": {
            "default": null,
            "::after": 0
        },
        "insetBlockEnd": {
            "default": null,
            "::after": "-1px"
        },
        "blockSize": {
            "default": null,
            "::after": "2px"
        },
        "backgroundColor": {
            "default": null,
            "::after": tokens.accentSolid,
            ":is(.plumb-tab[data-selected])::after": {
                "default": null,
                "@media (forced-colors: active)": "Highlight"
            }
        },
        "transform": {
            "default": null,
            "::after": "scaleX(0)",
            ":is(.plumb-tab[data-selected])::after": "scaleX(1)"
        },
        "transition": {
            "default": null,
            "::after": `transform ${tokens.durationBase} ${tokens.ease}`
        },
        "outlineOffset": {
            "default": null,
            ":is([data-focus-visible])": "2px"
        },
        "borderRadius": {
            "default": null,
            ":is([data-focus-visible])": "2px"
        },
        "scrollSnapAlign": "start",
        "flex": "none"
    }
});
