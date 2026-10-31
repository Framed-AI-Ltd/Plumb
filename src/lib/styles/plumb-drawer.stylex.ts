import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
const plumbSlide = stylex.keyframes({
    "from": {
        "transform": "translateX(var(--slide-from))",
        "opacity": "0"
    }
});
const plumbSlideOut = stylex.keyframes({
    "to": {
        "transform": "translateX(var(--slide-from))",
        "opacity": "0"
    }
});
export const styles = stylex.create({
    "root": {
        "backgroundColor": tokens.bgElevated,
        "borderRadius": tokens.radiusXl,
        "boxShadow": tokens.shadow2,
        "blockSize": "100%",
        "display": "flex",
        "animationName": {
            "default": null,
            ":is([data-entering])": plumbSlide,
            ":is([data-exiting])": plumbSlideOut
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
        },
        "--slide-from": {
            "default": "24px",
            ":is(:dir(rtl) .plumb-drawer)": "-24px"
        }
    }
});
