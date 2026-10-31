import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space2,
        "padding": tokens.space4,
        "borderRadius": tokens.radiusMd,
        "backgroundColor": tokens.fillLayout
    }
});
