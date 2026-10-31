import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "32px",
        "blockSize": "32px",
        "borderRadius": tokens.radiusMd,
        "display": "grid",
        "placeItems": "center",
        "backgroundColor": tokens.fillTertiary,
        "color": tokens.textSecondary,
        "flex": "none"
    }
});
