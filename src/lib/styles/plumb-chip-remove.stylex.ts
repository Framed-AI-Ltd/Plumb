import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
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
            ":is([data-hovered])": tokens.fillSecondary
        },
        "color": {
            "default": tokens.textSecondary,
            ":is([data-hovered])": tokens.text
        },
        "cursor": "pointer",
        "outline": {
            "default": null,
            ":is([data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        }
    }
});
