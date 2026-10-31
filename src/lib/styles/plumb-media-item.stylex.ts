import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space2,
        "borderRadius": tokens.radiusMd,
        "outline": "none",
        "cursor": "pointer",
        "position": "relative"
    }
});
