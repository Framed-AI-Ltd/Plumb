import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "30px",
        "blockSize": "30px",
        "borderRadius": "50%",
        "display": "grid",
        "placeItems": "center",
        "backgroundColor": tokens.accentBg,
        "color": tokens.accentText,
        "flex": "none"
    }
});
