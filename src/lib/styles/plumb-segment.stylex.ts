import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-flex",
        "alignItems": "center",
        "gap": tokens.space2,
        "blockSize": {
            "default": `calc(${tokens.controlH} - 4px)`,
            ":is(.plumb-segmented[data-size=\"sm\"] .plumb-segment)": `calc(${tokens.controlHSm} - 4px)`
        },
        "paddingInline": {
            "default": tokens.space4,
            ":is(.plumb-segmented[data-size=\"sm\"] .plumb-segment)": tokens.space3
        },
        "borderWidth": {
            "default": 0,
            ":is([data-selected])": {
                "default": null,
                "@media (forced-colors: active)": "1px"
            }
        },
        "borderStyle": {
            "default": "none",
            ":is([data-selected])": {
                "default": null,
                "@media (forced-colors: active)": "solid"
            }
        },
        "borderColor": {
            "default": "currentColor",
            ":is([data-selected])": {
                "default": null,
                "@media (forced-colors: active)": "CanvasText"
            }
        },
        "borderRadius": tokens.radiusSm,
        "backgroundColor": {
            "default": "transparent",
            ":is([data-selected])": tokens.bgContainer,
            ":is([data-plumb-theme=\"dark\"] .plumb-segment[data-selected])": tokens.bgElevated
        },
        "color": {
            "default": tokens.textSecondary,
            ":is([data-hovered])": tokens.text,
            ":is([data-selected])": tokens.text
        },
        "fontWeight": 500,
        "fontSize": "0.8125rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "cursor": "pointer",
        "transition": `background ${tokens.durationFast} ${tokens.ease}, color ${tokens.durationFast} ${tokens.ease}`,
        "boxShadow": {
            "default": null,
            ":is([data-selected])": tokens.shadow1
        }
    }
});
