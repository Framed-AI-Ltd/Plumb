import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "minInlineSize": 0,
        "backgroundColor": tokens.bgContainer,
        "borderRadius": tokens.radiusLg,
        "boxShadow": tokens.shadow1,
        "padding": tokens.space5,
        "outline": {
            "default": null,
            ":is([data-selected])": `2px solid ${tokens.accentBorder}`
        }
    }
});
