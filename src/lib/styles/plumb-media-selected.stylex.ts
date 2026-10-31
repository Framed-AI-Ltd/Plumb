import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "insetBlockStart": tokens.space2,
        "insetInlineEnd": tokens.space2,
        "inlineSize": "22px",
        "blockSize": "22px",
        "borderRadius": "50%",
        "display": "grid",
        "placeItems": "center",
        "backgroundColor": {
            "default": tokens.accentSolid,
            "@media (forced-colors: active)": "Highlight"
        },
        "color": tokens.onAccent,
        "forcedColorAdjust": {
            "default": null,
            "@media (forced-colors: active)": "none"
        }
    }
});
