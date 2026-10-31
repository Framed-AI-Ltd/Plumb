import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "minBlockSize": tokens.controlHSm,
    "display": "flex",
    "alignItems": "center"
  }
});
