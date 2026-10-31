import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "relative",
        "borderRadius": tokens.radiusMd,
        "backgroundColor": {
            "default": null,
            ":is([data-current])": tokens.accentBg
        }
    }
});
