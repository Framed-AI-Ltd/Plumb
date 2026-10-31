import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "color": tokens.textSecondary,
    "textDecoration": "line-through",
    "textDecorationColor": tokens.textTertiary
  }
});
