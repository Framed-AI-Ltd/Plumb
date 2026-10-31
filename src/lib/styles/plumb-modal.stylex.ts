import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
const plumbModalIn = stylex.keyframes({
    "from": {
        "opacity": "0",
        "transform": "translateY(8px) scale(0.98)"
    }
});
const plumbModalOut = stylex.keyframes({
    "to": {
        "opacity": "0",
        "transform": "translateY(4px) scale(0.98)"
    }
});
export const styles = stylex.create({
    "root": {
        "backgroundColor": tokens.bgElevated,
        "borderRadius": tokens.radiusXl,
        "boxShadow": tokens.shadow2,
        "inlineSize": {
            "default": "min(480px, 100%)",
            ":is([data-size=\"lg\"])": "min(720px, 100%)"
        },
        "maxBlockSize": "90vh",
        "overflow": "auto",
        "outline": {
            "default": null,
            "@media (prefers-contrast: more)": `1px solid ${tokens.controlBorder}`
        },
        "animationName": {
            "default": null,
            ":is([data-entering])": plumbModalIn,
            ":is([data-exiting])": plumbModalOut
        },
        "animationDuration": {
            "default": null,
            ":is([data-entering])": tokens.durationBase,
            ":is([data-exiting])": tokens.durationFast
        },
        "animationDelay": {
            "default": null,
            ":is([data-entering])": "0s",
            ":is([data-exiting])": "0s"
        },
        "animationTimingFunction": {
            "default": null,
            ":is([data-entering])": tokens.ease,
            ":is([data-exiting])": tokens.ease
        },
        "animationIterationCount": {
            "default": null,
            ":is([data-entering])": 1,
            ":is([data-exiting])": 1
        },
        "animationFillMode": {
            "default": null,
            ":is([data-entering])": "none",
            ":is([data-exiting])": "forwards"
        }
    }
});
