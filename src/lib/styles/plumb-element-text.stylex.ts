import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontFamily": {
            "default": null,
            ":is(.plumb-plan-room text)": tokens.fontBody
        },
        "fontWeight": {
            "default": null,
            ":is(.plumb-plan-room text)": 600
        },
        "fontSize": {
            "default": null,
            ":is(.plumb-plan-room text)": "0.3px"
        },
        "fill": {
            "default": null,
            ":is(.plumb-plan-room text)": tokens.text
        },
        "pointerEvents": {
            "default": null,
            ":is(.plumb-plan-room text)": "none"
        }
    }
});
