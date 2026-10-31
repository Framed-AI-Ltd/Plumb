import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "color": {
            "default": null,
            ":is(.plumb-scope-list[data-kind=\"in\"] li)::marker": tokens.successIcon,
            ":is(.plumb-scope-list[data-kind=\"out\"] li)": tokens.textSecondary,
            ":is(.plumb-scope-list[data-kind=\"assume\"] li)::marker": tokens.warningIcon
        },
        "display": {
            "default": null,
            ":is(.plumb-checklist-items li)": "flex",
            ":is(.plumb-fact-history li)": "flex",
            ":is(.plumb-provider-checks li)": "flex",
            ":is(.plumb-takeoff-list li)": "flex",
            ":is(.plumb-agenda li)": "grid",
            ":is(.plumb-money-range-drivers li)": "grid"
        },
        "flexDirection": {
            "default": null,
            ":is(.plumb-checklist-items li)": "column"
        },
        "flexWrap": {
            "default": null,
            ":is(.plumb-fact-history li)": "wrap"
        },
        "alignItems": {
            "default": null,
            ":is(.plumb-fact-history li)": "center",
            ":is(.plumb-provider-checks li)": "center",
            ":is(.plumb-takeoff-list li)": "center",
            ":is(.plumb-money-range-drivers li)": "center"
        },
        "gap": {
            "default": null,
            ":is(.plumb-fact-history li)": "4px",
            ":is(.plumb-provider-checks li)": tokens.space2,
            ":is(.plumb-takeoff-list li)": tokens.space3,
            ":is(.plumb-agenda li)": tokens.space4,
            ":is(.plumb-money-range-drivers li)": tokens.space3
        },
        "paddingBlock": {
            "default": null,
            ":is(.plumb-takeoff-list li)": tokens.space2,
            ":is(.plumb-agenda li)": tokens.space3
        },
        "borderBlockStartWidth": {
            "default": null,
            ":is(.plumb-takeoff-list li:first-child)": 0,
            ":is(.plumb-takeoff-list li)": "1px",
            ":is(.plumb-agenda li)": "1px"
        },
        "borderBlockStartStyle": {
            "default": null,
            ":is(.plumb-takeoff-list li)": "solid",
            ":is(.plumb-agenda li)": "solid"
        },
        "borderBlockStartColor": {
            "default": null,
            ":is(.plumb-takeoff-list li)": tokens.borderSecondary,
            ":is(.plumb-agenda li)": tokens.borderSecondary
        },
        "gridTemplateColumns": {
            "default": null,
            ":is(.plumb-agenda li)": "12ch minmax(0, 1fr)",
            ":is(.plumb-money-range-drivers li)": "minmax(0, 1fr) minmax(80px, 2fr) 5ch"
        }
    }
});
