import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "paddingInline": {
            "default": "1px",
            ":is([data-type=\"literal\"])": "2px"
        },
        "borderRadius": "3px",
        "fontVariantNumeric": "tabular-nums",
        "color": {
            "default": null,
            ":is([data-type=\"literal\"])": tokens.textTertiary,
            ":is([data-placeholder])": tokens.textTertiary,
            ":is([data-focused])": tokens.accentText
        },
        "backgroundColor": {
            "default": null,
            ":is([data-focused])": tokens.accentBgHover
        },
        "outline": {
            "default": null,
            ":is([data-focused])": "none"
        }
    }
});
