import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "grid",
            ":is(.plumb-schedule-list[data-editing] .plumb-schedule-edit)": "contents"
        },
        "gridTemplateColumns": {
            "default": "minmax(0, 2fr) auto minmax(0, 1fr) minmax(0, 1.4fr)",
            "@media (max-width: 640px)": "1fr 1fr"
        },
        "gap": tokens.space3,
        "alignItems": "center"
    }
});
