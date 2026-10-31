import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "padding": tokens.space2,
    "outline": "none",
    "display": "flex",
    "flexDirection": "column",
    "gap": "2px"
  }
});
