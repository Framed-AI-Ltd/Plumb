import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space3,
        "padding": tokens.space4,
        "borderRadius": tokens.radiusLg,
        "backgroundColor": tokens.fillLayout,
        "transition": `box-shadow ${tokens.durationFast} ${tokens.ease}`,
        "boxShadow": {
            "default": null,
            ":is([data-over])": `inset 0 0 0 2px ${tokens.accentSolid}`
        }
    }
});
