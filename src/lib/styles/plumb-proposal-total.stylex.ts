import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "justifyContent": "space-between",
        "alignItems": "baseline",
        "gap": tokens.space5,
        "paddingBlockStart": tokens.space4,
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.border,
        "fontWeight": 600,
        "fontSize": "0.8125rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "textDecoration": {
            "default": null,
            ":is(.plumb-invoice[data-status=\"void\"] .plumb-proposal-total)": "line-through"
        },
        "color": {
            "default": null,
            ":is(.plumb-invoice[data-status=\"void\"] .plumb-proposal-total)": tokens.textSecondary
        }
    }
});
