import { type HTMLAttributes } from "react";
import { cx } from "../cx";

/** Title row of a card: heading on the start side, actions on the end. */
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("plumb-element-div", cx("plumb-card-header", className))} />;
}
