import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "16px",
        "blockSize": "16px",
        "color": tokens.textTertiary,
        "transition": `transform ${tokens.durationFast} ${tokens.ease}`,
        "transform": {
            "default": null,
            ":is(.plumb-disclosure[data-expanded] .plumb-disclosure-chevron)": "rotate(90deg)",
            ":is(:dir(rtl) .plumb-disclosure[data-expanded] .plumb-disclosure-chevron)": "rotate(90deg)"
        }
    }
});
