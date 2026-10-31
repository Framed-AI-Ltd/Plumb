import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "paddingInline": tokens.space3,
        "paddingInlineStart": {
            "default": null,
            ":is(:first-child)": tokens.space4,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-affix)": "0.3em"
        },
        "paddingInlineEnd": {
            "default": null,
            ":is(:first-child)": "0",
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-affix)": "0"
        },
        "color": tokens.textSecondary,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "whiteSpace": "nowrap",
        "inlineSize": {
            "default": null,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-affix)": "3.2ch"
        },
        "boxSizing": {
            "default": null,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-affix)": "content-box"
        },
        "textAlign": {
            "default": null,
            ":is(.plumb-field[data-variant=\"inline\"] .plumb-field-affix)": "start"
        }
    }
});
