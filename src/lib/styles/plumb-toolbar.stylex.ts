import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexWrap": "wrap",
        "alignItems": {
            "default": "center",
            ":is([data-orientation=\"vertical\"])": "stretch"
        },
        "gap": tokens.space2,
        "flexDirection": {
            "default": null,
            ":is([data-orientation=\"vertical\"])": "column"
        }
    }
});
