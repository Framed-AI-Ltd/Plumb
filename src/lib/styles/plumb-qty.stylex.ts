import * as stylex from "@stylexjs/stylex";



export const styles = stylex.create({
  "root": {
    "display": "inline-grid",
    "gridTemplateColumns": "minmax(4ch, auto) 3.2ch",
    "columnGap": "0.3em",
    "justifyContent": "end",
    "fontVariantNumeric": "tabular-nums"
  }
});
