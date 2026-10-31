import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": {
            "default": "wrap",
            ":is(.plumb-cell .plumb-inline:has(> .plumb-icon-tile))": "nowrap",
            ":is(.plumb-shell-topbar > .plumb-inline)": "nowrap"
        },
        "alignItems": {
            "default": "center",
            ":is(.plumb-cell .plumb-inline:has(> .plumb-icon-tile))": "flex-start"
        },
        "flex": {
            "default": null,
            ":is(.plumb-shell-topbar > .plumb-inline)": "none"
        }
    }
});
