import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": "minmax(0, 1.4fr) minmax(0, 0.8fr) minmax(90px, 0.8fr) minmax(120px, 1fr) minmax(0, 1fr)",
        "gap": tokens.space3,
        "alignItems": "center",
        "padding": tokens.space2,
        "borderBlockStartWidth": {
            "default": "1px",
            ":is(.plumb-change-header)": 0
        },
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "minInlineSize": {
            "default": null,
            "@media (max-width: 640px)": "560px"
        }
    }
});
