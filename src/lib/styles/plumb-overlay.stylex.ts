import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
const plumbFade = stylex.keyframes({
    "from": {
        "opacity": "0"
    }
});
const plumbFadeOut = stylex.keyframes({
    "to": {
        "opacity": "0"
    }
});
export const styles = stylex.create({
    "root": {
        "position": "fixed",
        "inset": 0,
        "backgroundColor": tokens.scrim,
        "display": "grid",
        "placeItems": "center",
        "padding": tokens.space6,
        "zIndex": 100,
        "animationName": {
            "default": null,
            ":is([data-entering])": plumbFade,
            ":is([data-exiting])": plumbFadeOut
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
