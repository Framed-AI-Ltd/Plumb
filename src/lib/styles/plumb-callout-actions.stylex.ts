import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "gridColumn": 2,
    "display": "flex",
    "gap": tokens.space3,
    "marginBlockStart": tokens.space3
  }
});
