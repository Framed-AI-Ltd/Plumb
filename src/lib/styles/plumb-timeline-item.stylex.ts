import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": {
            "default": "relative",
            ":is(.plumb-timeline-item:not(:last-child))::before": "absolute"
        },
        "display": "grid",
        "gridTemplateColumns": "28px 1fr",
        "gap": tokens.space4,
        "paddingBlockEnd": tokens.space6,
        "content": {
            "default": null,
            ":is(.plumb-timeline-item:not(:last-child))::before": "\"\""
        },
        "insetInlineStart": {
            "default": null,
            ":is(.plumb-timeline-item:not(:last-child))::before": "13.5px"
        },
        "insetBlock": {
            "default": null,
            ":is(.plumb-timeline-item:not(:last-child))::before": "30px 2px"
        },
        "inlineSize": {
            "default": null,
            ":is(.plumb-timeline-item:not(:last-child))::before": "1px"
        },
        "backgroundColor": {
            "default": null,
            ":is(.plumb-timeline-item:not(:last-child))::before": tokens.border
        }
    }
});
