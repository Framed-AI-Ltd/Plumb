import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "grid",
    "gridTemplateColumns": "repeat(3, 1fr)",
    "gap": tokens.space2
  }
});
