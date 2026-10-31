import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "maxInlineSize": "78%",
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space2,
        "paddingBlock": tokens.space4,
        "paddingInline": tokens.space5,
        "borderRadius": tokens.radiusLg,
        "backgroundColor": {
            "default": tokens.fillLayout,
            ":is(.plumb-msg[data-from=\"person\"] .plumb-msg-bubble)": tokens.fillSecondary
        },
        "boxShadow": {
            "default": null,
            ":is(.plumb-msg[data-from=\"person\"] .plumb-msg-bubble)": "none"
        }
    }
});
