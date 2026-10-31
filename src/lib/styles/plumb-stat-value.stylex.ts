import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "fontFamily": tokens.fontBody,
    "fontWeight": 600,
    "fontSize": "1.375rem",
    "lineHeight": 1.2,
    "letterSpacing": "-0.015em",
    "fontVariantNumeric": "tabular-nums",
    "color": tokens.text
  }
});
