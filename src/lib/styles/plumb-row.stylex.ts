import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "outline": {
            "default": "none",
            ":is([data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "transition": `background ${tokens.durationFast} ${tokens.ease}`,
        "backgroundColor": {
            "default": null,
            ":is([data-hovered])": tokens.fillQuaternary,
            ":is([data-selected])": tokens.accentBg
        },
        "outlineOffset": {
            "default": null,
            ":is([data-focus-visible])": "-2px"
        },
        "display": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-row)": {
                "default": null,
                "@media (max-width: 640px)": "grid"
            }
        },
        "gridTemplateColumns": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-row)": {
                "default": null,
                "@media (max-width: 640px)": "1fr auto"
            }
        },
        "gap": {
            "default": null,
            "@media (max-width: 640px)": null
        },
        "rowGap": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-row)": {
                "default": null,
                "@media (max-width: 640px)": tokens.space2
            }
        },
        "columnGap": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-row)": {
                "default": null,
                "@media (max-width: 640px)": tokens.space4
            }
        },
        "padding": {
            "default": null,
            "@media (max-width: 640px)": null
        },
        "paddingTop": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-row)": {
                "default": null,
                "@media (max-width: 640px)": tokens.space4
            }
        },
        "paddingRight": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-row)": {
                "default": null,
                "@media (max-width: 640px)": tokens.cardInset
            }
        },
        "paddingBottom": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-row)": {
                "default": null,
                "@media (max-width: 640px)": tokens.space4
            }
        },
        "paddingLeft": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-row)": {
                "default": null,
                "@media (max-width: 640px)": tokens.cardInset
            }
        },
        "borderBlockStartWidth": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-row)": {
                "default": null,
                "@media (max-width: 640px)": "1px"
            }
        },
        "borderBlockStartStyle": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-row)": {
                "default": null,
                "@media (max-width: 640px)": "solid"
            }
        },
        "borderBlockStartColor": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-row)": {
                "default": null,
                "@media (max-width: 640px)": tokens.borderSecondary
            }
        }
    }
});
