import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "paddingTop": 0,
    "paddingRight": tokens.space5,
    "paddingBottom": tokens.space5,
    "paddingLeft": `calc(${tokens.space5} + 24px)`
  }
});
