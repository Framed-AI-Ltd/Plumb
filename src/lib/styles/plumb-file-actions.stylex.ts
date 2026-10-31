import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "flex",
            ":is(:empty)": "none"
        },
        "flex": "none",
        "alignItems": "center",
        "gap": tokens.space2,
        "gridColumn": {
            "default": null,
            "@media (max-width: 640px)": 3
        },
        "gridRow": {
            "default": null,
            "@media (max-width: 640px)": "1 / 3"
        }
    }
});
