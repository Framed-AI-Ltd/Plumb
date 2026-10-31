import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": {
            "default": "28px",
            ":is(.plumb-timeline-dot:empty)::after": "8px"
        },
        "blockSize": {
            "default": "28px",
            ":is(.plumb-timeline-dot:empty)::after": "8px"
        },
        "borderRadius": {
            "default": "50%",
            ":is(.plumb-timeline-dot:empty)::after": "50%"
        },
        "display": "grid",
        "placeItems": "center",
        "backgroundColor": {
            "default": tokens.fillSecondary,
            ":is(.plumb-timeline-item[data-tone=\"accent\"] .plumb-timeline-dot)": tokens.accentBg,
            ":is(.plumb-timeline-item[data-tone=\"success\"] .plumb-timeline-dot)": tokens.successBg,
            ":is(.plumb-timeline-item[data-tone=\"warning\"] .plumb-timeline-dot)": tokens.warningBg,
            ":is(.plumb-timeline-item[data-tone=\"danger\"] .plumb-timeline-dot)": tokens.errorBg,
            ":is(.plumb-timeline-dot:empty)::after": "currentColor"
        },
        "color": {
            "default": tokens.textSecondary,
            ":is(.plumb-timeline-item[data-tone=\"accent\"] .plumb-timeline-dot)": tokens.accentText,
            ":is(.plumb-timeline-item[data-tone=\"success\"] .plumb-timeline-dot)": tokens.successText,
            ":is(.plumb-timeline-item[data-tone=\"warning\"] .plumb-timeline-dot)": tokens.warningText,
            ":is(.plumb-timeline-item[data-tone=\"danger\"] .plumb-timeline-dot)": tokens.errorText
        },
        "content": {
            "default": null,
            ":is(.plumb-timeline-dot:empty)::after": "\"\""
        }
    }
});
