import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space2,
        "padding": tokens.space6,
        "borderRadius": tokens.radiusLg,
        "backgroundColor": tokens.bgContainer,
        "boxShadow": tokens.shadow1,
        "outline": {
            "default": null,
            "@media (prefers-contrast: more)": `1px solid ${tokens.controlBorder}`
        },
        "borderWidth": {
            "default": null,
            "@media (forced-colors: active)": "1px"
        },
        "borderStyle": {
            "default": null,
            "@media (forced-colors: active)": "solid"
        },
        "borderColor": {
            "default": null,
            "@media (forced-colors: active)": "CanvasText"
        }
    }
});
