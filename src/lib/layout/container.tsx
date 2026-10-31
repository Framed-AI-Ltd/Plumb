import { type ElementType,type HTMLAttributes } from "react";
import { cx } from "../cx";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** `narrow` 480px (sign-in, single decisions), `text` 720px (reading, forms), `medium` 960px, `wide` 1280px. */
  width?: "narrow" | "text" | "medium" | "wide";
  as?: ElementType;
}
/** Centres content at a readable maximum width with page gutters. */
export function Container({ width = "medium", as: As = "div", className, ...props }: ContainerProps) {
  return <As {...props} className={cx("plumb-container", className)} data-width={width} />;
}
