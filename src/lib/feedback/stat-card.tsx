import { styleIcon } from "../icons";
import type { HTMLAttributes,ReactNode } from "react";
import { cx } from "../cx";

export interface StatCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "color" | "title" | "children"> {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
}
/** Neutral metric card; colour appears only in the small icon tile. */
export function StatCard({ label, value, hint, icon, className, ...rest }: StatCardProps) {
  return (
    <div {...rest} className={cx("plumb-element-div", cx("plumb-stat", className))}>
      <div className={cx("plumb-element-div", "plumb-stat-head")}>
        <span className={cx("plumb-element-span", "plumb-stat-label")}>{label}</span>
        {icon && <span className={cx("plumb-element-span", "plumb-stat-icon")} aria-hidden>{styleIcon(icon)}</span>}
      </div>
      <span className={cx("plumb-element-span", "plumb-stat-value")}>{value}</span>
      {hint && <span className={cx("plumb-element-span", "plumb-stat-hint")}>{hint}</span>}
    </div>
  );
}
