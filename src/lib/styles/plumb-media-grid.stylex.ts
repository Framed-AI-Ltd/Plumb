import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fill, minmax(150px, 1fr))",
    "gap": tokens.space3,
    "outline": "none"
  }
});
