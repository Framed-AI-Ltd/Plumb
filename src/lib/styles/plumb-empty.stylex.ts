import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "textAlign": "center",
        "gap": tokens.space3,
        "paddingBlock": tokens.space9,
        "paddingInline": tokens.space6,
        "borderRadius": tokens.radiusLg,
        "backgroundColor": tokens.fillLayout
    }
});
