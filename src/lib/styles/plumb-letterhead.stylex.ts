import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space4,
        "paddingBlockEnd": tokens.space4,
        "marginBlockEnd": tokens.space2,
        "borderBlockEndWidth": "1px",
        "borderBlockEndStyle": "solid",
        "borderBlockEndColor": tokens.borderSecondary
    }
});
