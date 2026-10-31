import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": {
            "default": null,
            ":is(.plumb-proposal-taxes > div)": "flex",
            ":is(.plumb-leveling-bid-items > div)": "flex"
        },
        "justifyContent": {
            "default": null,
            ":is(.plumb-proposal-taxes > div)": "space-between"
        },
        "flexDirection": {
            "default": null,
            ":is(.plumb-leveling-bid-items > div)": "column"
        },
        "gap": {
            "default": null,
            ":is(.plumb-leveling-bid-items > div)": tokens.space2
        },
        "paddingBlock": {
            "default": null,
            ":is(.plumb-leveling-bid-items > div)": tokens.space4
        },
        "borderBlockStartWidth": {
            "default": null,
            ":is(.plumb-leveling-bid-items > div)": "1px"
        },
        "borderBlockStartStyle": {
            "default": null,
            ":is(.plumb-leveling-bid-items > div)": "solid"
        },
        "borderBlockStartColor": {
            "default": null,
            ":is(.plumb-leveling-bid-items > div)": tokens.borderSecondary
        }
    }
});
