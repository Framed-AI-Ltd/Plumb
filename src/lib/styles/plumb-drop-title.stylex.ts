import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontWeight": 600,
        "fontSize": "1rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontHeading,
        "fontStyle": "normal",
        "color": tokens.text
    }
});
