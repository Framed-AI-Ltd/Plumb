import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-grid",
        "placeItems": "center",
        "inlineSize": "20px",
        "blockSize": "20px",
        "padding": 0,
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "borderRadius": "50%",
        "backgroundColor": {
            "default": "transparent",
            ":is([data-hovered])": tokens.fillTertiary
        },
        "color": {
            "default": tokens.textTertiary,
            ":is([data-hovered])": tokens.accentText
        },
        "cursor": "pointer",
        "verticalAlign": "middle"
    }
});
