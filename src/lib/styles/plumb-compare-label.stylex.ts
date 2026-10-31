import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "paddingBlock": tokens.space4,
        "paddingInline": tokens.space5,
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.textSecondary,
        "display": {
            "default": "flex",
            ":is(.plumb-compare .plumb-compare-label)": {
                "default": null,
                "@media (max-width: 640px)": "none"
            }
        },
        "flexDirection": "column",
        "gap": "2px"
    }
});
