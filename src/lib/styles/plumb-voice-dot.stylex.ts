import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
const plumbPulse = stylex.keyframes({
    "50%": {
        "opacity": "0.35"
    }
});
export const styles = stylex.create({
    "root": {
        "inlineSize": "10px",
        "blockSize": "10px",
        "borderRadius": "50%",
        "backgroundColor": tokens.errorSolid,
        "animationName": {
            "default": plumbPulse,
            "@media (prefers-reduced-motion: reduce)": "none"
        },
        "animationDuration": {
            "default": "1.2s",
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
