import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "listStyle": {
            "default": null,
            ":is(.plumb-share-group ul)": "none"
        },
        "margin": {
            "default": null,
            ":is(.plumb-share-group ul)": 0,
            ":is(.plumb-scope-list ul)": 0,
            ":is(.plumb-proposal-exclusions ul)": 0,
            ":is(.plumb-error-summary ul)": 0,
            ":is(.plumb-import-issues ul)": 0,
            ":is(.plumb-import-conversions ul)": 0
        },
        "marginTop": {
            "default": null,
            ":is(.plumb-proposal-blockers ul)": tokens.space2
        },
        "marginRight": {
            "default": null,
            ":is(.plumb-proposal-blockers ul)": 0
        },
        "marginBottom": {
            "default": null,
            ":is(.plumb-proposal-blockers ul)": 0
        },
        "marginLeft": {
            "default": null,
            ":is(.plumb-proposal-blockers ul)": 0
        },
        "padding": {
            "default": null,
            ":is(.plumb-share-group ul)": 0
        },
        "display": {
            "default": null,
            ":is(.plumb-share-group ul)": "flex",
            ":is(.plumb-scope-list ul)": "flex",
            ":is(.plumb-error-summary ul)": "flex"
        },
        "flexDirection": {
            "default": null,
            ":is(.plumb-share-group ul)": "column",
            ":is(.plumb-scope-list ul)": "column",
            ":is(.plumb-error-summary ul)": "column"
        },
        "paddingInlineStart": {
            "default": null,
            ":is(.plumb-scope-list ul)": "18px",
            ":is(.plumb-proposal-blockers ul)": "18px",
            ":is(.plumb-proposal-exclusions ul)": "18px",
            ":is(.plumb-error-summary ul)": "18px",
            ":is(.plumb-import-issues ul)": "18px",
            ":is(.plumb-import-conversions ul)": tokens.space6
        },
        "fontWeight": {
            "default": null,
            ":is(.plumb-scope-list ul)": 400,
            ":is(.plumb-proposal-blockers ul)": 400
        },
        "fontSize": {
            "default": null,
            ":is(.plumb-scope-list ul)": "0.875rem",
            ":is(.plumb-proposal-blockers ul)": "0.75rem"
        },
        "lineHeight": {
            "default": null,
            ":is(.plumb-scope-list ul)": 1.57,
            ":is(.plumb-proposal-blockers ul)": 1.5
        },
        "fontFamily": {
            "default": null,
            ":is(.plumb-scope-list ul)": tokens.fontBody,
            ":is(.plumb-proposal-blockers ul)": tokens.fontBody
        },
        "fontStyle": {
            "default": null,
            ":is(.plumb-scope-list ul)": "normal",
            ":is(.plumb-proposal-blockers ul)": "normal"
        },
        "gap": {
            "default": null,
            ":is(.plumb-scope-list ul)": tokens.space2,
            ":is(.plumb-error-summary ul)": tokens.space2
        },
        "color": {
            "default": null,
            ":is(.plumb-proposal-blockers ul)": tokens.textSecondary
        }
    }
});
