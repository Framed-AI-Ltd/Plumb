import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "fontFamily": tokens.fontHeading,
    "fontWeight": 600,
    "fontSize": "0.9375rem",
    "lineHeight": 1.3,
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap"
  }
});
