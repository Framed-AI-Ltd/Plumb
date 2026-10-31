import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "grid",
            "@media (max-width: 640px)": "flex"
        },
        "backgroundColor": tokens.bgContainer,
        "borderRadius": tokens.radiusLg,
        "boxShadow": tokens.shadow1,
        "overflow": "hidden",
        "flexDirection": {
            "default": null,
            "@media (max-width: 640px)": "column"
        }
    }
});
