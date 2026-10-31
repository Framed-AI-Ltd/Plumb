import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "alignSelf": "flex-start",
        "display": "inline-flex",
        "alignItems": "center",
        "gap": tokens.space2,
        "blockSize": {
            "default": "22px",
            ":is(.plumb-table .plumb-tag)::before": "6px"
        },
        "paddingInline": tokens.space3,
        "borderRadius": {
            "default": tokens.radiusSm,
            ":is(.plumb-table .plumb-tag)::before": "50%"
        },
        "backgroundColor": {
            "default": "var(--c-bg-strong)",
            ":is(.plumb-table .plumb-tag)": tokens.fillTertiary,
            ":is(.plumb-table .plumb-tag)::before": "var(--c-icon)"
        },
        "color": {
            "default": "var(--c-text)",
            ":is(.plumb-table .plumb-tag)": tokens.textSecondary
        },
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "whiteSpace": "nowrap",
        "borderWidth": {
            "default": null,
            "@media (forced-colors: active)": "1px"
        },
        "borderStyle": {
            "default": null,
            "@media (forced-colors: active)": "solid"
        },
        "borderColor": {
            "default": null,
            "@media (forced-colors: active)": "CanvasText"
        },
        "content": {
            "default": null,
            ":is(.plumb-table .plumb-tag)::before": "\"\""
        },
        "inlineSize": {
            "default": null,
            ":is(.plumb-table .plumb-tag)::before": "6px"
        }
    }
});
