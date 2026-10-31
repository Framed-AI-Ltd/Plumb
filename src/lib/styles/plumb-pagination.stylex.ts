import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": tokens.space2,
    "flexWrap": "wrap"
  }
});
