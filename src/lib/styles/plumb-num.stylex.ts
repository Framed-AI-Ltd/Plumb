import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "textAlign": {
            "default": null,
            ":is(.plumb-field-group .plumb-num)": "end"
        },
        "fontVariantNumeric": {
            "default": "tabular-nums",
            ":is(.plumb-field-group .plumb-num)": "tabular-nums"
        },
        "fontFeatureSettings": "\"tnum\""
    }
});
