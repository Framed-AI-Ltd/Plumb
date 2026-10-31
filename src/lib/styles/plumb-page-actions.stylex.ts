import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space3,
        "justifySelf": {
            "default": "end",
            "@media (max-width: 960px)": "start"
        },
        "gridColumn": {
            "default": null,
            "@media (max-width: 960px)": 1
        }
    }
});
