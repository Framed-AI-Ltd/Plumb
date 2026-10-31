import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "insetBlock": "-4px",
        "inlineSize": "2px",
        "backgroundColor": tokens.textSecondary,
        "borderRadius": "1px"
    }
});
