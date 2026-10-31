import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "flex",
    "alignItems": "baseline",
    "justifyContent": "space-between",
    "gap": tokens.space4,
    "flexWrap": "wrap"
  }
});
