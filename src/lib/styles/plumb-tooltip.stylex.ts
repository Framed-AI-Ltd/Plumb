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
        "backgroundColor": tokens.text,
        "color": tokens.bgContainer,
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "paddingBlock": tokens.space2,
        "paddingInline": tokens.space3,
        "borderRadius": tokens.radiusSm,
        "maxInlineSize": "240px",
        "boxShadow": tokens.shadow2,
        "animationName": {
            "default": null,
            ":is([data-entering])": plumbFade,
            ":is([data-exiting])": plumbFadeOut
        },
        "animationDuration": {
            "default": null,
            ":is([data-entering])": tokens.durationFast,
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
