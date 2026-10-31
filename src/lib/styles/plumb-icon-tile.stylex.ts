import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-grid",
        "placeItems": "center",
        "flex": "none",
        "backgroundColor": "var(--c-bg)",
        "color": "var(--c-icon)",
        "inlineSize": {
            "default": null,
            ":is([data-size=\"sm\"])": "28px",
            ":is([data-size=\"md\"])": "36px",
            ":is([data-size=\"lg\"])": "48px"
        },
        "blockSize": {
            "default": null,
            ":is([data-size=\"sm\"])": "28px",
            ":is([data-size=\"md\"])": "36px",
            ":is([data-size=\"lg\"])": "48px"
        },
        "borderRadius": {
            "default": null,
            ":is([data-size=\"sm\"])": tokens.radiusSm,
            ":is([data-size=\"md\"])": tokens.radiusMd,
            ":is([data-size=\"lg\"])": tokens.radiusLg
        },
        "marginBlockEnd": {
            "default": null,
            ":is(.plumb-empty .plumb-icon-tile)": tokens.space2
        },
        "marginBlock": {
            "default": null,
            ":is(.plumb-cell .plumb-icon-tile[data-size=\"sm\"])": "-4px"
        }
    }
});
