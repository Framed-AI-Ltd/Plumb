import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "flex",
            ":is(.plumb-step-item:last-child)::after": "none"
        },
        "alignItems": "center",
        "gap": {
            "default": tokens.space3,
            ":is(:not([data-state=\"current\"]))": {
                "default": null,
                "@media (max-width: 640px)": 0
            }
        },
        "fontWeight": {
            default: 400,
            ":is([data-state=\"current\"])": 550
        },
        "fontSize": {
            default: "0.875rem",
            ":is(:not([data-state=\"current\"]))": {
                "default": null,
                "@media (max-width: 640px)": 0
            }
        },
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": {
            "default": tokens.textSecondary,
            ":is([data-state=\"current\"])": tokens.text,
            ":is([data-state=\"done\"])": tokens.text
        },
        "flex": {
            "default": "1",
            ":is(:last-child)": "none",
            "::after": "1"
        },
        "content": {
            "default": null,
            "::after": "\"\""
        },
        "blockSize": {
            "default": null,
            "::after": "1px"
        },
        "backgroundColor": {
            "default": null,
            "::after": tokens.border,
            ":is(.plumb-step-item[data-state=\"done\"])::after": tokens.accentSolid
        },
        "marginInlineStart": {
            "default": null,
            "::after": tokens.space3
        }
    }
});
