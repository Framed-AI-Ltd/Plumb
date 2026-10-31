import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "24px",
        "blockSize": "24px",
        "borderRadius": "50%",
        "display": "grid",
        "placeItems": "center",
        "backgroundColor": tokens.fillSecondary,
        "fontWeight": 600,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.textSecondary
    }
});
