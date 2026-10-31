import { cx } from "../cx";

/** A hairline between groups; prefer space when it's enough. */
export function Divider({ orientation = "horizontal", className }: { orientation?: "horizontal" | "vertical"; className?: string }) {
  return <hr className={cx("plumb-element-hr", cx("plumb-divider", className))} data-orientation={orientation} aria-orientation={orientation} />;
}
