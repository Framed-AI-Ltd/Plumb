import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "color": tokens.text,
        "textWrap": "balance",
        "wordSpacing": "0.06em",
        "fontWeight": {
            "default": null,
            ":is([data-level=\"display\"])": 650,
            ":is([data-level=\"title\"])": 650,
            ":is([data-level=\"heading\"])": 600,
            ":is([data-level=\"subheading\"])": 600
        },
        "fontSize": {
            "default": null,
            ":is([data-level=\"display\"])": "2rem",
            ":is([data-level=\"title\"])": "1.75rem",
            ":is([data-level=\"heading\"])": "1.125rem",
            ":is([data-level=\"subheading\"])": "1rem"
        },
        "lineHeight": {
            "default": null,
            ":is([data-level=\"display\"])": 1.25,
            ":is([data-level=\"title\"])": 1.25,
            ":is([data-level=\"heading\"])": 1.4,
            ":is([data-level=\"subheading\"])": 1.45
        },
        "fontFamily": {
            "default": null,
            ":is([data-level=\"display\"])": tokens.fontHeading,
            ":is([data-level=\"title\"])": tokens.fontHeading,
            ":is([data-level=\"heading\"])": tokens.fontHeading,
            ":is([data-level=\"subheading\"])": tokens.fontHeading
        },
        "fontStyle": {
            "default": null,
            ":is([data-level=\"display\"])": "normal",
            ":is([data-level=\"title\"])": "normal",
            ":is([data-level=\"heading\"])": "normal",
            ":is([data-level=\"subheading\"])": "normal"
        },
        "letterSpacing": {
            "default": null,
            ":is([data-level=\"display\"])": "-0.02em",
            ":is([data-level=\"title\"])": "-0.005em",
            ":is([data-level=\"heading\"])": 0
        },
        "flex": {
            "default": null,
            ":is(.plumb-calendar-head .plumb-heading)": "1"
        },
        "textAlign": {
            "default": null,
            ":is(.plumb-calendar-head .plumb-heading)": "center"
        }
    }
});
