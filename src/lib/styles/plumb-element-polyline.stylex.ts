import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fill": {
            "default": null,
            ":is(.plumb-takeoff-shape polyline)": "none"
        },
        "stroke": {
            "default": null,
            ":is(.plumb-takeoff-shape polyline)": tokens.accentSolid
        },
        "strokeWidth": {
            "default": null,
            ":is(.plumb-takeoff-shape polyline)": 3
        },
        "vectorEffect": {
            "default": null,
            ":is(.plumb-takeoff-shape polyline)": "non-scaling-stroke"
        }
    }
});
