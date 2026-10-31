import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "margin": {
            "default": null,
            ":is(.plumb-leveling-bid-items dd)": 0
        },
        "display": {
            "default": null,
            ":is(.plumb-leveling-bid-items dd)": "flex"
        },
        "flexDirection": {
            "default": null,
            ":is(.plumb-leveling-bid-items dd)": "column"
        },
        "gap": {
            "default": null,
            ":is(.plumb-leveling-bid-items dd)": tokens.space2
        }
    }
});
