import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "gridColumn": {
            "default": 2,
            "@media (max-width: 960px)": 1
        },
        "alignSelf": "start",
        "justifySelf": {
            "default": "end",
            "@media (max-width: 960px)": "start"
        },
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.textSecondary
    }
});
