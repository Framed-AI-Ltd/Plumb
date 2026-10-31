import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "flex-start",
        "gap": tokens.space2,
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space2,
        "borderBlockStartWidth": {
            "default": "1px",
            ":is(:first-child)": 0
        },
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary,
        "borderRadius": tokens.radiusSm,
        "transition": `background ${tokens.durationFast} ${tokens.ease}, opacity ${tokens.durationFast} ${tokens.ease}`,
        "outline": {
            "default": null,
            ":is([data-draft])": `1px dashed ${tokens.accentBorderHover}`
        },
        "outlineOffset": {
            "default": null,
            ":is([data-draft])": "-1px"
        },
        "backgroundColor": {
            "default": null,
            ":is([data-draft])": `color-mix(in srgb, ${tokens.accentBg} 35%, transparent)`,
            ":is([draggable=\"true\"]:hover)": tokens.fillTertiary
        },
        "opacity": {
            "default": null,
            ":is([data-dragging])": 0.5
        },
        "outlineColor": {
            "default": null,
            ":is([data-draft])": {
                "default": null,
                "@media (forced-colors: active)": "CanvasText"
            }
        }
    }
});
