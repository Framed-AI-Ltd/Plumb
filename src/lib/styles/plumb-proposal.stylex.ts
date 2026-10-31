import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "gap": tokens.space6,
        "paddingBlock": tokens.space7,
        "paddingInline": tokens.cardInset,
        "backgroundColor": tokens.bgContainer,
        "borderRadius": tokens.radiusLg,
        "boxShadow": tokens.shadow2
    }
});
