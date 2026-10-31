import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "margin": 0,
    "display": "flex",
    "flexDirection": "column",
    "gap": tokens.space3
  }
});
