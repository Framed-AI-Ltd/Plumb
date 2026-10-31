import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": "26px"
        },
        "blockSize": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": "26px"
        },
        "display": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": "grid"
        },
        "placeItems": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": "center"
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": "transparent",
            ":is(.plumb-stepper .plumb-step[data-hovered])": tokens.accentBg,
            ":is(.plumb-stepper .plumb-step[data-pressed])": tokens.accentBgHover,
            ":is(.plumb-stepper .plumb-step[data-disabled])": "transparent"
        },
        "borderWidth": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": 0
        },
        "borderStyle": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": "none"
        },
        "borderColor": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": "currentColor"
        },
        "borderRadius": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": tokens.radiusSm
        },
        "color": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": tokens.textSecondary,
            ":is(.plumb-stepper .plumb-step[data-hovered])": tokens.accentText,
            ":is(.plumb-stepper .plumb-step[data-disabled])": tokens.textDisabled
        },
        "cursor": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": "pointer",
            ":is(.plumb-stepper .plumb-step[data-disabled])": "not-allowed"
        },
        "padding": {
            "default": null,
            ":is(.plumb-stepper .plumb-step)": 0
        }
    }
});
