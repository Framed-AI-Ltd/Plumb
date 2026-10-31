import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "position": "sticky",
    "insetBlockStart": 0,
    "maxBlockSize": "100vh",
    "minBlockSize": "100vh",
    "overflow": "auto",
    "paddingBlock": tokens.space5,
    "paddingInline": tokens.space4,
    "display": "flex",
    "flexDirection": "column",
    "gap": tokens.space2
  }
});
