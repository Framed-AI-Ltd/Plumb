import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "listStyle": "none",
    "margin": 0,
    "padding": 0,
    "display": "flex",
    "flexDirection": "column",
    "gap": tokens.space3
  }
});
