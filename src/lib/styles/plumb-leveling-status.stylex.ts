import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-flex",
        "alignItems": "center",
        "gap": tokens.space2,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": {
            "default": null,
            ":is([data-coverage=\"included\"])": tokens.successText,
            ":is(:is([data-coverage=\"unclear\"], [data-coverage=\"missing\"]))": tokens.warningText
        }
    }
});
