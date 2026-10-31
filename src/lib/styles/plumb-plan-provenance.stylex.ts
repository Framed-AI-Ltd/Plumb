import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "position": "absolute",
    "insetBlockStart": tokens.space3,
    "insetInlineEnd": tokens.space3
  }
});
