import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "paddingBlockStart": tokens.space3,
        "borderBlockStartWidth": "1px",
        "borderBlockStartStyle": "solid",
        "borderBlockStartColor": tokens.borderSecondary
    }
});
