import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "textAlign": "start",
        "padding": 0,
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "backgroundColor": "transparent",
        "color": {
            "default": null,
            ":is(.plumb-task[data-done] .plumb-task-title)": tokens.textSecondary
        },
        "textDecoration": {
            "default": null,
            ":is(.plumb-task[data-done] .plumb-task-title)": "line-through"
        },
        "textDecorationColor": {
            "default": null,
            ":is(.plumb-task[data-done] .plumb-task-title)": tokens.textTertiary
        }
    }
});
