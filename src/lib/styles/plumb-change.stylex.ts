import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space4,
        "padding": tokens.space6,
        "borderRadius": tokens.radiusLg,
        "backgroundColor": tokens.bgContainer,
        "borderWidth": "1px",
        "borderStyle": "dashed",
        "borderColor": tokens.accentBorderHover
    }
});
