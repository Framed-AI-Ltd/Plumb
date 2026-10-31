import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space3,
        "blockSize": "34px",
        "paddingInlineStart": `calc((var(--tree-item-level,1) - 1) * 20px + ${tokens.space2})`,
        "paddingInlineEnd": tokens.space3,
        "borderRadius": tokens.radiusMd,
        "fontWeight": {
            default: 400,
            ":is(.plumb-tree-item[data-selected] .plumb-tree-row)": 550
        },
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": {
            "default": tokens.text,
            ":is(.plumb-tree-item[data-selected] .plumb-tree-row)": tokens.accentText
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-tree-item[data-hovered] > .plumb-tree-row)": tokens.fillTertiary,
            ":is(.plumb-tree-item[data-hovered] .plumb-tree-row)": tokens.fillTertiary,
            ":is(.plumb-tree-item[data-selected] .plumb-tree-row)": tokens.accentBg
        }
    }
});
