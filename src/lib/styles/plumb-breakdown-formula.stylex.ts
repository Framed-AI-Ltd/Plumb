import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "whiteSpace": "nowrap",
    "paddingInlineStart": tokens.space5,
    "justifyContent": "flex-end",
    "fontSize": "12px",
    "lineHeight": "21px",
    "color": tokens.textTertiary,
    "fontVariantNumeric": "tabular-nums"
  }
});
