import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontWeight": {
            "default": null,
            ":is([data-variant=\"body\"])": 400,
            ":is([data-variant=\"label\"])": 500,
            ":is([data-variant=\"caption\"])": 400,
            ":is([data-variant=\"overline\"])": 500
        },
        "fontSize": {
            "default": null,
            ":is([data-variant=\"body\"])": "0.875rem",
            ":is([data-variant=\"label\"])": "0.8125rem",
            ":is([data-variant=\"caption\"])": "0.75rem",
            ":is([data-variant=\"overline\"])": "0.6875rem"
        },
        "lineHeight": {
            "default": null,
            ":is([data-variant=\"body\"])": 1.57,
            ":is([data-variant=\"label\"])": 1.45,
            ":is([data-variant=\"caption\"])": 1.5,
            ":is([data-variant=\"overline\"])": 1.45
        },
        "fontFamily": {
            "default": null,
            ":is([data-variant=\"body\"])": tokens.fontBody,
            ":is([data-variant=\"label\"])": tokens.fontBody,
            ":is([data-variant=\"caption\"])": tokens.fontBody,
            ":is([data-variant=\"overline\"])": tokens.fontBody
        },
        "fontStyle": {
            "default": null,
            ":is([data-variant=\"body\"])": "normal",
            ":is([data-variant=\"label\"])": "normal",
            ":is([data-variant=\"caption\"])": "normal",
            ":is([data-variant=\"overline\"])": "normal"
        },
        "letterSpacing": {
            "default": null,
            ":is([data-variant=\"overline\"])": "0.02em"
        },
        "color": {
            "default": null,
            ":is([data-tone=\"muted\"])": tokens.textSecondary,
            ":is([data-tone=\"accent\"])": tokens.accentText,
            ":is([data-tone=\"danger\"])": tokens.errorText,
            ":is([data-tone=\"success\"])": tokens.successText,
            ":is([data-tone=\"warning\"])": tokens.warningText
        },
        "display": {
            "default": null,
            ":is(.plumb-schedule-row:not(:has(.plumb-schedule-edit)) > .plumb-text)": {
                "default": null,
                "@media (max-width: 640px)": "none"
            }
        }
    }
});
