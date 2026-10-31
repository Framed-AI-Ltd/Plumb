import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-flex",
        "alignItems": "center",
        "gap": tokens.space3,
        "blockSize": tokens.controlH,
        "paddingInline": tokens.space4,
        "borderRadius": tokens.radiusMd,
        "borderWidth": "1px",
        "borderStyle": "solid",
        "borderColor": tokens.fieldBorder,
        "backgroundColor": tokens.bgContainer,
        "color": tokens.textTertiary,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "cursor": "pointer",
        "minInlineSize": {
            "default": "220px",
            "@media (max-width: 640px)": 0
        },
        "inlineSize": {
            "default": null,
            "@media (max-width: 640px)": tokens.controlH
        },
        "padding": {
            "default": null,
            "@media (max-width: 640px)": 0
        },
        "justifyContent": {
            "default": null,
            "@media (max-width: 640px)": "center"
        }
    }
});
