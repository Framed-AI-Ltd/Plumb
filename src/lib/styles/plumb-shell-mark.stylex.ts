import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "28px",
        "blockSize": "28px",
        "borderRadius": tokens.radiusMd,
        "backgroundColor": tokens.accentSolid,
        "color": tokens.onAccent,
        "display": "grid",
        "placeItems": "center"
    }
});
