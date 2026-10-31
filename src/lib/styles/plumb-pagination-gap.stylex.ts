import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "grid",
    "placeItems": "center",
    "inlineSize": tokens.controlHSm,
    "color": tokens.textTertiary
  }
});
