import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "fontWeight": 500,
        "fontSize": "0.8125rem",
        "lineHeight": 1.45,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "textAlign": "start",
        "padding": 0,
        "borderWidth": 0,
        "borderStyle": "none",
        "borderColor": "currentColor",
        "backgroundColor": "transparent",
        "color": tokens.text,
        "cursor": "pointer",
        "borderRadius": "2px"
    }
});
