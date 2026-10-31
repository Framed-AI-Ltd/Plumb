import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
const plumbFadeOut = stylex.keyframes({
    "to": {
        "opacity": "0"
    }
});
const plumbToastIn = stylex.keyframes({
    "from": {
        "opacity": "0",
        "transform": "translateY(8px)"
    }
});
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "flex-start",
        "gap": tokens.space4,
        "minInlineSize": "300px",
        "maxInlineSize": "420px",
        "paddingTop": tokens.space4,
        "paddingRight": tokens.space3,
        "paddingBottom": tokens.space4,
        "paddingLeft": tokens.space5,
        "borderRadius": tokens.radiusLg,
        "backgroundColor": tokens.bgElevated,
        "boxShadow": tokens.shadow2,
        "outline": {
            "default": "none",
            ":is([data-focus-visible])": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "animationName": {
            "default": plumbToastIn,
            ":is([data-exiting])": plumbFadeOut
        },
        "animationDuration": {
            "default": tokens.durationBase,
            ":is([data-exiting])": tokens.durationFast
        },
        "animationDelay": {
            "default": "0s",
            ":is([data-exiting])": "0s"
        },
        "animationTimingFunction": {
            "default": tokens.ease,
            ":is([data-exiting])": tokens.ease
        },
        "animationIterationCount": {
            "default": 1,
            ":is([data-exiting])": 1
        },
        "animationFillMode": {
            "default": "none",
            ":is([data-exiting])": "forwards"
        }
    }
});
