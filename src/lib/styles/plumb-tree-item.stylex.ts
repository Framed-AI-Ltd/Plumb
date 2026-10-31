import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "outline": {
            "default": "none",
            ":is([data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "borderRadius": tokens.radiusMd,
        "cursor": "default",
        "outlineOffset": {
            "default": null,
            ":is([data-focus-visible])": "-2px"
        }
    }
});
