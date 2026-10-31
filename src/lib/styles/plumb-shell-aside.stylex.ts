import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": "sticky",
        "insetBlockStart": 0,
        "blockSize": "100vh",
        "display": "flex",
        "flexDirection": "column",
        "backgroundColor": tokens.bgContainer,
        "borderInlineStartWidth": "1px",
        "borderInlineStartStyle": "solid",
        "borderInlineStartColor": tokens.borderSecondary
    }
});
