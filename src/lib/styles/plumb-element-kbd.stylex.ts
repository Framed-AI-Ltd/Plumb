import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "marginInlineStart": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": "auto"
        },
        "fontWeight": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": 400
        },
        "fontSize": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": "0.75rem"
        },
        "lineHeight": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": 1.5
        },
        "fontFamily": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": tokens.fontBody
        },
        "fontStyle": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": "normal"
        },
        "color": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": tokens.textTertiary
        },
        "borderWidth": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": "1px"
        },
        "borderStyle": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": "solid"
        },
        "borderColor": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": tokens.border
        },
        "borderRadius": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": tokens.radiusXs
        },
        "padding": null,
        "paddingTop": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": 0
        },
        "paddingRight": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": "4px"
        },
        "paddingBottom": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": 0
        },
        "paddingLeft": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": "4px"
        },
        "display": {
            "default": null,
            ":is(.plumb-command-trigger kbd)": {
                "default": null,
                "@media (pointer: coarse)": "none",
                "@media (max-width: 640px)": "none"
            }
        }
    }
});
