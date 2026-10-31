import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "padding": {
            "default": null,
            ":is(.plumb-recurrence legend)": 0
        },
        "marginBlockEnd": {
            "default": null,
            ":is(.plumb-recurrence legend)": tokens.space2
        }
    }
});
