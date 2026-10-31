import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "inline-flex",
    "alignItems": "center",
    "gap": "4px",
    "color": tokens.warningText
  }
});
