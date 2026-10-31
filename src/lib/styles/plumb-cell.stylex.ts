import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "paddingTop": tokens.space4,
        "paddingRight": tokens.space5,
        "paddingBottom": tokens.space4,
        "paddingLeft": tokens.space5,
        "padding": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell)": {
                "default": null,
                "@media (max-width: 640px)": 0
            }
        },
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary,
        "verticalAlign": "top",
        "outline": {
            "default": "none",
            ":is([data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "paddingBlock": {
            "default": null,
            ":is(.plumb-table[data-density=\"compact\"] .plumb-cell)": tokens.space3
        },
        "display": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell)": {
                "default": null,
                "@media (max-width: 640px)": "contents"
            }
        },
        "borderWidth": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell)": {
                "default": null,
                "@media (max-width: 640px)": 0
            }
        },
        "borderStyle": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell)": {
                "default": null,
                "@media (max-width: 640px)": "none"
            }
        },
        "borderColor": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell)": {
                "default": null,
                "@media (max-width: 640px)": "currentColor"
            }
        },
        "content": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell[data-label]:not(:first-child))::before": {
                "default": null,
                "@media (max-width: 640px)": "attr(data-label)"
            }
        },
        "fontWeight": {
            "default": null,
            "@media (max-width: 640px)": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell[data-label]:not(:first-child))::before": {
                "default": null,
                "@media (max-width: 640px)": 400
            }
        },
        "fontSize": {
            "default": null,
            "@media (max-width: 640px)": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell[data-label]:not(:first-child))::before": {
                "default": null,
                "@media (max-width: 640px)": "0.75rem"
            }
        },
        "lineHeight": {
            "default": null,
            "@media (max-width: 640px)": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell[data-label]:not(:first-child))::before": {
                "default": null,
                "@media (max-width: 640px)": 1.5
            }
        },
        "fontFamily": {
            "default": null,
            "@media (max-width: 640px)": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell[data-label]:not(:first-child))::before": {
                "default": null,
                "@media (max-width: 640px)": tokens.fontBody
            }
        },
        "fontStyle": {
            "default": null,
            "@media (max-width: 640px)": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell[data-label]:not(:first-child))::before": {
                "default": null,
                "@media (max-width: 640px)": "normal"
            }
        },
        "color": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell[data-label]:not(:first-child))::before": {
                "default": null,
                "@media (max-width: 640px)": tokens.textTertiary
            }
        },
        "gridColumn": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell[data-label]:not(:first-child))::before": {
                "default": null,
                "@media (max-width: 640px)": 1
            }
        },
        "alignSelf": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell[data-label]:not(:first-child))::before": {
                "default": null,
                "@media (max-width: 640px)": "center"
            }
        },
        "outlineOffset": {
            "default": null,
            ":is([data-focus-visible])": "-2px"
        }
    }
});
