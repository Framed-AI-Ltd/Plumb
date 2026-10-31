import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "96px minmax(120px, 1fr) minmax(160px, 1.4fr)",
            "@media (max-width: 640px)": "1fr 1fr"
        },
        "gap": tokens.space3,
        "alignItems": "end"
    }
});
