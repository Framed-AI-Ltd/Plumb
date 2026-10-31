import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontWeight": 400,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "color": {
            "default": tokens.textSecondary,
            ":is(.plumb-chip[data-selected] .plumb-chip-count)": tokens.accentText
        },
        "fontVariantNumeric": "tabular-nums"
    }
});
