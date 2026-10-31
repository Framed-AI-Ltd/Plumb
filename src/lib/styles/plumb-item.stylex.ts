import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": tokens.space3,
        "paddingTop": tokens.space3,
        "paddingRight": tokens.space4,
        "paddingBottom": tokens.space3,
        "paddingLeft": tokens.space3,
        "borderRadius": tokens.radiusSm,
        "cursor": {
            "default": "pointer",
            ":is([data-disabled])": "not-allowed"
        },
        "outline": "none",
        "fontWeight": {
            default: 400,
            ":is([data-selected])": 550
        },
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": {
            "default": tokens.text,
            ":is([data-danger])": tokens.errorText,
            ":is([data-disabled])": tokens.textDisabled
        },
        "backgroundColor": {
            "default": null,
            ":is([data-selected])": tokens.accentBg,
            ":is([data-focused])": tokens.fillTertiary,
            ":is([data-danger][data-focused])": tokens.errorBg
        }
    }
});
