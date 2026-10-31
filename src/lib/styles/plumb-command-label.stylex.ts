import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": {
            "default": null,
            "@media (max-width: 640px)": "absolute"
        },
        "inlineSize": {
            "default": null,
            "@media (max-width: 640px)": "1px"
        },
        "blockSize": {
            "default": null,
            "@media (max-width: 640px)": "1px"
        },
        "overflow": {
            "default": null,
            "@media (max-width: 640px)": "hidden"
        },
        "clipPath": {
            "default": null,
            "@media (max-width: 640px)": "inset(50%)"
        },
        "whiteSpace": {
            "default": null,
            "@media (max-width: 640px)": "nowrap"
        }
    }
});
