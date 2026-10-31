import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space3,
        "padding": tokens.space5,
        "borderRadius": tokens.radiusMd,
        "backgroundColor": tokens.errorBg,
        "borderWidth": "1px",
        "borderStyle": "solid",
        "borderColor": tokens.errorBorder,
        "outline": {
            "default": "none",
            ":is(:focus-visible)": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "outlineOffset": {
            "default": null,
            ":is(:focus-visible)": "2px"
        }
    }
});
