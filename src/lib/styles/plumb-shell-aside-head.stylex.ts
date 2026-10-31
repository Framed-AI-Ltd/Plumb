import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-between",
        "paddingBlock": tokens.space4,
        "paddingInline": tokens.space5,
        "borderBlockEndWidth": "1px",
        "borderBlockEndStyle": "solid",
        "borderBlockEndColor": tokens.borderSecondary
    }
});
