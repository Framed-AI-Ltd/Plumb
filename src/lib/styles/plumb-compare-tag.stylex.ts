import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "insetBlockStart": tokens.space3,
        "paddingBlock": "2px",
        "paddingInline": tokens.space3,
        "borderRadius": tokens.radiusPill,
        "backgroundColor": tokens.mediaLabelBg,
        "color": tokens.onMedia,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "insetInlineStart": {
            "default": null,
            ":is([data-side=\"before\"])": tokens.space3
        },
        "insetInlineEnd": {
            "default": null,
            ":is([data-side=\"after\"])": tokens.space3
        }
    }
});
