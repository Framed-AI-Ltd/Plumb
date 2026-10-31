import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "gap": tokens.space3,
        "gridColumn": {
            "default": null,
            ":is(.plumb-scope-edit > .plumb-actions)": "1 / -1"
        }
    }
});
