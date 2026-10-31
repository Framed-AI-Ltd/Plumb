import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fill": {
            "default": null,
            ":is(.plumb-takeoff-shape circle)": tokens.accentSolid
        }
    }
});
