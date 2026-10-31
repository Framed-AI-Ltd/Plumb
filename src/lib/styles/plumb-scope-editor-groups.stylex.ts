import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
    "gap": tokens.space6
  }
});
