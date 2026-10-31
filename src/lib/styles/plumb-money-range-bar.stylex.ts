import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "blockSize": "6px",
        "borderRadius": tokens.radiusPill,
        "backgroundColor": tokens.fillSecondary,
        "overflow": "hidden"
    }
});
