import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": "2px",
        "paddingBlockStart": tokens.space2,
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary,
        "marginBlockStart": tokens.space2
    }
});
