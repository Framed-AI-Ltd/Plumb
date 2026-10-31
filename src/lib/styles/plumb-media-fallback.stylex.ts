import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "flex",
            ":is(.plumb-compare-stage .plumb-media-fallback)": "block"
        },
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
        "gap": tokens.space2,
        "inlineSize": {
            "default": "100%",
            ":is(.plumb-selection-media .plumb-media-fallback)": "100%",
            ":is(.plumb-provider-photos .plumb-media-fallback)": "100%",
            ":is(.plumb-compare-stage .plumb-media-fallback)": "100%"
        },
        "aspectRatio": {
            "default": "4 / 3",
            ":is(.plumb-selection-media .plumb-media-fallback)": 1,
            ":is(.plumb-provider-photos .plumb-media-fallback)": "4 / 3",
            ":is(.plumb-compare-stage .plumb-media-fallback)": "4 / 3"
        },
        "padding": tokens.space3,
        "borderRadius": {
            "default": tokens.radiusMd,
            ":is(.plumb-selection-media .plumb-media-fallback)": tokens.radiusMd,
            ":is(.plumb-provider-photos .plumb-media-fallback)": tokens.radiusSm
        },
        "backgroundColor": tokens.fillSecondary,
        "color": tokens.textSecondary,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "textAlign": "center",
        "overflow": "hidden",
        "blockSize": {
            "default": null,
            ":is(.plumb-selection-media .plumb-media-fallback)": "auto"
        },
        "objectFit": {
            "default": null,
            ":is(.plumb-selection-media .plumb-media-fallback)": "cover",
            ":is(.plumb-provider-photos .plumb-media-fallback)": "cover",
            ":is(.plumb-compare-stage .plumb-media-fallback)": "cover"
        }
    }
});
