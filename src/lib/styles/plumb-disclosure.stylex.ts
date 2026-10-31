import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "borderBlockStartWidth": {
            "default": null,
            ":is(.plumb-accordion .plumb-disclosure + .plumb-disclosure)": "1px"
        },
        "borderBlockStartStyle": {
            "default": null,
            ":is(.plumb-accordion .plumb-disclosure + .plumb-disclosure)": "solid"
        },
        "borderBlockStartColor": {
            "default": null,
            ":is(.plumb-accordion .plumb-disclosure + .plumb-disclosure)": tokens.borderSecondary
        }
    }
});
