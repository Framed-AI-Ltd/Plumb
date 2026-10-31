import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": "1fr 1.2fr 1.2fr",
        "gap": tokens.space4,
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space4,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "borderBlockStartWidth": {
            "default": null,
            ":is(.plumb-change-row + .plumb-change-row)": "1px"
        },
        "borderBlockStartStyle": {
            "default": null,
            ":is(.plumb-change-row + .plumb-change-row)": "solid"
        },
        "borderBlockStartColor": {
            "default": null,
            ":is(.plumb-change-row + .plumb-change-row)": tokens.borderSecondary
        }
    }
});
