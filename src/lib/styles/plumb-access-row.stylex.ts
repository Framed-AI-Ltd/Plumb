import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "auto minmax(0, 1fr) 180px auto",
            "@media (max-width: 640px)": "auto minmax(0, 1fr)"
        },
        "alignItems": "center",
        "gap": tokens.space4,
        "paddingBlock": tokens.space3,
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
