import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontWeight": 500,
        "fontSize": "0.8125rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": tokens.text,
        "display": {
            "default": null,
            ":is(.plumb-access-row .plumb-contact-name)": "flex"
        },
        "gap": {
            "default": null,
            ":is(.plumb-access-row .plumb-contact-name)": tokens.space3
        },
        "alignItems": {
            "default": null,
            ":is(.plumb-access-row .plumb-contact-name)": "center"
        }
    }
});
