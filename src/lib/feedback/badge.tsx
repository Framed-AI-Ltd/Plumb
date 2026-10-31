import { styleIcon } from "../icons";
import type { HTMLAttributes,ReactNode } from "react";
import { cx } from "../cx";
import type { Tone } from "./types";

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color" | "title" | "children"> {
  tone?: Tone;
  /** `dashed` marks drafts and proposals; `outline` marks reviewed states. */
  variant?: "soft" | "outline" | "dashed" | "solid";
  icon?: ReactNode;
  children: ReactNode;
}
/** Short status label. Always includes text; icons support, never replace, it. */
export function Badge({ tone = "neutral", variant = "soft", icon, children, className, ...rest }: BadgeProps) {
  return (
    <span {...rest} className={cx("plumb-element-span", cx("plumb-badge", className))} data-tone={tone} data-variant={variant}>
      {styleIcon(icon)}
      {children}
    </span>
  );
}
