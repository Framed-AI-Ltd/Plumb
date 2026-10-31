import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": "auto 1fr auto",
        "gap": tokens.space4,
        "alignItems": "start",
        "paddingBlock": tokens.space4,
        "borderBlockStartWidth": {
            "default": "1px",
            ":is(:first-child)": 0
        },
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary,
        "paddingBlockStart": {
            "default": null,
            ":is(:first-child)": 0
        }
    }
});
