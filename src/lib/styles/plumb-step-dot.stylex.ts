import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "26px",
        "blockSize": "26px",
        "borderRadius": "50%",
        "display": "grid",
        "placeItems": "center",
        "flex": "none",
        "backgroundColor": {
            "default": tokens.fillSecondary,
            ":is(.plumb-step-item[data-state=\"current\"] .plumb-step-dot)": tokens.accentSolid,
            ":is(.plumb-step-item[data-state=\"done\"] .plumb-step-dot)": tokens.accentBg
        },
        "color": {
            "default": tokens.textSecondary,
            ":is(.plumb-step-item[data-state=\"current\"] .plumb-step-dot)": tokens.onAccent,
            ":is(.plumb-step-item[data-state=\"done\"] .plumb-step-dot)": tokens.accentText
        },
        "fontWeight": 600,
        "fontSize": "0.75rem",
        "lineHeight": 1.5,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal"
    }
});
