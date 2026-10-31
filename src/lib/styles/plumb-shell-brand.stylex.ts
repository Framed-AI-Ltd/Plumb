import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "flex",
    "alignItems": "center",
    "gap": tokens.space3,
    "paddingTop": tokens.space2,
    "paddingRight": tokens.space4,
    "paddingBottom": tokens.space3,
    "paddingLeft": tokens.space4,
    "fontFamily": tokens.fontHeading,
    "fontWeight": 700,
    "fontSize": "1.125rem",
    "lineHeight": 1,
    "letterSpacing": "-0.03em",
    "color": tokens.text
  }
});
