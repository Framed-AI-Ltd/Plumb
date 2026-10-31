import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-grid",
        "placeItems": "center",
        "flex": "none",
        "inlineSize": "30px",
        "blockSize": "30px",
        "borderRadius": "50%",
        "backgroundColor": {
            "default": "var(--c-bg-strong)",
            ":is(:not([data-color-explicit]))": tokens.fillSecondary
        },
        "color": {
            "default": "var(--c-text)",
            ":is(:not([data-color-explicit]))": tokens.textSecondary
        },
        "fontWeight": 600,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "boxShadow": `0 0 0 2px ${tokens.bgContainer}`,
        "marginInlineStart": {
            "default": null,
            ":is(.plumb-avatar-group .plumb-avatar + .plumb-avatar)": "-6px"
        }
    }
});
