import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": "min(96px, 25%) minmax(0, 1fr)",
        "gap": tokens.space4,
        "padding": tokens.space4,
        "borderRadius": tokens.radiusLg,
        "backgroundColor": tokens.bgContainer,
        "boxShadow": tokens.shadow1
    }
});
