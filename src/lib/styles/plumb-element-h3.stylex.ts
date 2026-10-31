import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "margin": {
            "default": null,
            ":is(.plumb-scope-editor-group h3)": 0,
            ":is(.plumb-provider-head h3)": 0,
            ":is(.plumb-event-bar h3)": 0
        },
        "minInlineSize": {
            "default": null,
            ":is(.plumb-event-bar h3)": "12ch"
        },
        "textAlign": {
            "default": null,
            ":is(.plumb-event-bar h3)": "center"
        }
    }
});
