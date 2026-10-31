import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "minBlockSize": "100dvh",
        "display": "flex",
        "flexDirection": "column",
        "backgroundColor": tokens.bgLayout
    }
});
