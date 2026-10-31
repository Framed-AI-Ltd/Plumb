import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "borderRadius": tokens.radiusLg,
        "backgroundColor": tokens.bgContainer,
        "padding": tokens.space6,
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space4,
        "borderWidth": "1px",
        "borderStyle": "dashed",
        "borderColor": tokens.accentBorderHover
    }
});
