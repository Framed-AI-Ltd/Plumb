import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "minmax(0, 1.2fr) 1fr 1fr",
            "@media (max-width: 640px)": "1fr"
        },
        "gap": tokens.space4,
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space4,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "alignItems": "center",
        "borderBlockStartWidth": {
            "default": null,
            ":is(.plumb-diff-row + .plumb-diff-row)": "1px"
        },
        "borderBlockStartStyle": {
            "default": null,
            ":is(.plumb-diff-row + .plumb-diff-row)": "solid"
        },
        "borderBlockStartColor": {
            "default": null,
            ":is(.plumb-diff-row + .plumb-diff-row)": tokens.borderSecondary
        }
    }
});
