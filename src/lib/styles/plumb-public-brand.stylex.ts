import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "flex",
    "alignItems": "center",
    "gap": tokens.space3,
    "fontFamily": tokens.fontHeading,
    "fontWeight": 700,
    "fontSize": "1.125rem",
    "lineHeight": 1,
    "letterSpacing": "-0.03em"
  }
});
