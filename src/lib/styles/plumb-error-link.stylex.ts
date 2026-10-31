import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "backgroundColor": "transparent",
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "padding": 0,
        "color": tokens.errorText,
        "fontWeight": 400,
        "fontSize": "0.875rem",
        "lineHeight": 1.57,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "textAlign": "start"
    }
});
