import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "minmax(180px, 260px) minmax(0, 1fr) auto",
            "@media (max-width: 640px)": "minmax(0, 1fr) auto"
        },
        "gap": tokens.space4,
        "alignItems": "center",
        "paddingBlock": tokens.space3,
        "borderBlockStartWidth": {
            "default": "1px",
            ":is(:first-of-type)": 0
        },
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary
    }
});
