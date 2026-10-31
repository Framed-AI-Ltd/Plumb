import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "backgroundColor": {
            "default": tokens.bgContainer,
            ":is([data-pressed])": tokens.fillTertiary,
            ":is([data-selected])": tokens.accentBg
        },
        "color": {
            "default": tokens.text,
            ":is([data-hovered])": tokens.accentText,
            ":is([data-selected])": tokens.accentText
        },
        "borderColor": {
            "default": tokens.border,
            ":is([data-hovered])": tokens.accentSolid,
            ":is([data-selected])": tokens.accentBorder
        },
        "boxShadow": {
            "default": tokens.controlShadow,
            ":is([data-selected])": "none"
        }
    }
});
