import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] tbody)": {
                "default": null,
                "@media (max-width: 640px)": "block"
            }
        }
    }
});
