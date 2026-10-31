import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "placeItems": "center",
        "inlineSize": "100%",
        "maxInlineSize": tokens.space9,
        "aspectRatio": 1,
        "borderRadius": tokens.radiusPill,
        "backgroundColor": {
            "default": null,
            ":is(.plumb-calendar-cell[data-hovered]:not([data-disabled], [data-unavailable], [data-selected]) .plumb-calendar-day)": tokens.fillSecondary,
            ":is(.plumb-calendar-cell[data-selected] .plumb-calendar-day)": {
                "default": tokens.accentSolid,
                "@media (forced-colors: active)": "Highlight"
            },
            ":is(.plumb-range-calendar .plumb-calendar-cell[data-selected] .plumb-calendar-day)": "transparent",
            ":is(.plumb-range-calendar .plumb-calendar-cell:is([data-selection-start], [data-selection-end]) .plumb-calendar-day)": {
                "default": tokens.accentSolid,
                "@media (forced-colors: active)": "Highlight"
            }
        },
        "textDecoration": {
            "default": null,
            ":is(.plumb-calendar-cell[data-today] .plumb-calendar-day)": "underline"
        },
        "textUnderlineOffset": {
            "default": null,
            ":is(.plumb-calendar-cell[data-today] .plumb-calendar-day)": tokens.space2
        },
        "fontWeight": {
            "default": null,
            ":is(.plumb-calendar-cell[data-today] .plumb-calendar-day)": 600,
            ":is(.plumb-calendar-cell[data-selected] .plumb-calendar-day)": 600,
            ":is(.plumb-range-calendar .plumb-calendar-cell[data-selected] .plumb-calendar-day)": 500,
            ":is(.plumb-range-calendar .plumb-calendar-cell:is([data-selection-start], [data-selection-end]) .plumb-calendar-day)": 600
        },
        "color": {
            "default": null,
            ":is(.plumb-calendar-cell[data-selected] .plumb-calendar-day)": {
                "default": tokens.onAccent,
                "@media (forced-colors: active)": "HighlightText"
            },
            ":is(.plumb-range-calendar .plumb-calendar-cell[data-selected] .plumb-calendar-day)": "inherit",
            ":is(.plumb-range-calendar .plumb-calendar-cell:is([data-selection-start], [data-selection-end]) .plumb-calendar-day)": {
                "default": tokens.onAccent,
                "@media (forced-colors: active)": "HighlightText"
            }
        },
        "outline": {
            "default": null,
            ":is(.plumb-calendar-cell[data-focus-visible] .plumb-calendar-day)": `${tokens.focusWidth} solid ${tokens.focusRing}`
        },
        "outlineOffset": {
            "default": null,
            ":is(.plumb-calendar-cell[data-focus-visible] .plumb-calendar-day)": "-3px"
        },
        "outlineColor": {
            "default": null,
            ":is(.plumb-calendar:not(.plumb-range-calendar) .plumb-calendar-cell[data-selected][data-focus-visible] .plumb-calendar-day)": {
                "default": tokens.onAccent,
                "@media (forced-colors: active)": "HighlightText"
            },
            ":is(.plumb-range-calendar .plumb-calendar-cell:is([data-selection-start], [data-selection-end])[data-focus-visible] .plumb-calendar-day)": {
                "default": tokens.onAccent,
                "@media (forced-colors: active)": "HighlightText"
            }
        },
        "forcedColorAdjust": {
            "default": null,
            ":is(.plumb-calendar-cell[data-selected] .plumb-calendar-day)": {
                "default": null,
                "@media (forced-colors: active)": "none"
            }
        }
    }
});
