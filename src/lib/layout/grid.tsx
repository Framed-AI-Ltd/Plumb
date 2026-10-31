import { type HTMLAttributes } from "react";
import { cx } from "../cx";
import type { Space } from "./types";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * `rail`: main column + 360px side rail. `stats`: 4 across. `2`/`3`: equal columns. `sidebar`: 260px + main.
   * `cards`: as many 280px+ columns as fit (galleries, product and contractor cards).
   * All collapse to one column below 960px (stats go 2 across, then 1).
   */
  layout: "rail" | "stats" | "sidebar" | "cards" | 2 | 3;
  gap?: Space;
}
/** Responsive page grids (rail, stats, sidebar, cards, 2, 3). See docs/LAYOUTS.md. */
export function Grid({ layout, gap, className, style, ...props }: GridProps) {
  return <div {...props} className={cx("plumb-element-div", cx("plumb-grid", className))} data-layout={layout} style={{ gap: gap === undefined ? undefined : `var(--space-${gap})`, ...style }} />;
}
