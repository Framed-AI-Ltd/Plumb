import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "blockSize": {
            "default": null,
            ":is(.plumb-input)": "auto"
        },
        "minBlockSize": {
            "default": null,
            ":is(.plumb-input)": "92px"
        },
        "paddingBlock": {
            "default": null,
            ":is(.plumb-input)": "10px"
        },
        "resize": {
            "default": null,
            ":is(.plumb-input)": "vertical",
            ":is(.plumb-composer textarea.plumb-input)": "none"
        },
        "lineHeight": {
            "default": null,
            ":is(.plumb-input)": 1.57
        }
    }
});
