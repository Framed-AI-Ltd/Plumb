import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "28px",
        "blockSize": "28px",
        "borderRadius": "50%",
        "display": "grid",
        "placeItems": "center",
        "backgroundColor": tokens.fillTertiary,
        "color": tokens.textSecondary,
        "flex": "none"
    }
});
