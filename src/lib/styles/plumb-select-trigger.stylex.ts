import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": tokens.space3,
    "textAlign": "start",
    "cursor": "pointer",
    "paddingInlineStart": tokens.space4,
    "paddingInlineEnd": tokens.space3
  }
});
