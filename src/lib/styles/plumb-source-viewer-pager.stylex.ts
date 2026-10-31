import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "marginInlineStart": {
            "default": "auto",
            ":is(.plumb-source-viewer-tools + .plumb-source-viewer-pager)": tokens.space3
        },
        "display": "inline-flex",
        "alignItems": "center",
        "gap": tokens.space2,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.textSecondary
    }
});
