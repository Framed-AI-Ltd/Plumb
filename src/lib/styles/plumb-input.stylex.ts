import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "outline": {
            "default": null,
            ":is([data-focused])": "none",
            ":is(.plumb-field-group .plumb-input)": "none"
        },
        "outlineOffset": {
            "default": null,
            ":is([data-focused])": "1px"
        },
        "blockSize": {
            "default": tokens.controlH,
            ":is(.plumb-field-group .plumb-input)": "100%"
        },
        "inlineSize": "100%",
        "color": {
            "default": tokens.text,
            "::placeholder": tokens.textTertiary,
            ":is([data-disabled])": tokens.textDisabled
        },
        "borderRadius": {
            "default": tokens.radiusMd,
            ":is([readonly])": 0,
            ":is(.plumb-field-group .plumb-input)": 0
        },
        "transition": `background ${tokens.durationFast} ${tokens.ease}, border-color ${tokens.durationFast} ${tokens.ease}, box-shadow ${tokens.durationFast} ${tokens.ease}`,
        "paddingInline": {
            "default": tokens.space4,
            ":is([readonly])": 0,
            ":is(.plumb-field-group .plumb-input)": tokens.space3
        },
        "backgroundColor": {
            "default": tokens.bgContainer,
            ":is([data-disabled])": tokens.fillTertiary,
            ":is([readonly])": "transparent",
            ":is(.plumb-field-group .plumb-input)": "transparent",
            ":is(.plumb-field-group .plumb-input[data-focused])": "transparent",
            ":is(.plumb-command-field .plumb-input)": "transparent"
        },
        "borderWidth": {
            "default": "1px",
            ":is(.plumb-field-group .plumb-input)": 0,
            ":is(.plumb-command-field .plumb-input)": 0
        },
        "borderStyle": {
            "default": "solid",
            ":is(.plumb-field-group .plumb-input)": "none",
            ":is(.plumb-command-field .plumb-input)": "none"
        },
        "borderColor": {
            "default": tokens.controlBorder,
            ":is(.plumb-field-group .plumb-input)": "currentColor",
            ":is(.plumb-command-field .plumb-input)": "currentColor",
            ":is([data-hovered])": tokens.accentSolid,
            ":is([data-focused])": tokens.accentSolid,
            ":is([data-invalid])": tokens.errorSolid,
            ":is([data-disabled])": "transparent",
            ":is([readonly])": "transparent"
        },
        "boxShadow": {
            "default": null,
            ":is([data-focused])": `0 0 0 3px ${tokens.focusHalo}`,
            ":is([data-invalid][data-focused])": `0 0 0 3px ${tokens.errorBg}`,
            ":is([readonly])": "none",
            ":is(.plumb-field-group .plumb-input)": "none",
            ":is(.plumb-field-group .plumb-input[data-focused])": "none",
            ":is(.plumb-command-field .plumb-input)": "none"
        },
        "borderBlockEndWidth": {
            "default": null,
            ":is([readonly])": "1px"
        },
        "borderBlockEndStyle": {
            "default": null,
            ":is([readonly])": "solid"
        },
        "borderBlockEndColor": {
            "default": null,
            ":is([readonly])": tokens.borderSecondary
        },
        "minInlineSize": {
            "default": null,
            ":is(.plumb-field-group .plumb-input)": 0
        },
        "flex": {
            "default": null,
            ":is(.plumb-field-group .plumb-input)": "1"
        },
        "paddingInlineStart": {
            "default": null,
            ":is(.plumb-field-group .plumb-input:first-child)": tokens.space4
        },
        "textAlign": {
            "default": null,
            ":is(.plumb-num)": "end"
        },
        "fontVariantNumeric": {
            "default": null,
            ":is(.plumb-num)": "tabular-nums",
            ":is(.plumb-otp .plumb-input)": "tabular-nums"
        },
        "paddingInlineEnd": {
            "default": null,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-group .plumb-input)": 0
        },
        "fontSize": {
            "default": null,
            ":is(.plumb-command-field .plumb-input)": "1rem",
            ":is(.plumb-otp .plumb-input)": "1.25rem"
        },
        "fontWeight": {
            "default": null,
            ":is(.plumb-otp .plumb-input)": 600
        },
        "lineHeight": {
            "default": null,
            ":is(.plumb-otp .plumb-input)": 1
        },
        "fontFamily": {
            "default": null,
            ":is(.plumb-otp .plumb-input)": tokens.fontBody
        },
        "fontStyle": {
            "default": null,
            ":is(.plumb-otp .plumb-input)": "normal"
        },
        "letterSpacing": {
            "default": null,
            ":is(.plumb-otp .plumb-input)": "0.5em"
        },
        "maxInlineSize": {
            "default": null,
            ":is(.plumb-otp .plumb-input)": "calc(var(--otp-length, 6) * 1.6em + 2rem)"
        }
    }
});
