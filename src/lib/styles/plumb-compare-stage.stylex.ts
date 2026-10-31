import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "relative",
        "borderRadius": tokens.radiusLg,
        "overflow": "hidden",
        "backgroundColor": tokens.fillSecondary
    }
});
