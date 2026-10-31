import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "flex",
    "alignItems": "center",
    "gap": tokens.space3,
    "paddingBlockEnd": "6px"
  }
});
