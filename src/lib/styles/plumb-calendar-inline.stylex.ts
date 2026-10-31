import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-block",
        "padding": tokens.space5,
        "backgroundColor": tokens.bgContainer,
        "borderRadius": tokens.radiusLg,
        "boxShadow": tokens.shadow1,
        "inlineSize": `calc(7 * ${tokens.space9} + 2 * ${tokens.space5})`,
        "maxInlineSize": "100%"
    }
});
