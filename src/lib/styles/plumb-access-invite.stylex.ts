import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "minmax(0, 2fr) minmax(0, 1fr) auto",
            "@media (max-width: 640px)": "1fr"
        },
        "gap": tokens.space3,
        "alignItems": "end"
    }
});
