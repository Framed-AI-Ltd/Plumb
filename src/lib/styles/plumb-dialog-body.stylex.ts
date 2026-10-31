import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "paddingTop": tokens.space4,
    "paddingRight": tokens.space7,
    "paddingBottom": tokens.space7,
    "paddingLeft": tokens.space7,
    "display": "flex",
    "flexDirection": "column",
    "gap": tokens.space5
  }
});
