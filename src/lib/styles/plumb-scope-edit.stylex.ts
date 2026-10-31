import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "flex": "1",
        "display": "grid",
        "gridTemplateColumns": {
            "default": "minmax(0, 1fr) 180px",
            "@media (max-width: 640px)": "1fr"
        },
        "gap": tokens.space3,
        "alignItems": "start"
    }
});
