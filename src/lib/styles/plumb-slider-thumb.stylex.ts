import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "insetBlockStart": "50%",
        "inlineSize": "18px",
        "blockSize": "18px",
        "borderRadius": "50%",
        "backgroundColor": tokens.bgContainer,
        "borderWidth": "2px",
        "borderStyle": "solid",
        "borderColor": tokens.accentSolid,
        "boxShadow": tokens.controlShadow,
        "transition": `scale ${tokens.durationFast} ${tokens.ease}`,
        "scale": {
            "default": null,
            ":is([data-dragging])": 1.12
        },
        "outline": {
            "default": null,
            ":is([data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "outlineOffset": {
            "default": null,
            ":is([data-focus-visible])": "2px"
        }
    }
});
