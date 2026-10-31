import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "flex",
            "@media (max-width: 640px)": "grid"
        },
        "alignItems": "center",
        "gap": tokens.space4,
        "paddingBlock": tokens.space4,
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary,
        "gridTemplateColumns": {
            "default": null,
            "@media (max-width: 640px)": "auto minmax(0, 1fr) auto"
        },
        "columnGap": {
            "default": null,
            "@media (max-width: 640px)": tokens.space3
        },
        "rowGap": {
            "default": null,
            "@media (max-width: 640px)": tokens.space2
        }
    }
});
