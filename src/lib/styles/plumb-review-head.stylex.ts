import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "flex",
    "flexWrap": "wrap",
    "alignItems": "center",
    "gap": tokens.space3
  }
});
