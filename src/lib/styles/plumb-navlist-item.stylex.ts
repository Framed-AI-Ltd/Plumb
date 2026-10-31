import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space3,
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space4,
        "borderRadius": tokens.radiusMd,
        "cursor": "pointer",
        "outline": {
            "default": "none",
            ":is([data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "backgroundColor": {
            "default": null,
            ":is([data-hovered])": tokens.fillTertiary,
            ":is([data-selected])": tokens.accentBg
        },
        "boxShadow": {
            "default": null,
            ":is([data-selected])": `inset 3px 0 0 ${tokens.accentSolid}`
        },
        "outlineOffset": {
            "default": null,
            ":is([data-focus-visible])": "-2px"
        }
    }
});
