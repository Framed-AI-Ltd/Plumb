import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "flex",
    "flexDirection": "column",
    "gap": tokens.space2,
    "alignItems": "flex-start"
  }
});
