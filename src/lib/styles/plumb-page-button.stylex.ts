import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "minInlineSize": tokens.controlHSm,
    "paddingInline": tokens.space2,
    "fontVariantNumeric": "tabular-nums"
  }
});
