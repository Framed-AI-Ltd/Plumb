import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "outline": {
            "default": "none",
            ":is(:focus-visible)": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "borderRadius": tokens.radiusPill,
        "outlineOffset": {
            "default": null,
            ":is(:focus-visible)": "2px"
        }
    }
});
