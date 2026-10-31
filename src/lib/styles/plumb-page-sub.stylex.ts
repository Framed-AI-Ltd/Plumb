import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "gridColumn": {
            "default": null,
            ":is(.plumb-page-header > .plumb-page-sub)": 1
        },
        "gap": tokens.space3
    }
});
