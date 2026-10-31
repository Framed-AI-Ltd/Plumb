import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-flex",
        "padding": "2px",
        "gap": "2px",
        "backgroundColor": {
            "default": tokens.fillSecondary,
            ":is([data-plumb-theme=\"dark\"] .plumb-segmented)": tokens.fillTertiary
        },
        "borderRadius": tokens.radiusMd,
        "marginInlineStart": {
            "default": null,
            ":is(.plumb-event-bar .plumb-segmented)": "auto"
        },
        "alignSelf": {
            "default": null,
            ":is(.plumb-plan-wrap > .plumb-segmented)": "flex-start"
        },
        "maxInlineSize": {
            "default": null,
            ":is(.plumb-takeoff-bar .plumb-segmented)": "100%"
        },
        "flexWrap": {
            "default": null,
            ":is(.plumb-takeoff-bar .plumb-segmented)": "wrap"
        }
    }
});
