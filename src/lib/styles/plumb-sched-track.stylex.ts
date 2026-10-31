import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "relative",
        "blockSize": "20px",
        "borderRadius": tokens.radiusXs,
        "backgroundColor": tokens.fillLayout,
        "gridColumn": {
            "default": null,
            "@media (max-width: 640px)": "1 / -1"
        },
        "gridRow": {
            "default": null,
            "@media (max-width: 640px)": 2
        }
    }
});
