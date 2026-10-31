import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "24px minmax(0, 1fr) auto 14ch auto",
            "@media (max-width: 640px)": "24px minmax(0, 1fr) auto",
            ":is(:not(:has(.plumb-schedule-edit)))": {
                "default": null,
                "@media (max-width: 640px)": "24px minmax(0, 1fr) auto"
            },
            ":is(.plumb-schedule-list[data-editing] .plumb-schedule-row)": {
                "default": "24px minmax(0, 2fr) auto minmax(0, 1fr) minmax(0, 1.4fr) 12ch auto",
                "@media (max-width: 640px)": "24px 1fr 1fr"
            },
            ":is(:has(.plumb-schedule-edit))": "24px minmax(0, 1fr) 12ch auto"
        },
        "alignItems": {
            "default": "center",
            ":is(:has(.plumb-schedule-edit))": "end",
            ":is(.plumb-schedule-list[data-editing] .plumb-schedule-row)": "center"
        },
        "gap": tokens.space4,
        "paddingBlock": tokens.space3,
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary
    }
});
