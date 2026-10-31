import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": null,
            ":is(.plumb-shell-topbar .plumb-searchfield)": {
                "default": null,
                "@media (max-width: 960px)": "none"
            }
        }
    }
});
