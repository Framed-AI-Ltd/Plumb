import { cx } from "../cx";
import { flexStyle } from "./helpers";
import type { FlexProps } from "./types";

/** Horizontal, wrapping row with a spacing-scale gap. */
export function Inline({ gap = 3, align = "center", justify, as: As = "div", className, style, ...props }: FlexProps) {
  return <As {...props} className={cx("plumb-inline", className)} style={flexStyle({ gap, align, justify }, style)} />;
}
