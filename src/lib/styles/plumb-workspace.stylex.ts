import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space3,
        "inlineSize": "100%",
        "paddingBlock": tokens.space2,
        "paddingInline": tokens.space3,
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "borderRadius": tokens.radiusMd,
        "backgroundColor": {
            "default": "transparent",
            ":is([data-hovered])": tokens.fillTertiary,
            ":is([data-pressed])": tokens.fillTertiary
        },
        "cursor": "pointer",
        "textAlign": "start"
    }
});
