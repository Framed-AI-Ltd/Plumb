import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "flex",
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-stepper)": "none",
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group:is([data-hovered], [data-focus-within]) .plumb-stepper)": "flex"
        },
        "alignItems": "center",
        "gap": "2px",
        "paddingInline": "4px",
        "position": {
            "default": null,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group:is([data-hovered], [data-focus-within]) .plumb-stepper)": "absolute"
        },
        "insetInlineEnd": {
            "default": null,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group:is([data-hovered], [data-focus-within]) .plumb-stepper)": 0
        },
        "insetBlock": {
            "default": null,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group:is([data-hovered], [data-focus-within]) .plumb-stepper)": 0
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group:is([data-hovered], [data-focus-within]) .plumb-stepper)": tokens.bgContainer
        },
        "borderRadius": {
            "default": null,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group:is([data-hovered], [data-focus-within]) .plumb-stepper)": `0 ${tokens.radiusMd} ${tokens.radiusMd} 0`
        }
    }
});
