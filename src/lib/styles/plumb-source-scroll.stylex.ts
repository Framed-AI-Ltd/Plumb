import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "overflow": "auto",
        "maxBlockSize": "70vh",
        "borderRadius": tokens.radiusMd,
        "cursor": {
            "default": null,
            ":is([data-zoomed])": "grab",
            ":is([data-zoomed]:active)": "grabbing"
        },
        "touchAction": {
            "default": null,
            ":is([data-zoomed])": "pan-x pan-y"
        },
        "outline": {
            "default": null,
            ":is(:focus-visible)": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "outlineOffset": {
            "default": null,
            ":is(:focus-visible)": "2px"
        }
    }
});
