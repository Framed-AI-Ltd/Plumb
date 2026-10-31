import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space4,
        "paddingBlock": tokens.space4,
        "borderBlockStartWidth": {
            default: "1px",
            ":is(:first-child)": 0
        },
        "borderBlockStartStyle": {
            default: "solid",
            ":is(:first-child)": "none"
        },
        "borderBlockStartColor": {
            default: tokens.borderSecondary,
            ":is(:first-child)": "currentColor"
        }
    }
});
