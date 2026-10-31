import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] thead)": {
                "default": null,
                "@media (max-width: 640px)": "absolute"
            }
        },
        "inlineSize": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] thead)": {
                "default": null,
                "@media (max-width: 640px)": "1px"
            }
        },
        "blockSize": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] thead)": {
                "default": null,
                "@media (max-width: 640px)": "1px"
            }
        },
        "overflow": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] thead)": {
                "default": null,
                "@media (max-width: 640px)": "hidden"
            }
        },
        "clipPath": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] thead)": {
                "default": null,
                "@media (max-width: 640px)": "inset(50%)"
            }
        }
    }
});
