import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
const plumbPop = stylex.keyframes({
    "from": {
        "opacity": "0",
        "transform": "translateY(-4px)"
    }
});
const plumbPopOut = stylex.keyframes({
    "to": {
        "opacity": "0",
        "transform": "translateY(-4px)"
    }
});
export const styles = stylex.create({
    "root": {
        "backgroundColor": tokens.bgElevated,
        "borderRadius": tokens.radiusLg,
        "boxShadow": tokens.shadow2,
        "minInlineSize": "var(--trigger-width)",
        "outline": {
            "default": "none",
            "@media (prefers-contrast: more)": `1px solid ${tokens.controlBorder}`
        },
        "overflow": "auto",
        "animationName": {
            "default": null,
            ":is([data-entering])": plumbPop,
            ":is([data-exiting])": plumbPopOut
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
