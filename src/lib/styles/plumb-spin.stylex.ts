import * as stylex from "@stylexjs/stylex";
const plumbSpin = stylex.keyframes({
    "to": {
        "transform": "rotate(360deg)"
    }
});
export const styles = stylex.create({
    "root": {
        "animationName": {
            "default": plumbSpin,
            "@media (prefers-reduced-motion: reduce)": "none"
        },
        "animationDuration": {
            "default": "0.9s",
            "@media (prefers-reduced-motion: reduce)": "0s"
        },
        "animationDelay": "0s",
        "animationTimingFunction": "linear",
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
