import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "inline-flex",
            ":is(.plumb-media-select .plumb-check-row)": "flex"
        },
        "alignItems": "flex-start",
        "gap": tokens.space3,
        "cursor": {
            "default": "pointer",
            ":is([data-disabled])": "not-allowed"
        },
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": {
            "default": null,
            ":is([data-disabled])": tokens.textDisabled
        },
        "padding": {
            "default": null,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-check-row)": tokens.space5
        },
        "borderRadius": {
            "default": null,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-check-row)": tokens.radiusLg
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-check-row)": tokens.bgContainer,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-check-row[data-selected])": tokens.accentBg
        },
        "borderWidth": {
            "default": null,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-check-row)": "1px"
        },
        "borderStyle": {
            "default": null,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-check-row)": "solid"
        },
        "borderColor": {
            "default": null,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-check-row)": tokens.border,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-check-row[data-hovered])": tokens.controlBorder,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-check-row[data-selected])": tokens.accentSolid
        },
        "transition": {
            "default": null,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-check-row)": `border-color ${tokens.durationFast} ${tokens.ease}, background ${tokens.durationFast} ${tokens.ease}`
        },
        "boxShadow": {
            "default": null,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-check-row[data-selected])": `0 0 0 1px ${tokens.accentSolid}`
        }
    }
});
