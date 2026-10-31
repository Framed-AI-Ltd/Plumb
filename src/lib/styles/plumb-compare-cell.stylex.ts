import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "paddingBlock": tokens.space4,
        "paddingInline": tokens.space5,
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary,
        "fontWeight": {
            "default": 400,
            "::before": {
                "default": null,
                "@media (max-width: 640px)": 400
            },
            ":is([data-differs])": 500,
            "@media (max-width: 640px)": null
        },
        "fontSize": {
            "default": "0.875rem",
            "::before": {
                "default": null,
                "@media (max-width: 640px)": "0.75rem"
            },
            "@media (max-width: 640px)": null
        },
        "lineHeight": {
            "default": 1.57,
            "::before": {
                "default": null,
                "@media (max-width: 640px)": 1.5
            },
            "@media (max-width: 640px)": null
        },
        "fontFamily": {
            "default": tokens.fontBody,
            "::before": {
                "default": null,
                "@media (max-width: 640px)": tokens.fontBody
            },
            "@media (max-width: 640px)": null
        },
        "fontStyle": {
            "default": "normal",
            "::before": {
                "default": null,
                "@media (max-width: 640px)": "normal"
            },
            "@media (max-width: 640px)": null
        },
        "borderInlineStartWidth": 0,
        "borderInlineStartStyle": "none",
        "borderInlineStartColor": "currentColor",
        "color": {
            "default": tokens.text,
            ":is(:not([data-differs]))": tokens.textTertiary,
            "::before": {
                "default": null,
                "@media (max-width: 640px)": tokens.textTertiary
            }
        },
        "backgroundColor": {
            "default": null,
            ":is([data-selected])": `color-mix(in srgb, ${tokens.accentBg} 25%, ${tokens.bgContainer})`
        },
        "order": {
            "default": null,
            "@media (max-width: 640px)": "var(--o)"
        },
        "display": {
            "default": null,
            "@media (max-width: 640px)": "flex"
        },
        "justifyContent": {
            "default": null,
            "@media (max-width: 640px)": "space-between"
        },
        "gap": {
            "default": null,
            "@media (max-width: 640px)": tokens.space4
        },
        "content": {
            "default": null,
            "::before": {
                "default": null,
                "@media (max-width: 640px)": "attr(data-row)"
            }
        }
    }
});
