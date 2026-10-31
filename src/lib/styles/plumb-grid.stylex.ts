import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gap": {
            "default": tokens.space7,
            ":is([data-layout=\"stats\"])": tokens.space5
        },
        "alignItems": {
            "default": "start",
            ":is([data-layout=\"stats\"])": "stretch"
        },
        "gridTemplateColumns": {
            "default": null,
            ":is([data-layout=\"rail\"])": {
                "default": "minmax(0, 1fr) 360px",
                "@media (max-width: 960px)": "minmax(0, 1fr)"
            },
            ":is([data-layout=\"sidebar\"])": {
                "default": "260px minmax(0, 1fr)",
                "@media (max-width: 960px)": "minmax(0, 1fr)"
            },
            ":is([data-layout=\"stats\"])": {
                "default": "repeat(4, minmax(0, 1fr))",
                "@media (max-width: 960px)": "repeat(2, minmax(0, 1fr))",
                "@media (max-width: 520px)": "minmax(0, 1fr)"
            },
            ":is([data-layout=\"2\"])": {
                "default": "repeat(2, minmax(0, 1fr))",
                "@media (max-width: 960px)": "minmax(0, 1fr)"
            },
            ":is([data-layout=\"3\"])": {
                "default": "repeat(3, minmax(0, 1fr))",
                "@media (max-width: 960px)": "minmax(0, 1fr)"
            },
            ":is([data-layout=\"cards\"])": "repeat(auto-fill, minmax(min(280px, 100%), 1fr))"
        }
    }
});
