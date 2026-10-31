import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "flex",
    "gap": tokens.space1,
    "listStyle": "none",
    "margin": 0,
    "padding": 0
  }
});
