import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "minmax(0, 1fr) 10ch 14ch",
            "@media (max-width: 640px)": "minmax(0, 1fr) auto"
        },
        "gap": tokens.space5,
        "paddingBlock": tokens.space4,
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary,
        "alignItems": "start"
    }
});
