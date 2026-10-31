import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "gap": "2px",
        "flex": "none",
        "opacity": {
            "default": 0.55,
            ":is(.plumb-scope-row:hover .plumb-scope-actions)": 1,
            ":is(.plumb-scope-row:focus-within .plumb-scope-actions)": 1,
            ":is(.plumb-scope-row[data-draft] .plumb-scope-actions)": 1,
            "@media (pointer: coarse)": 1
        },
        "transition": `opacity ${tokens.durationFast} ${tokens.ease}`
    }
});
