import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "gridColumnEnd": -1,
        "gridColumnStart": 1,
        "blockSize": "6px",
        "borderRadius": tokens.radiusPill,
        "backgroundColor": tokens.fillSecondary,
        "overflow": "hidden"
    }
});
