import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))",
            ":is(.plumb-budget[data-committed] .plumb-budget-row)": "minmax(0, 1.4fr) repeat(4, minmax(0, 1fr))"
        },
        "gap": tokens.space4,
        "alignItems": "center",
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space2,
        "borderBlockStartWidth": {
            default: "1px",
            ":is(.plumb-change-header)": 0
        },
        "borderBlockStartStyle": {
            default: "solid",
            ":is(.plumb-change-header)": "none"
        },
        "borderBlockStartColor": {
            default: tokens.borderSecondary,
            ":is(.plumb-change-header)": "currentColor"
        },
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "minInlineSize": {
            "default": null,
            "@media (max-width: 640px)": "520px"
        }
    }
});
