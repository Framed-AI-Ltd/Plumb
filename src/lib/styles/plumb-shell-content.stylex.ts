import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "paddingTop": {
            "default": tokens.space3,
            "@media (max-width: 960px)": tokens.space3
        },
        "paddingRight": {
            "default": tokens.space8,
            "@media (max-width: 960px)": tokens.space5
        },
        "paddingBottom": {
            "default": tokens.space10,
            "@media (max-width: 960px)": tokens.space9
        },
        "paddingLeft": {
            "default": tokens.space8,
            "@media (max-width: 960px)": tokens.space5
        },
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space7,
        "maxInlineSize": "1280px",
        "inlineSize": "100%",
        "outline": {
            "default": null,
            ":is(:focus)": "none"
        }
    }
});
