import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "gap": tokens.space7,
        "borderBlockEndWidth": "1px",
        "borderBlockEndStyle": "solid",
        "borderBlockEndColor": tokens.borderSecondary,
        "overflowX": "auto",
        "scrollSnapType": "x proximity",
        "scrollbarWidth": "none"
    }
});
