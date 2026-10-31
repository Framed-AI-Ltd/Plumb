import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": {
            "default": "6px",
            ":is(.plumb-cell .plumb-field)": 0
        },
        "minInlineSize": {
            "default": 0,
            ":is(.plumb-revision-picker .plumb-field)": "200px"
        },
        "--control-h": {
            "default": null,
            ":is([data-size=\"sm\"])": tokens.controlHSm,
            ":is([data-size=\"lg\"])": tokens.controlHLg
        },
        "maxInlineSize": {
            "default": null,
            ":is(.plumb-cell .plumb-field)": "176px"
        },
        "inlineSize": {
            "default": null,
            ":is(.plumb-cell .plumb-field[data-variant=\"inline\"])": "15ch"
        },
        "marginInlineStart": {
            "default": null,
            ":is(.plumb-cell .plumb-field[data-variant=\"inline\"])": "auto"
        },
        "marginBlock": {
            "default": null,
            ":is(.plumb-cell .plumb-field[data-variant=\"inline\"])": `calc((21px - ${tokens.controlH}) / 2)`
        }
    }
});
