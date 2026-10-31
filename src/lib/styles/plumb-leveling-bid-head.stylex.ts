import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "flex-start",
    "gap": tokens.space2
  }
});
