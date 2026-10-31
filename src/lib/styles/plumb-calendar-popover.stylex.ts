import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "minInlineSize": 0,
    "maxInlineSize": `calc(100vw - 2 * ${tokens.space3})`
  }
});
