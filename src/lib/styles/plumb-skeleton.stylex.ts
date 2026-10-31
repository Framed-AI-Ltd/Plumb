import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
const plumbPulse = stylex.keyframes({
    "50%": {
        "opacity": "0.35"
    }
});
export const styles = stylex.create({
    "root": {
        "display": "block",
        "backgroundColor": tokens.fillSecondary,
        "borderRadius": tokens.radiusXs,
        "animationName": {
            "default": plumbPulse,
            "@media (prefers-reduced-motion: reduce)": "none"
        },
        "animationDuration": {
            "default": "1.6s",
            "@media (prefers-reduced-motion: reduce)": "0s"
        },
        "animationDelay": "0s",
        "animationTimingFunction": "ease-in-out",
        "animationIterationCount": {
            "default": "infinite",
            "@media (prefers-reduced-motion: reduce)": 1
        },
        "animationFillMode": {
            "default": "none",
            "@media (prefers-reduced-motion: reduce)": "none"
        }
    }
});
