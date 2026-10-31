import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "relative",
        "borderRadius": tokens.radiusMd,
        "overflow": "hidden",
        "backgroundColor": tokens.fillSecondary,
        "boxShadow": tokens.shadow1,
        "maxInlineSize": {
            "default": null,
            ":is(.plumb-source-scroll .plumb-source-page)": "none"
        },
        "transition": {
            "default": null,
            ":is(.plumb-source-scroll .plumb-source-page)": `inline-size ${tokens.durationBase} ${tokens.ease}`
        }
    }
});
