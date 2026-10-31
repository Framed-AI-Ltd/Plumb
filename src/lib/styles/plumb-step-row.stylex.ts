import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "grid",
    "gridTemplateColumns": "18px minmax(0, 1fr) auto",
    "gap": tokens.space3,
    "alignItems": "start"
  }
});
