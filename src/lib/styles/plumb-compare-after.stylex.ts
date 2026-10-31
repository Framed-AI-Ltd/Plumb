import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "inset": 0,
        "clipPath": {
            "default": "inset(0 0 0 var(--pos))",
            ":is([dir=\"rtl\"] .plumb-compare-after)": "inset(0 var(--pos) 0 0)"
        }
    }
});
