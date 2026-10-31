import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "none",
            "@media (max-width: 640px)": "inline-flex"
        },
        "alignItems": "center",
        "gap": tokens.space2,
        "textDecoration": "none",
        "maxInlineSize": "45vw",
        "whiteSpace": "nowrap",
        "overflow": "hidden",
        "textOverflow": "ellipsis",
        "minInlineSize": {
            "default": null,
            ":is(.plumb-shell-topbar > .plumb-back-link)": 0
        },
        "flex": {
            "default": null,
            ":is(.plumb-shell-topbar > .plumb-back-link)": "1"
        }
    }
});
