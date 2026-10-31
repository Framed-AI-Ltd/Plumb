import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "backgroundColor": tokens.bgContainer,
        "display": {
            "default": null,
            ":is(.plumb-compare .plumb-compare-corner)": {
                "default": null,
                "@media (max-width: 640px)": "none"
            }
        }
    }
});
