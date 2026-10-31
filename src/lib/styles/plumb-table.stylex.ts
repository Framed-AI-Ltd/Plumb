import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "100%",
        "borderCollapse": "separate",
        "borderSpacing": 0,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "display": {
            "default": null,
            ":is([data-layout=\"auto\"])": {
                "default": null,
                "@media (max-width: 640px)": "block"
            }
        }
    }
});
