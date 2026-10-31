import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "flex",
            "@media (max-width: 640px)": "grid"
        },
        "flexDirection": "column",
        "alignItems": "center",
        "gap": tokens.space3,
        "paddingTop": tokens.space8,
        "paddingRight": tokens.space6,
        "paddingBottom": tokens.space8,
        "paddingLeft": tokens.space6,
        "padding": {
            "default": null,
            "@media (max-width: 640px)": tokens.space5
        },
        "borderRadius": tokens.radiusLg,
        "borderWidth": "1.5px",
        "borderStyle": "dashed",
        "borderColor": {
            default: tokens.controlBorder,
            ":is([data-drop-target])": tokens.accentSolid
        },
        "backgroundColor": {
            "default": tokens.fieldBg,
            ":is([data-drop-target])": tokens.accentBg
        },
        "textAlign": {
            "default": "center",
            "@media (max-width: 640px)": "start"
        },
        "outline": {
            "default": "none",
            ":is([data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "transition": `background ${tokens.durationFast} ${tokens.ease}, border-color ${tokens.durationFast} ${tokens.ease}`,
        "outlineOffset": {
            "default": null,
            ":is([data-focus-visible])": "2px"
        },
        "gridTemplateColumns": {
            "default": null,
            "@media (max-width: 640px)": "auto minmax(0, 1fr)"
        },
        "columnGap": {
            "default": null,
            "@media (max-width: 640px)": tokens.space4
        },
        "rowGap": {
            "default": null,
            "@media (max-width: 640px)": tokens.space2
        }
    }
});
