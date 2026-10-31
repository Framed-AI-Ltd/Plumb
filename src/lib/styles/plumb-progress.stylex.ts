import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "grid",
    "gridTemplateColumns": "1fr auto",
    "rowGap": tokens.space3,
    "columnGap": tokens.space4
  }
});
