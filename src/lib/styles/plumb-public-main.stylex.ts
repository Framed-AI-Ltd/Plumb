import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "flex": "1",
        "inlineSize": "100%",
        "marginInline": "auto",
        "padding": tokens.space6,
        "outline": "none",
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space6,
        "maxInlineSize": {
            "default": null,
            ":is(.plumb-public[data-width=\"narrow\"] .plumb-public-main)": `calc(480px + 2 * ${tokens.space6})`,
            ":is(.plumb-public[data-width=\"medium\"] .plumb-public-main)": `calc(880px + 2 * ${tokens.space6})`,
            ":is(.plumb-public[data-width=\"wide\"] .plumb-public-main)": `calc(1280px + 2 * ${tokens.space6})`
        }
    }
});
