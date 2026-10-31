import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "100%",
        "marginInline": "auto",
        "paddingInline": tokens.space6,
        "maxInlineSize": {
            "default": null,
            ":is([data-width=\"narrow\"])": `calc(480px + 2 * ${tokens.space6})`,
            ":is([data-width=\"text\"])": `calc(720px + 2 * ${tokens.space6})`,
            ":is([data-width=\"medium\"])": `calc(960px + 2 * ${tokens.space6})`,
            ":is([data-width=\"wide\"])": `calc(1280px + 2 * ${tokens.space6})`
        }
    }
});
