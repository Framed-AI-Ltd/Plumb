import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-flex",
        "alignItems": "center",
        "paddingBlock": 0,
        "paddingInline": tokens.space2,
        "minInlineSize": "20px",
        "blockSize": "20px",
        "borderRadius": tokens.radiusXs,
        "backgroundColor": tokens.fillTertiary,
        "borderWidth": "1px",
        "borderStyle": "solid",
        "borderColor": tokens.border,
        "borderBlockEndWidth": "2px",
        "fontFamily": tokens.fontBody,
        "fontWeight": 500,
        "fontSize": "0.6875rem",
        "lineHeight": 1,
        "color": tokens.textSecondary
    }
});
