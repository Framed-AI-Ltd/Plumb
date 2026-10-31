import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "paddingInline": {
            "default": tokens.space4,
            ":is(.plumb-date-range .plumb-date-input)": tokens.space3
        },
        "flex": {
            "default": "1",
            ":is(.plumb-field > .plumb-date-input)": "none"
        },
        "flexGrow": {
            "default": null,
            ":is(.plumb-date-range .plumb-date-input)": 0
        },
        "flexShrink": {
            "default": null,
            ":is(.plumb-date-range .plumb-date-input)": 1
        },
        "flexBasis": {
            "default": null,
            ":is(.plumb-date-range .plumb-date-input)": "auto"
        },
        "minInlineSize": {
            "default": null,
            ":is(.plumb-date-range .plumb-date-input)": 0
        }
    }
});
