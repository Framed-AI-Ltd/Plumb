import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "gap": tokens.space3,
        "alignItems": "flex-start",
        "paddingBlock": tokens.space3,
        "paddingInline": tokens.space2,
        "borderRadius": tokens.radiusSm,
        "backgroundColor": {
            "default": null,
            ":is([data-unread])": `color-mix(in srgb, ${tokens.accentBg} 45%, transparent)`
        }
    }
});
