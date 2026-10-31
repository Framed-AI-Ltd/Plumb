import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space3,
        "minInlineSize": "200px",
        "opacity": {
            "default": null,
            ":is([data-disabled])": 0.5
        }
    }
});
