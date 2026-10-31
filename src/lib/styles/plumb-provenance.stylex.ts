import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "backgroundColor": "transparent",
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "padding": 0,
        "borderRadius": tokens.radiusPill,
        "cursor": "help"
    }
});
