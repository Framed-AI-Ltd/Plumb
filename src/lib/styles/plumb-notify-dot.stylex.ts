import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "8px",
        "blockSize": "8px",
        "borderRadius": "50%",
        "backgroundColor": {
            "default": tokens.accentSolid,
            "@media (forced-colors: active)": "Highlight"
        },
        "marginBlockStart": "6px",
        "flex": "none",
        "forcedColorAdjust": {
            "default": null,
            "@media (forced-colors: active)": "none"
        }
    }
});
