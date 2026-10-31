import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "flex-start",
        "gap": tokens.space2,
        "padding": tokens.space5,
        "borderInlineStartWidth": "1px",
        "borderInlineStartStyle": "solid",
        "borderInlineStartColor": tokens.borderSecondary,
        "backgroundColor": {
            "default": null,
            ":is([data-selected])": `color-mix(in srgb, ${tokens.accentBg} 60%, ${tokens.bgContainer})`
        }
    }
});
