import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "insetBlockStart": "50%",
        "blockSize": "4px",
        "translate": "0 -50%",
        "borderRadius": tokens.radiusPill,
        "backgroundColor": {
            "default": tokens.accentSolid,
            "@media (forced-colors: active)": "Highlight"
        },
        "forcedColorAdjust": {
            "default": null,
            "@media (forced-colors: active)": "none"
        }
    }
});
