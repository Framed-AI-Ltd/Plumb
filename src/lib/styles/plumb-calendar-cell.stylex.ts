import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "100%",
        "blockSize": tokens.space9,
        "display": "grid",
        "placeItems": "center",
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "fontVariantNumeric": "tabular-nums",
        "cursor": {
            "default": "pointer",
            ":is([data-disabled])": "default",
            ":is([data-unavailable])": "default"
        },
        "outline": "none",
        "visibility": {
            "default": null,
            ":is([data-outside-month])": "hidden"
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-range-calendar .plumb-calendar-cell[data-selected])": {
                "default": tokens.accentBg,
                "@media (forced-colors: active)": "Canvas"
            }
        },
        "color": {
            "default": null,
            ":is(.plumb-range-calendar .plumb-calendar-cell[data-selected])": {
                "default": tokens.accentText,
                "@media (forced-colors: active)": "CanvasText"
            },
            ":is([data-disabled])": tokens.textDisabled,
            ":is([data-unavailable])": tokens.textSecondary
        },
        "borderStartStartRadius": {
            "default": null,
            ":is(.plumb-range-calendar .plumb-calendar-cell[data-selection-start])": tokens.radiusPill
        },
        "borderEndStartRadius": {
            "default": null,
            ":is(.plumb-range-calendar .plumb-calendar-cell[data-selection-start])": tokens.radiusPill
        },
        "borderStartEndRadius": {
            "default": null,
            ":is(.plumb-range-calendar .plumb-calendar-cell[data-selection-end])": tokens.radiusPill
        },
        "borderEndEndRadius": {
            "default": null,
            ":is(.plumb-range-calendar .plumb-calendar-cell[data-selection-end])": tokens.radiusPill
        },
        "textDecoration": {
            "default": null,
            ":is([data-unavailable])": "line-through"
        },
        "borderBlockStyle": { "default": null, ":is(.plumb-range-calendar .plumb-calendar-cell[data-selected])": { "default": null, "@media (prefers-contrast: more)": "solid", "@media (forced-colors: active)": "solid" } },
        "borderBlockColor": { "default": null, ":is(.plumb-range-calendar .plumb-calendar-cell[data-selected])": { "default": null, "@media (prefers-contrast: more)": tokens.accentText, "@media (forced-colors: active)": "Highlight" } },
        "borderBlockWidth": {
            "default": null,
            ":is(.plumb-range-calendar .plumb-calendar-cell[data-selected])": {
                "default": null,
                "@media (prefers-contrast: more)": "1px",
                "@media (forced-colors: active)": "1px"
            }
        }
    }
});
