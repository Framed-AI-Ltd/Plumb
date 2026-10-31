import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "backgroundColor": tokens.bgContainer,
        "borderRadius": tokens.radiusLg,
        "boxShadow": tokens.shadow1,
        "overflow": "hidden"
    }
});
