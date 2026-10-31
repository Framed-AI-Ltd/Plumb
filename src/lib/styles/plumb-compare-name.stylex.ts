import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space3,
        "blockSize": "24px",
        "fontWeight": 600,
        "fontSize": "1rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontHeading,
        "fontStyle": "normal",
        "color": tokens.text
    }
});
