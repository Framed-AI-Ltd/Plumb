import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
const plumbIndeterminate = stylex.keyframes({
    "from": {
        "transform": "translateX(-100%)"
    },
    "to": {
        "transform": "translateX(250%)"
    }
});
export const styles = stylex.create({
    "root": {
        "blockSize": "100%",
        "backgroundColor": {
            "default": tokens.accentSolid,
            ":is(.plumb-meter[data-tone=\"warning\"] .plumb-progress-fill)": tokens.warningSolid,
            ":is(.plumb-meter[data-tone=\"danger\"] .plumb-progress-fill)": tokens.errorSolid
        },
        "borderRadius": "inherit",
        "transition": `inline-size ${tokens.durationBase} ${tokens.ease}`,
        "inlineSize": {
            "default": null,
            ":is([data-indeterminate])": {
                "default": "40%",
                "@media (prefers-reduced-motion: reduce)": "100%"
            }
        },
        "animationName": {
            "default": null,
            ":is([data-indeterminate])": {
                "default": plumbIndeterminate,
                "@media (prefers-reduced-motion: reduce)": "none"
            }
        },
        "animationDuration": {
            "default": null,
            ":is([data-indeterminate])": {
                "default": "1.4s",
                "@media (prefers-reduced-motion: reduce)": "0s"
            }
        },
        "animationDelay": {
            "default": null,
            ":is([data-indeterminate])": "0s"
        },
        "animationTimingFunction": {
            "default": null,
            ":is([data-indeterminate])": tokens.ease
        },
        "animationIterationCount": {
            "default": null,
            ":is([data-indeterminate])": {
                "default": "infinite",
                "@media (prefers-reduced-motion: reduce)": 1
            }
        },
        "animationFillMode": {
            "default": null,
            ":is([data-indeterminate])": {
                "default": "none",
                "@media (prefers-reduced-motion: reduce)": "none"
            }
        },
        "opacity": {
            "default": null,
            ":is([data-indeterminate])": {
                "default": null,
                "@media (prefers-reduced-motion: reduce)": 0.5
            }
        }
    }
});
