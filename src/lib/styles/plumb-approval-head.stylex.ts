import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "grid",
    "gridTemplateColumns": "auto 1fr auto",
    "gap": tokens.space4,
    "alignItems": "start"
  }
});
