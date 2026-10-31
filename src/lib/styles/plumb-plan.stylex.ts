import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "minmax(0, 1fr) minmax(220px, 300px)",
            "@media (max-width: 960px)": "1fr"
        },
        "gap": tokens.space5,
        "alignItems": "start"
    }
});
