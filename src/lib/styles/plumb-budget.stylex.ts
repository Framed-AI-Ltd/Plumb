import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "overflowX": {
            "default": null,
            "@media (max-width: 640px)": "auto"
        },
        "position": "relative"
    }
});
