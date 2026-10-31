import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "paddingTop": tokens.space7,
    "paddingRight": tokens.space7,
    "paddingBottom": 0,
    "paddingLeft": tokens.space7,
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "gap": tokens.space4
  }
});
