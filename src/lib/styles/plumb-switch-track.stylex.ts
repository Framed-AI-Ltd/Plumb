import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "outline": {
            "default": null,
            ":is(.plumb-check-row[data-focus-visible] .plumb-switch-track)": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "outlineOffset": {
            "default": null,
            ":is(.plumb-check-row[data-focus-visible] .plumb-switch-track)": "2px"
        },
        "flex": "none",
        "inlineSize": {
            "default": "36px",
            "::after": "16px"
        },
        "blockSize": {
            "default": "20px",
            "::after": "16px"
        },
        "marginBlockStart": "1px",
        "borderRadius": {
            "default": tokens.radiusPill,
            "::after": "50%"
        },
        "backgroundColor": {
            "default": tokens.controlBorder,
            "::after": tokens.onMedia,
            ":is(.plumb-check-row[data-selected] .plumb-switch-track)": tokens.accentSolid
        },
        "position": {
            "default": "relative",
            "::after": "absolute"
        },
        "transition": {
            "default": `background ${tokens.durationBase} ${tokens.ease}`,
            "::after": `transform ${tokens.durationBase} ${tokens.ease}`
        },
        "content": {
            "default": null,
            "::after": "\"\""
        },
        "insetBlockStart": {
            "default": null,
            "::after": "2px"
        },
        "insetInlineStart": {
            "default": null,
            "::after": "2px"
        },
        "boxShadow": {
            "default": null,
            "::after": tokens.switchThumbShadow
        },
        "transform": {
            "default": null,
            ":is(.plumb-check-row[data-selected] .plumb-switch-track)::after": "translateX(16px)",
            ":is(:dir(rtl) .plumb-check-row[data-selected] .plumb-switch-track)::after": "translateX(-16px)"
        }
    }
});
