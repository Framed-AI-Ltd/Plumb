import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "absolute",
        "insetBlockStart": tokens.space2,
        "insetInlineStart": tokens.space2,
        "padding": "4px",
        "borderRadius": tokens.radiusSm,
        "backgroundColor": `color-mix(in srgb, ${tokens.bgContainer} 85%, transparent)`,
        "boxShadow": tokens.shadow1
    }
});
