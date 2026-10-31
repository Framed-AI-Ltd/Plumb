import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "relative",
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space1,
        "paddingTop": tokens.space3,
        "paddingRight": `calc(${tokens.space3} + ${tokens.controlHSm})`,
        "paddingBottom": tokens.space3,
        "paddingLeft": tokens.space4,
        "borderRadius": tokens.radiusMd,
        "backgroundColor": tokens.bgContainer,
        "boxShadow": tokens.shadow1,
        "cursor": "grab",
        "opacity": {
            "default": null,
            ":is([data-dragging])": 0.5
        }
    }
});
