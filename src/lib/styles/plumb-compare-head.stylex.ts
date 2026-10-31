import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "flex-start",
        "gap": tokens.space3,
        "paddingBlock": tokens.space6,
        "paddingInline": tokens.space5,
        "borderInlineStartWidth": 0,
        "borderInlineStartStyle": "none",
        "borderInlineStartColor": "currentColor",
        "backgroundColor": {
            "default": null,
            ":is([data-selected])": `color-mix(in srgb, ${tokens.accentBg} 60%, ${tokens.bgContainer})`
        },
        "boxShadow": {
            "default": null,
            ":is([data-selected])": `inset 0 2px 0 ${tokens.accentSolid}`
        },
        "borderBlockStartWidth": {
            "default": null,
            "@media (max-width: 640px)": "1px"
        },
        "borderBlockStartStyle": {
            "default": null,
            "@media (max-width: 640px)": "solid"
        },
        "borderBlockStartColor": {
            "default": null,
            "@media (max-width: 640px)": tokens.borderSecondary
        },
        "order": {
            "default": null,
            "@media (max-width: 640px)": "var(--o)"
        }
    }
});
