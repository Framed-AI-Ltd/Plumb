import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-grid",
        "placeItems": "center",
        "padding": "2px",
        "borderRadius": tokens.radiusXs,
        "cursor": "pointer"
    }
});
