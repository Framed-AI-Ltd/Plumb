import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "color": {
            "default": null,
            ":is([data-placeholder])": tokens.textTertiary
        }
    }
});
