import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "backgroundColor": "transparent",
        "color": {
            "default": tokens.textTertiary,
            ":is([data-hovered])": tokens.text
        },
        "inlineSize": "30px",
        "alignSelf": "stretch",
        "cursor": "pointer",
        "display": {
            "default": "grid",
            ":is(.plumb-searchfield[data-empty] .plumb-clear)": "none"
        },
        "placeItems": "center",
        "flex": {
            "default": null,
            ":is(.plumb-date-range .plumb-clear)": "none"
        },
        "marginInlineStart": {
            "default": null,
            ":is(.plumb-date-range .plumb-clear)": "auto"
        }
    }
});
