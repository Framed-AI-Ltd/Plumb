import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "18px",
        "blockSize": "18px",
        "marginBlockStart": "1px",
        "color": {
            "default": tokens.warningIcon,
            ":is(.plumb-open-item[data-kind=\"question\"] .plumb-open-icon)": tokens.accentText
        }
    }
});
