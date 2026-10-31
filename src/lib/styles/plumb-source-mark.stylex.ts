import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "borderWidth": "2px",
        "borderStyle": "solid",
        "borderColor": {
            default: tokens.controlBorder,
            ":is([data-active])": tokens.accentSolid
        },
        "backgroundColor": {
            "default": `color-mix(in srgb, ${tokens.fillSecondary} 50%, transparent)`,
            ":is([data-active])": `color-mix(in srgb, ${tokens.accentBg} 55%, transparent)`
        },
        "borderRadius": tokens.radiusXs,
        "cursor": "pointer",
        "padding": 0,
        "minInlineSize": "24px",
        "minBlockSize": "24px"
    }
});
