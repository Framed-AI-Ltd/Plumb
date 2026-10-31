import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fill": {
            "default": null,
            ":is(.plumb-plan-room polygon)": tokens.fillLayout,
            ":is(.plumb-plan-room polygon:hover)": tokens.fillSecondary,
            ":is(.plumb-plan-room[data-selected] polygon)": `color-mix(in srgb, ${tokens.accentSolid} 22%, ${tokens.bgContainer})`,
            ":is(.plumb-takeoff-shape polygon)": "none",
            ":is(.plumb-takeoff-shape[data-kind=\"area\"] polygon)": `color-mix(in srgb, ${tokens.accentSolid} 18%, transparent)`
        },
        "stroke": {
            "default": null,
            ":is(.plumb-plan-room polygon)": tokens.textSecondary,
            ":is(.plumb-plan-room[data-selected] polygon)": tokens.accentSolid,
            ":is(.plumb-takeoff-shape polygon)": tokens.accentSolid
        },
        "strokeWidth": {
            "default": null,
            ":is(.plumb-plan-room polygon)": 0.06,
            ":is(.plumb-plan-room[data-selected] polygon)": 2,
            ":is(.plumb-takeoff-shape polygon)": 3
        },
        "vectorEffect": {
            "default": null,
            ":is(.plumb-plan-room polygon)": "non-scaling-stroke",
            ":is(.plumb-takeoff-shape polygon)": "non-scaling-stroke"
        },
        "cursor": {
            "default": null,
            ":is(.plumb-plan-room polygon)": "pointer"
        },
        "transition": {
            "default": null,
            ":is(.plumb-plan-room polygon)": `fill ${tokens.durationFast} ${tokens.ease}`
        },
        "strokeDasharray": {
            "default": null,
            ":is(.plumb-plan-room[data-unmeasured] polygon)": "6 4"
        }
    }
});
