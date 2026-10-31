import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "insetBlock": 0,
        "insetInlineStart": "var(--pos)",
        "inlineSize": "2px",
        "backgroundColor": tokens.bgContainer,
        "boxShadow": tokens.mediaDividerShadow
    }
});
