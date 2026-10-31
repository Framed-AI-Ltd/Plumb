import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "gridColumn": {
            "default": null,
            ":is(.plumb-page-header > .plumb-page-eyebrow)": "1 / -1"
        }
    }
});
