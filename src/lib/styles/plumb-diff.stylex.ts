import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gap": tokens.space2,
        "padding": tokens.space4,
        "backgroundColor": tokens.fillLayout,
        "borderRadius": tokens.radiusMd
    }
});
