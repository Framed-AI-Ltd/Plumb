import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "listStyle": "none",
    "margin": 0,
    "padding": 0,
    "display": "flex",
    "gap": tokens.space2,
    "flexWrap": "wrap"
  }
});
