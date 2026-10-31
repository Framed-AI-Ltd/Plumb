import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "borderRadius": tokens.radiusMd,
        "overflow": "hidden",
        "backgroundColor": tokens.fillLayout
    }
});
