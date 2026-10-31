import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "inlineSize": `calc(7 * ${tokens.space9})`,
    "maxInlineSize": "100%"
  }
});
