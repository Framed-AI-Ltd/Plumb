import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "fill": tokens.accentSolid,
    "stroke": tokens.bgContainer,
    "strokeWidth": 2,
    "vectorEffect": "non-scaling-stroke",
    "cursor": "pointer"
  }
});
