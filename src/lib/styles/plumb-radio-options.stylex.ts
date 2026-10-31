import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "flex",
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-radio-options)": "grid"
        },
        "flexDirection": {
            "default": "column",
            ":is([data-orientation=\"row\"])": "row"
        },
        "gap": {
            "default": tokens.space3,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-radio-options)": tokens.space4
        },
        "gridTemplateColumns": {
            "default": null,
            ":is(.plumb-radio-group[data-variant=\"cards\"] .plumb-radio-options)": "repeat(auto-fit, minmax(200px, 1fr))"
        },
        "flexWrap": {
            "default": null,
            ":is([data-orientation=\"row\"])": "wrap"
        },
        "columnGap": {
            "default": null,
            ":is([data-orientation=\"row\"])": tokens.space6
        }
    }
});
