import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "color": {
            "default": null,
            ":is(.plumb-diff del)": tokens.textSecondary
        }
    }
});
