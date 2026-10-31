import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "insetBlock": "3px",
        "borderRadius": tokens.radiusXs,
        "backgroundColor": {
            "default": tokens.accentSolid,
            ":is([data-status=\"planned\"])": tokens.accentBg,
            ":is([data-status=\"done\"])": tokens.successSolid,
            ":is([data-status=\"at-risk\"])": tokens.warningSolid,
            "@media (forced-colors: active)": "Highlight"
        },
        "outline": {
            "default": null,
            ":is([data-status=\"planned\"])": `1px dashed ${tokens.accentBorderHover}`
        },
        "outlineOffset": {
            "default": null,
            ":is([data-status=\"planned\"])": "-1px"
        },
        "forcedColorAdjust": {
            "default": null,
            "@media (forced-colors: active)": "none"
        },
        "outlineColor": {
            "default": null,
            ":is([data-status=\"planned\"])": {
                "default": null,
                "@media (forced-colors: active)": "CanvasText"
            }
        }
    }
});
