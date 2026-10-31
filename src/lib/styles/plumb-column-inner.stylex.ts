import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-flex",
        "alignItems": "center",
        "gap": tokens.space2,
        "textAlign": {
            "default": null,
            ":is(.plumb-table [data-align=\"end\"] .plumb-column-inner)": "end"
        },
        "justifyContent": {
            "default": null,
            ":is(.plumb-table [data-align=\"end\"] .plumb-column-inner)": "flex-end"
        }
    }
});
