import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "blockSize": {
            "default": "1px",
            ":is([data-orientation=\"vertical\"])": "auto"
        },
        "backgroundColor": tokens.borderSecondary,
        "margin": 0,
        "inlineSize": {
            "default": "100%",
            ":is([data-orientation=\"vertical\"])": "1px"
        },
        "alignSelf": {
            "default": null,
            ":is([data-orientation=\"vertical\"])": "stretch"
        }
    }
});
