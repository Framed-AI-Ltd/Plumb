import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "position": "fixed",
    "insetBlockEnd": tokens.space6,
    "insetInlineEnd": tokens.space6,
    "display": "flex",
    "flexDirection": "column-reverse",
    "gap": tokens.space3,
    "zIndex": 200,
    "outline": "none"
  }
});
