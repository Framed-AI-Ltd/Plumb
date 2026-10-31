import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "minmax(280px, 360px) minmax(0, 1fr)",
            "@media (max-width: 960px)": "minmax(0, 1fr)"
        },
        "gap": tokens.space6,
        "alignItems": "start"
    }
});
