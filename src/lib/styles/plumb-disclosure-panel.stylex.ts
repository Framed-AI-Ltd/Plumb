import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "overflow": "clip",
    "blockSize": "var(--disclosure-panel-height)",
    "transition": `block-size ${tokens.durationBase} ${tokens.ease}`
  }
});
