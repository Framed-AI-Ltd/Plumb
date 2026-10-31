import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "flex-start",
        "gap": tokens.space3,
        "paddingBlock": tokens.space3,
        "borderBlockStartWidth": {
            "default": "1px",
            ":is(:first-child)": 0
        },
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary
    }
});
