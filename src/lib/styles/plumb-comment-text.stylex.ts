import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "overflowWrap": "anywhere",
        "paddingInlineStart": {
            "default": null,
            ":is(.plumb-comment[data-visibility=\"shared\"] .plumb-comment-text)": tokens.space3
        },
        "borderInlineStartWidth": {
            "default": null,
            ":is(.plumb-comment[data-visibility=\"shared\"] .plumb-comment-text)": "2px"
        },
        "borderInlineStartStyle": {
            "default": null,
            ":is(.plumb-comment[data-visibility=\"shared\"] .plumb-comment-text)": "solid"
        },
        "borderInlineStartColor": {
            "default": null,
            ":is(.plumb-comment[data-visibility=\"shared\"] .plumb-comment-text)": tokens.accentBorder
        }
    }
});
