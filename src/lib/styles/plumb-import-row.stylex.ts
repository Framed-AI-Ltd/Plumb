import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "minmax(0, 1fr) minmax(0, 1.4fr) minmax(200px, 1fr)",
            "@media (max-width: 640px)": "1fr"
        },
        "gap": tokens.space4,
        "alignItems": "center",
        "paddingBlock": tokens.space3,
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary
    }
});
