import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "gap": tokens.space4,
        "alignItems": "flex-start",
        "flexDirection": {
            "default": null,
            ":is([data-from=\"person\"])": "row-reverse"
        }
    }
});
