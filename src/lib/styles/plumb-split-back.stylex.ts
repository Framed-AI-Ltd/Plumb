import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": "none",
            "@media (max-width: 960px)": "block"
        }
    }
});
