import { type CSSProperties } from "react";
import type { Align,FlexProps } from "./types";

export const flexAlign = (a?: Align) =>
  a === "start" ? "flex-start" : a === "end" ? "flex-end" : a;
export function flexStyle({ gap, align, justify }: FlexProps, style?: CSSProperties): CSSProperties {
  return {
    gap: gap === undefined ? undefined : `var(--space-${gap})`,
    alignItems: flexAlign(align),
    justifyContent:
      justify === "between" ? "space-between" : justify === "start" ? "flex-start" : justify === "end" ? "flex-end" : justify,
    ...style,
  };
}
