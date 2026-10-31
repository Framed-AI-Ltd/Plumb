import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space2,
        "padding": tokens.space3,
        "borderBlockEndWidth": "1px",
        "borderBlockEndStyle": "solid",
        "borderBlockEndColor": tokens.borderSecondary
    }
});
