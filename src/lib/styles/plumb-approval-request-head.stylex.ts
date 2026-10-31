import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "flex-start",
    "gap": tokens.space4
  }
});
