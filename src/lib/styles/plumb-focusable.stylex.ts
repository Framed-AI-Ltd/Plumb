import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "outline": {
            "default": null,
            ":is([data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "outlineOffset": {
            "default": null,
            ":is([data-focus-visible])": "1px"
        }
    }
});
