import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": {
            "default": null,
            ":is(.plumb-media-item img)": "100%",
            ":is(.plumb-source-page img)": "100%",
            ":is(.plumb-selection-media img)": "100%",
            ":is(.plumb-provider-photos img)": "100%",
            ":is(.plumb-compare-stage img)": "100%",
            ":is(.plumb-takeoff-stage img)": "100%"
        },
        "aspectRatio": {
            "default": null,
            ":is(.plumb-media-item img)": "4 / 3",
            ":is(.plumb-selection-media img)": 1,
            ":is(.plumb-provider-photos img)": "4 / 3",
            ":is(.plumb-compare-stage img)": "4 / 3"
        },
        "objectFit": {
            "default": null,
            ":is(.plumb-media-item img)": "cover",
            ":is(.plumb-selection-media img)": "cover",
            ":is(.plumb-provider-photos img)": "cover",
            ":is(.plumb-compare-stage img)": "cover"
        },
        "borderRadius": {
            "default": null,
            ":is(.plumb-media-item img)": tokens.radiusMd,
            ":is(.plumb-selection-media img)": tokens.radiusMd,
            ":is(.plumb-provider-photos img)": tokens.radiusSm
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-media-item img)": tokens.fillSecondary
        },
        "outline": {
            "default": null,
            ":is(.plumb-media-item[data-focus-visible] img)": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "outlineOffset": {
            "default": null,
            ":is(.plumb-media-item[data-focus-visible] img)": "2px"
        },
        "boxShadow": {
            "default": null,
            ":is(.plumb-media-item[data-selected] img)": `0 0 0 3px ${tokens.accentSolid}`
        },
        "display": {
            "default": null,
            ":is(.plumb-source-page img)": "block",
            ":is(.plumb-compare-stage img)": "block"
        },
        "userSelect": {
            "default": null,
            ":is(.plumb-source-page img)": "none",
            ":is(.plumb-takeoff-stage img)": "none"
        },
        "blockSize": {
            "default": null,
            ":is(.plumb-selection-media img)": "auto",
            ":is(.plumb-takeoff-stage img)": "100%"
        },
        "position": {
            "default": null,
            ":is(.plumb-takeoff-stage img)": "absolute"
        },
        "inset": {
            "default": null,
            ":is(.plumb-takeoff-stage img)": 0
        }
    }
});
