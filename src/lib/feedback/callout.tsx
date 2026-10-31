import { CircleAlert,CircleCheck,Info,TriangleAlert } from "../icons";
import type { HTMLAttributes,ReactNode } from "react";
import { cx } from "../cx";
import type { Tone } from "./types";

export const calloutIcons: Record<Exclude<Tone, "accent">, typeof Info> = {
  neutral: Info,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
};
export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, "color" | "title" | "children"> {
  /** Announce to screen readers when it appears (results of an action). Static guidance stays silent. */
  live?: boolean;
  tone?: Exclude<Tone, "accent">;
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}
/** Inline guidance next to the work it affects. Prefer over toasts. */
export function Callout({ tone = "info", title, children, actions, live, className, ...rest }: CalloutProps) {
  const Icon = calloutIcons[tone];
  return (
    <div {...rest} className={cx("plumb-element-div", cx("plumb-callout", className))} data-tone={tone} role={live ? (tone === "danger" ? "alert" : "status") : undefined}>
      <Icon aria-hidden />
      <p className={cx("plumb-element-p", "plumb-callout-title")}>{title}</p>
      {children && <div className={cx("plumb-element-div", "plumb-callout-body")}>{children}</div>}
      {actions && <div className={cx("plumb-element-div", "plumb-callout-actions")}>{actions}</div>}
    </div>
  );
}
