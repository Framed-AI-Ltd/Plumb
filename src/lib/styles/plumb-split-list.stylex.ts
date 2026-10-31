import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "minInlineSize": 0,
        "display": {
            "default": null,
            ":is(.plumb-split[data-show=\"detail\"] .plumb-split-list)": {
                "default": null,
                "@media (max-width: 960px)": "none"
            }
        },
        "outline": "none"
    }
});
