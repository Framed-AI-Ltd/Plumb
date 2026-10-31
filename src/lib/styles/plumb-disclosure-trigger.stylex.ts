import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "flex": "1",
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space3,
        "paddingBlock": tokens.space4,
        "paddingInline": tokens.space5,
        "backgroundColor": "transparent",
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "fontWeight": 600,
        "fontSize": "1rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontHeading,
        "fontStyle": "normal",
        "color": {
            "default": tokens.text,
            ":is([data-hovered])": tokens.accentText
        },
        "textAlign": "start",
        "cursor": "pointer",
        "borderRadius": tokens.radiusMd
    }
});
