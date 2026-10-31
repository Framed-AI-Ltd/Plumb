import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "color": {
            "default": tokens.text,
            ":is(.plumb-breakdown-row[data-private] .plumb-breakdown-label)": tokens.textSecondary,
            ":is(.plumb-breakdown-sub .plumb-breakdown-label)": tokens.textSecondary
        }
    }
});
