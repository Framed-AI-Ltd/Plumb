import { cx } from "../cx";
import { flexStyle } from "./helpers";
import type { FlexProps } from "./types";

/** Vertical flow with a spacing-scale gap. */
export function Stack({ gap = 4, align, justify, as: As = "div", className, style, ...props }: FlexProps) {
  return <As {...props} className={cx("plumb-stack", className)} style={flexStyle({ gap, align, justify }, style)} />;
}
