import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "backgroundColor": {
            "default": null,
            ":is(button.plumb-link)": "transparent"
        },
        "borderWidth": {
            "default": null,
            ":is(button.plumb-link)": 0
        },
        "borderStyle": {
            "default": null,
            ":is(button.plumb-link)": "none"
        },
        "borderColor": {
            "default": null,
            ":is(button.plumb-link)": "currentColor"
        },
        "padding": {
            "default": null,
            ":is(button.plumb-link)": 0
        },
        "fontWeight": {
            "default": null,
            ":is(button.plumb-link)": "inherit"
        },
        "fontSize": {
            "default": null,
            ":is(button.plumb-link)": "inherit"
        },
        "lineHeight": {
            "default": null,
            ":is(button.plumb-link)": "inherit"
        },
        "fontFamily": {
            "default": null,
            ":is(button.plumb-link)": "inherit"
        },
        "fontStyle": {
            "default": null,
            ":is(button.plumb-link)": "inherit"
        },
        "textAlign": {
            "default": null,
            ":is(button.plumb-link)": "start"
        }
    }
});
