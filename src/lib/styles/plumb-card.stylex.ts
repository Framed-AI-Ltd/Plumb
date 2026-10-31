import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "backgroundColor": {
            "default": tokens.bgContainer,
            ":is([data-variant=\"subtle\"])": tokens.fillLayout,
            ":is([data-variant=\"tinted\"])": tokens.fillLayout
        },
        "borderRadius": tokens.radiusLg,
        "boxShadow": {
            "default": tokens.shadow1,
            ":is([data-variant=\"subtle\"])": "none",
            ":is([data-variant=\"tinted\"])": "none",
            ":is([data-variant=\"paper\"])": tokens.shadow2
        },
        "padding": {
            "default": null,
            ":is([data-padding=\"md\"])": tokens.space7,
            ":is([data-padding=\"sm\"])": tokens.space5,
            ":is([data-padding=\"none\"])": 0
        },
        "overflow": {
            "default": null,
            ":is([data-padding=\"none\"])": "hidden"
        },
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
