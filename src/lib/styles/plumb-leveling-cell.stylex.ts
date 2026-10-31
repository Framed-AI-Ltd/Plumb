import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexWrap": "wrap",
        "alignItems": "center",
        "rowGap": "4px",
        "columnGap": tokens.space2,
        "paddingBlock": tokens.space4,
        "paddingInline": tokens.space5,
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary,
        "borderInlineStartWidth": "1px",
        "borderInlineStartStyle": "solid",
        "borderInlineStartColor": tokens.borderSecondary,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": {
            "default": null,
            ":is([data-coverage=\"excluded\"])": tokens.textSecondary,
            ":is([data-coverage=\"unclear\"])": tokens.warningText,
            ":is([data-coverage=\"missing\"])": tokens.warningText
        },
        "backgroundColor": {
            "default": null,
            ":is([data-coverage=\"unclear\"])": `color-mix(in srgb, ${tokens.warningBg} 45%, transparent)`,
            ":is([data-coverage=\"missing\"])": `color-mix(in srgb, ${tokens.warningBg} 45%, transparent)`
        }
    }
});
