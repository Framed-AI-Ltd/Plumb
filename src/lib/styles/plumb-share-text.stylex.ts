import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "flex": "1",
        "color": {
            "default": null,
            ":is(.plumb-share-group[data-excluded] .plumb-share-text)": tokens.textSecondary
        }
    }
});
