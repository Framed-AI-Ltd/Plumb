import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "outline": "none",
    "display": "flex",
    "flexDirection": "column",
    "gap": tokens.space3,
    "color": tokens.onMedia
  }
});
