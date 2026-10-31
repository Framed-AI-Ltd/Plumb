import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "18px",
        "blockSize": "18px",
        "marginBlockStart": "2px",
        "color": {
            "default": tokens.infoIcon,
            ":is(.plumb-toast[data-tone=\"success\"] .plumb-toast-icon)": tokens.successIcon,
            ":is(.plumb-toast[data-tone=\"danger\"] .plumb-toast-icon)": tokens.errorIcon
        },
        "flex": "none"
    }
});
