import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "color": {
            "default": tokens.accentText,
            ":is([data-hovered])": tokens.accentTextHover,
            ":is([data-variant=\"quiet\"])": "inherit",
            ":is(.plumb-breadcrumb .plumb-link)": tokens.textSecondary,
            ":is(.plumb-breadcrumb .plumb-link[data-hovered])": tokens.text,
            ":is(.plumb-breadcrumb .plumb-link[data-current])": tokens.text
        },
        "textDecoration": {
            "default": "underline",
            ":is(.plumb-breadcrumb .plumb-link)": "none"
        },
        "textDecorationThickness": "1px",
        "textUnderlineOffset": "3px",
        "cursor": {
            "default": "pointer",
            ":is(.plumb-breadcrumb .plumb-link[data-current])": "default"
        },
        "borderRadius": "2px",
        "textDecorationColor": {
            "default": null,
            ":is([data-variant=\"quiet\"])": tokens.controlBorder
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-breadcrumb .plumb-link[data-hovered])": tokens.fillTertiary,
            ":is(.plumb-breadcrumb .plumb-link[data-current])": "transparent"
        }
    }
});
