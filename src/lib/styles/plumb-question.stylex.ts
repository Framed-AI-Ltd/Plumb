import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space3,
        "padding": tokens.space5,
        "borderRadius": tokens.radiusLg,
        "backgroundColor": tokens.bgContainer,
        "boxShadow": {
            "default": tokens.shadow1,
            ":is([data-status=\"draft\"])": "none"
        },
        "borderWidth": {
            "default": null,
            ":is([data-status=\"draft\"])": "1px"
        },
        "borderStyle": {
            "default": null,
            ":is([data-status=\"draft\"])": "dashed"
        },
        "borderColor": {
            "default": null,
            ":is([data-status=\"draft\"])": tokens.accentBorderHover
        }
    }
});
