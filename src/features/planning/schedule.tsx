// Delivering the work: schedules, selections, bid levelling, budgets, proposal status, offline sync
// (F-C04, F-C24, F-C33, F-C35, F-C43, F-C51, F-H30, F-H36, F-S16, F-C47).
import { Check,TriangleAlert } from "../../lib/icons";
import { cx } from "../../lib/cx";
import { Badge } from "../../lib/feedback";
import { DateTime,useMessages,type MessageKey } from "../../lib/locale";
import { toTime } from "./helpers";

export const day = 86_400_000;
/* ---------- Schedule (F-C41, F-C43, F-M24) ---------- */
export interface ScheduleItem {
  id: string;
  label: string;
  start: Date | string;
  end: Date | string;
  /** `planned` is not yet confirmed; `confirmed` is booked; `done` is complete. Shapes differ, not only colours. */
  status?: "planned" | "confirmed" | "done" | "at-risk";
  /** Trade, crew, or room. */
  group?: string;
  /** Ids this item waits on; shown in words. */
  dependsOn?: string[];
}
export interface ScheduleProps {
  "aria-label": string;
  items: ScheduleItem[];
  /** Defaults to the earliest start and latest end. */
  from?: Date | string;
  to?: Date | string;
  /** A date marked on the timeline, usually today. */
  today?: Date | string;
  className?: string;
}
/**
 * A simple Gantt view: one row per item with its dates in text, so the schedule is readable without the bars.
 * Read-only; editing dates happens in the item's form (F-C43 requires previewing impact before notifying).
 */
export function Schedule({ items, from, to, today, className, ...aria }: ScheduleProps) {
  const { t } = useMessages();
  if (!items.length) return null;
  const start = from ? toTime(from) : Math.min(...items.map((i) => toTime(i.start)));
  const end = to ? toTime(to) : Math.max(...items.map((i) => toTime(i.end)));
  const span = Math.max(day, end - start + day);
  const pos = (d: Date | string) => `${Math.min(100, Math.max(0, ((toTime(d) - start) / span) * 100))}%`;
  const width = (i: ScheduleItem) => `${Math.max(1, ((toTime(i.end) - toTime(i.start) + day) / span) * 100)}%`;
  const label = (id: string) => items.find((i) => i.id === id)?.label ?? id;
  return (
    <div className={cx("plumb-element-div", cx("plumb-schedule-view", className))} role="table" aria-label={aria["aria-label"]}>
      <div role="row" className={cx("plumb-element-div", "plumb-sr-only")}><span role="columnheader" className={cx("plumb-element-span")}>{t("task")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("dates")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("status")}</span></div>
      {items.map((i) => (
        <div role="row" key={i.id} className={cx("plumb-element-div", "plumb-sched-row")}>
          <span role="rowheader" className={cx("plumb-element-span", "plumb-sched-label")}>
            <span className={cx("plumb-element-span", "plumb-label")}>{i.label}</span>
            <span className={cx("plumb-element-span", "plumb-item-description")}>
              <DateTime value={i.start} format="short" /> – <DateTime value={i.end} format="short" />
              {i.group && ` · ${i.group}`}
              {i.dependsOn?.length ? ` · ${t("afterItems", { list: i.dependsOn.map(label).join(", ") })}` : ""}
            </span>
          </span>
          <span role="cell" className={cx("plumb-element-span", "plumb-sched-track")} aria-hidden>
            {today && <span className={cx("plumb-element-span", "plumb-sched-today")} style={{ insetInlineStart: pos(today) }} />}
            <span className={cx("plumb-element-span", "plumb-sched-bar")} data-status={i.status ?? "planned"} style={{ insetInlineStart: pos(i.start), inlineSize: width(i) }} />
          </span>
          <span role="cell" className={cx("plumb-element-span", "plumb-sched-status")}>
            <Badge tone={i.status === "done" ? "success" : i.status === "at-risk" ? "warning" : i.status === "confirmed" ? "accent" : "neutral"}
              variant={(i.status ?? "planned") === "planned" ? "dashed" : "soft"}
              icon={i.status === "at-risk" ? <TriangleAlert aria-hidden /> : i.status === "done" ? <Check aria-hidden /> : undefined}>
              {t(`sched_${i.status ?? "planned"}` as MessageKey)}
            </Badge>
          </span>
        </div>
      ))}
    </div>
  );
}
