import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "44px",
        "blockSize": "44px",
        "borderRadius": tokens.radiusLg,
        "display": "grid",
        "placeItems": "center",
        "backgroundColor": tokens.bgContainer,
        "color": tokens.accentText,
        "boxShadow": tokens.shadow1,
        "gridRow": {
            "default": null,
            "@media (max-width: 640px)": "1 / 4"
        },
        "alignSelf": {
            "default": null,
            "@media (max-width: 640px)": "start"
        }
    }
});
