import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "blockSize": "1px",
        "backgroundColor": tokens.borderSecondary,
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "marginBlock": tokens.space2,
        "marginInline": tokens.space3
    }
});
