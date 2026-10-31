import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": "4px",
        "inlineSize": "100%",
        "marginBlockEnd": "2px",
        "paddingTop": {
            "default": "2px",
            ":is(.plumb-month .plumb-event)": {
                "default": null,
                "@media (max-width: 640px)": "2px"
            }
        },
        "paddingRight": {
            "default": tokens.space2,
            ":is(.plumb-month .plumb-event)": {
                "default": null,
                "@media (max-width: 640px)": "3px"
            }
        },
        "paddingBottom": {
            "default": "2px",
            ":is(.plumb-month .plumb-event)": {
                "default": null,
                "@media (max-width: 640px)": "2px"
            }
        },
        "paddingLeft": {
            "default": tokens.space2,
            ":is(.plumb-month .plumb-event)": {
                "default": null,
                "@media (max-width: 640px)": "3px"
            }
        },
        "padding": {
            "default": null,
            "@media (max-width: 640px)": null
        },
        "borderWidth": "1px",
        "borderStyle": {
            default: "dashed",
            ":is([data-confirmed])": "solid"
        },
        "borderColor": {
            default: tokens.accentBorderHover,
            ":is([data-confirmed])": "transparent",
            ":is([data-overdue])": tokens.warningBorder
        },
        "borderRadius": tokens.radiusXs,
        "backgroundColor": {
            "default": "transparent",
            ":is([data-confirmed])": tokens.accentBg,
            ":is([data-overdue])": tokens.warningBg
        },
        "color": {
            "default": tokens.text,
            ":is([data-confirmed])": tokens.accentText,
            ":is([data-overdue])": tokens.warningText
        },
        "fontWeight": 400,
        "fontSize": {
            default: "0.75rem",
            ":is(.plumb-month .plumb-event)": {
                "default": null,
                "@media (max-width: 640px)": "0.6875rem"
            }
        },
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "textAlign": "start",
        "cursor": "pointer",
        "overflow": "hidden",
        "textOverflow": "ellipsis",
        "whiteSpace": {
            "default": "nowrap",
            ":is(.plumb-agenda .plumb-event)": "normal",
            ":is(.plumb-month .plumb-event)": {
                "default": null,
                "@media (max-width: 640px)": "normal"
            }
        },
        "minBlockSize": {
            "default": null,
            ":is(.plumb-month .plumb-event)": {
                "default": null,
                "@media (max-width: 640px)": "24px"
            },
            ":is(.plumb-agenda .plumb-event)": "28px"
        }
    }
});
