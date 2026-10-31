import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "marginInlineStart": tokens.space4,
        "color": tokens.textTertiary,
        "inlineSize": "16px",
        "blockSize": "16px",
        "flex": "none"
    }
});
