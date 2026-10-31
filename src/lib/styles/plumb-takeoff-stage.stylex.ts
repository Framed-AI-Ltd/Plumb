import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "relative",
        "borderRadius": tokens.radiusMd,
        "overflow": "hidden",
        "backgroundColor": tokens.fillSecondary,
        "boxShadow": tokens.shadow1,
        "cursor": {
            "default": null,
            ":is(:not([data-tool=\"select\"]))": "crosshair"
        }
    }
});
