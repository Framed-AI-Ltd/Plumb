import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-flex",
        "alignItems": "center",
        "gap": tokens.space2,
        "blockSize": {
            "default": "22px",
            ":is(.plumb-selection-body .plumb-badge)": "auto"
        },
        "paddingInline": tokens.space3,
        "borderRadius": tokens.radiusPill,
        "fontWeight": 500,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "whiteSpace": {
            "default": "nowrap",
            ":is(.plumb-selection-body .plumb-badge)": "normal",
            ":is(.plumb-file > [role=\"status\"] .plumb-badge)": {
                "default": null,
                "@media (max-width: 640px)": "normal"
            }
        },
        "borderWidth": {
            "default": "1px",
            "@media (forced-colors: active)": "1px"
        },
        "borderStyle": {
            default: "solid",
            "@media (forced-colors: active)": "solid",
            ":is([data-variant=\"dashed\"])": "dashed"
        },
        "borderColor": {
            default: "transparent",
            "@media (forced-colors: active)": "CanvasText",
            ":is([data-tone=\"neutral\"])": tokens.borderSecondary,
            ":is([data-tone=\"accent\"])": tokens.accentBorder,
            ":is([data-tone=\"info\"])": tokens.accentBorder,
            ":is([data-tone=\"danger\"])": tokens.errorBorder,
            ":is([data-tone=\"warning\"])": tokens.warningBorder,
            ":is([data-tone=\"success\"])": tokens.successBorder,
            ":is([data-variant=\"outline\"])": "currentColor",
            ":is([data-variant=\"solid\"])": "transparent",
            ":is([data-variant=\"dashed\"])": "currentColor"
        },
        "backgroundColor": {
            "default": null,
            ":is([data-tone=\"neutral\"])": tokens.fillTertiary,
            ":is([data-tone=\"accent\"])": tokens.accentBg,
            ":is([data-tone=\"info\"])": tokens.accentBg,
            ":is([data-tone=\"danger\"])": tokens.errorBg,
            ":is([data-tone=\"warning\"])": tokens.warningBg,
            ":is([data-tone=\"success\"])": tokens.successBg,
            ":is([data-variant=\"outline\"])": "transparent",
            ":is([data-variant=\"solid\"])": tokens.fillSecondary,
            ":is([data-variant=\"dashed\"])": "transparent"
        },
        "color": {
            "default": null,
            ":is([data-tone=\"neutral\"])": tokens.textSecondary,
            ":is([data-tone=\"accent\"])": tokens.accentText,
            ":is([data-tone=\"info\"])": tokens.accentText,
            ":is([data-tone=\"danger\"])": tokens.errorText,
            ":is([data-tone=\"warning\"])": tokens.warningText,
            ":is([data-tone=\"success\"])": tokens.successText,
            ":is([data-variant=\"solid\"])": tokens.text
        },
        "maxInlineSize": {
            "default": null,
            ":is(.plumb-selection-body .plumb-badge)": "100%"
        },
        "alignSelf": {
            "default": null,
            ":is(.plumb-review > .plumb-badge)": "flex-start",
            ":is(.plumb-voice-transcript > .plumb-badge)": "flex-start"
        },
        "minBlockSize": {
            "default": null,
            ":is(.plumb-selection-body .plumb-badge)": "22px"
        }
    }
});
