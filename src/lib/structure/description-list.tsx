import type { ReactNode } from "react";
import { cx } from "../cx";

/* ---------- Description list ---------- */
export interface DescriptionItem {
  label: ReactNode;
  value: ReactNode;
  /** Shown under the value: source, provenance, note. */
  meta?: ReactNode;
}
/** Label/value facts, e.g. a room's measurements or a contact's details. */
export function DescriptionList({ items, columns = 1, className }: { items: DescriptionItem[]; columns?: 1 | 2 | 3; className?: string }) {
  return (
    <dl className={cx("plumb-element-dl", cx("plumb-dl", className))} data-columns={columns}>
      {items.map((item, i) => (
        <div key={i} className={cx("plumb-element-div", "plumb-dl-item")}>
          <dt className={cx("plumb-element-dt", "plumb-dl-label")}>{item.label}</dt>
          <dd className={cx("plumb-element-dd", "plumb-dl-value")}>
            {item.value}
            {item.meta && <div className={cx("plumb-element-div", "plumb-dl-meta")}>{item.meta}</div>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
