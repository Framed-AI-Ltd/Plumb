import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space4,
        "blockSize": "38px",
        "paddingInline": tokens.space4,
        "borderRadius": tokens.radiusMd,
        "color": {
            "default": tokens.text,
            ":is([data-current])": tokens.accentText,
            ":is([data-plumb-theme=\"dark\"] .plumb-navlink[data-current])": tokens.accentText
        },
        "textDecoration": "none",
        "fontWeight": {
            default: 400,
            ":is([data-current])": 550
        },
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "cursor": "pointer",
        "transition": `background ${tokens.durationFast} ${tokens.ease}`,
        "backgroundColor": {
            "default": null,
            ":is([data-hovered])": tokens.fillTertiary,
            ":is([data-current])": tokens.accentBg,
            ":is([data-plumb-theme=\"dark\"] .plumb-navlink[data-current])": tokens.brand2
        },
        "borderWidth": {
            "default": null,
            ":is([data-current])": {
                "default": null,
                "@media (forced-colors: active)": "1px"
            }
        },
        "borderStyle": {
            "default": null,
            ":is([data-current])": {
                "default": null,
                "@media (forced-colors: active)": "solid"
            }
        },
        "borderColor": {
            "default": null,
            ":is([data-current])": {
                "default": null,
                "@media (forced-colors: active)": "CanvasText"
            }
        }
    }
});
