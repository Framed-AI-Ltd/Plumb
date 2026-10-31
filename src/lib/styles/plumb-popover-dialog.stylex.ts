import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "outline": "none",
    "padding": tokens.space5,
    "display": "flex",
    "flexDirection": "column",
    "gap": tokens.space3,
    "maxInlineSize": "360px"
  }
});
