import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "flex-start",
        "gap": tokens.space1,
        "inlineSize": "100%",
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space4,
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "borderRadius": tokens.radiusMd,
        "backgroundColor": {
            "default": "transparent",
            ":is([data-hovered])": tokens.fillTertiary,
            ":is([aria-current])": "transparent"
        },
        "textAlign": "start",
        "cursor": "pointer",
        "paddingInlineEnd": "112px"
    }
});
