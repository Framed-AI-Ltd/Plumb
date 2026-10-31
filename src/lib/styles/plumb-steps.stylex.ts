import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space4,
        "listStyle": "none",
        "margin": 0,
        "padding": 0,
        "overflowX": {
            "default": null,
            "@media (max-width: 960px)": "auto"
        }
    }
});
