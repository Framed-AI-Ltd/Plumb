import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "22px",
        "blockSize": "22px",
        "display": "grid",
        "placeItems": "center",
        "backgroundColor": "transparent",
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "padding": 0,
        "borderRadius": tokens.radiusSm,
        "color": tokens.textTertiary,
        "cursor": "pointer"
    }
});
