import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "margin": {
            "default": null,
            ":is(.plumb-help p)": 0
        },
        "color": {
            "default": null,
            ":is(.plumb-help p)": tokens.textSecondary
        }
    }
});
