import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "grid",
    "gridAutoFlow": "column",
    "gridAutoColumns": "minmax(240px, 1fr)",
    "gap": tokens.space4,
    "overflowX": "auto",
    "paddingBlockEnd": tokens.space2,
    "position": "relative"
  }
});
