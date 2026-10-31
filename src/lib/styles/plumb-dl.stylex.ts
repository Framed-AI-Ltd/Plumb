import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "rowGap": tokens.space5,
        "columnGap": tokens.space7,
        "margin": 0,
        "gridTemplateColumns": {
            "default": null,
            ":is([data-columns=\"2\"])": {
                "default": "repeat(2, minmax(0, 1fr))",
                "@media (max-width: 960px)": "1fr"
            },
            ":is([data-columns=\"3\"])": {
                "default": "repeat(3, minmax(0, 1fr))",
                "@media (max-width: 960px)": "1fr"
            }
        }
    }
});
