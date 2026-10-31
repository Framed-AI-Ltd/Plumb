import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-between",
        "gap": {
            "default": tokens.space5,
            "@media (max-width: 960px)": tokens.space3
        },
        "blockSize": "60px",
        "paddingInline": {
            "default": tokens.space8,
            "@media (max-width: 960px)": tokens.space5
        }
    }
});
