import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": {
            "default": null,
            ":is([data-gap=\"3\"])": tokens.space3,
            ":is([data-gap=\"4\"])": tokens.space4,
            ":is(.plumb-actions)": tokens.space3
        }
    }
});
