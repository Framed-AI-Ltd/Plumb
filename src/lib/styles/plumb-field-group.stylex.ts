import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "outline": {
            "default": null,
            ":is([data-focus-within])": "none"
        },
        "outlineOffset": {
            "default": null,
            ":is([data-focus-within])": "1px"
        },
        "blockSize": tokens.controlH,
        "inlineSize": "100%",
        "color": {
            "default": tokens.text,
            ":is([data-disabled])": tokens.textDisabled
        },
        "borderRadius": tokens.radiusMd,
        "transition": `background ${tokens.durationFast} ${tokens.ease}, border-color ${tokens.durationFast} ${tokens.ease}, box-shadow ${tokens.durationFast} ${tokens.ease}`,
        "backgroundColor": {
            "default": tokens.bgContainer,
            ":is([data-disabled])": tokens.fillTertiary,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group)": "transparent",
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group:is([data-hovered], [data-focus-within]))": tokens.bgContainer
        },
        "borderWidth": "1px",
        "borderStyle": "solid",
        "borderColor": {
            "default": tokens.controlBorder,
            ":is([data-hovered])": tokens.accentSolid,
            ":is([data-focus-within])": tokens.accentSolid,
            ":is([data-invalid])": tokens.errorSolid,
            ":is([data-disabled])": "transparent",
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group)": "transparent",
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group:is([data-hovered], [data-focus-within]))": tokens.fieldBorder,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group[data-focus-within])": tokens.accentSolid,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group:has(input:placeholder-shown))": tokens.fieldBorder
        },
        "boxShadow": {
            "default": null,
            ":is([data-focus-within])": `0 0 0 3px ${tokens.focusHalo}`,
            ":is([data-invalid][data-focus-within])": `0 0 0 3px ${tokens.errorBg}`
        },
        "display": "flex",
        "alignItems": "center",
        "overflow": "hidden",
        "position": {
            "default": null,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group)": "relative"
        },
        "paddingInlineEnd": {
            "default": null,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group)": 0
        }
    }
});
