import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-flex",
        "alignItems": "center",
        "gap": tokens.space2,
        "blockSize": "22px",
        "color": tokens.warningText,
        "backgroundColor": tokens.warningBg,
        "borderWidth": "1px",
        "borderStyle": "solid",
        "borderColor": tokens.warningBorder,
        "paddingBlock": 0,
        "paddingInline": tokens.space3,
        "borderRadius": tokens.radiusPill,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "whiteSpace": "nowrap",
        "alignSelf": {
            "default": null,
            ":is(.plumb-selection-body > .plumb-unknown)": "flex-start"
        }
    }
});
