import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "backgroundColor": {
            "default": tokens.bgContainer,
            ":is([data-plumb-theme=\"dark\"] .plumb-shell-sidebar)": tokens.bgContainer
        },
        "borderInlineEndWidth": "1px",
        "borderInlineEndStyle": "solid",
        "borderInlineEndColor": tokens.borderSecondary,
        "boxShadow": {
            "default": tokens.sidebarShadow,
            ":is([data-plumb-theme=\"dark\"] .plumb-shell-sidebar)": "none"
        },
        "zIndex": 1,
        "display": {
            "default": null,
            ":is(.plumb-shell > .plumb-shell-sidebar)": {
                "default": null,
                "@media (max-width: 960px)": "none"
            }
        }
    }
});
