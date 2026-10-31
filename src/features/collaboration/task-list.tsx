// Working together: threads and RFIs, tasks and punch lists, assistant task progress, notifications
// (F-S12, F-S14, F-C39, F-C40, F-C41, F-C42, F-C59, F-M24).
import {
CircleSlash,ClipboardCheck,
TriangleAlert
} from "../../lib/icons";
import { useState,type ReactNode } from "react";
import { Button as AriaButton } from "react-aria-components";
import { Button } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { Avatar,Badge,EmptyState } from "../../lib/feedback";
import { Checkbox } from "../../lib/fields";
import { DateTime,useMessages,type MessageKey } from "../../lib/locale";
import { isPast } from "./helpers";

/* ---------- Tasks and punch lists (F-C41, F-C42, F-C59) ---------- */
export interface Task {
  id: string;
  title: string;
  done: boolean;
  assignee?: string;
  due?: Date | string;
  /** Room, trade, or location label. */
  where?: string;
  /** What it's waiting on (F-C42); a blocked task can't be ticked off. */
  blockedBy?: string;
  /** Closure evidence attached (photos, sign-off) for punch items (F-C59). */
  evidence?: number;
  /**
   * For inspections and hold points (F-C61): a booked visit is not an approval, so the outcome is shown in words.
   * `failed` and `reinspect` keep the task open.
   */
  inspection?: "booked" | "passed" | "failed" | "reinspect";
}
export interface TaskListProps {
  "aria-label": string;
  tasks: Task[];
  onToggle?: (id: string, done: boolean) => void;
  onOpen?: (task: Task) => void;
  /** Hide completed tasks behind a count. */
  collapseDone?: boolean;
  emptyState?: ReactNode;
  className?: string;
}
/** Tasks with owners, due dates, locations, and blockers; overdue and blocked are stated in words, not only colour. */
export function TaskList({ tasks, onToggle, onOpen, collapseDone, emptyState, className, ...aria }: TaskListProps) {
  const { t, plural } = useMessages();
  const [showDone, setShowDone] = useState(!collapseDone);
  const done = tasks.filter((x) => x.done);
  const shown = showDone ? tasks : tasks.filter((x) => !x.done);
  if (!tasks.length) return <>{emptyState ?? <EmptyState icon={<ClipboardCheck />} title={t("noTasks")} />}</>;
  return (
    <div className={cx("plumb-element-div", cx("plumb-tasks", className))}>
      <ul className={cx("plumb-element-ul", "plumb-task-list")} aria-label={aria["aria-label"]}>
        {shown.map((task) => {
          const overdue = !task.done && task.due && isPast(task.due);
          return (
            <li key={task.id} className={cx("plumb-element-li", "plumb-task")} data-done={task.done || undefined} data-blocked={task.blockedBy ? true : undefined}>
              <Checkbox isSelected={task.done} isDisabled={!onToggle || (!!task.blockedBy && !task.done)} onChange={(v) => onToggle?.(task.id, v)} aria-label={t("completeName", { name: task.title })} />
              <div className={cx("plumb-element-div", "plumb-task-body")}>
                {onOpen
                  ? <AriaButton className={cx("plumb-task-title plumb-link plumb-focusable")} data-variant="quiet" onPress={() => onOpen(task)}>{task.title}</AriaButton>
                  : <span className={cx("plumb-element-span", "plumb-task-title")}>{task.title}</span>}
                <span className={cx("plumb-element-span", "plumb-task-meta")}>
                  {task.where && <span className={cx("plumb-element-span")}>{task.where}</span>}
                  {task.due && <span data-overdue={overdue || undefined} className={cx("plumb-element-span")}>{overdue && <TriangleAlert aria-hidden />}{t("dueOn")} <DateTime value={task.due} format="short" />{overdue && ` · ${t("overdue")}`}</span>}
                  {task.inspection && <Badge tone={task.inspection === "passed" ? "success" : task.inspection === "booked" ? "neutral" : "warning"} variant={task.inspection === "booked" ? "dashed" : "soft"}>{t(`inspection_${task.inspection}` as MessageKey)}</Badge>}
                  {task.blockedBy && <span className={cx("plumb-element-span", "plumb-task-blocked")}><CircleSlash aria-hidden />{t("blockedBy", { reason: task.blockedBy })}</span>}
                  {task.evidence ? <span className={cx("plumb-element-span")}>{plural("evidenceCount", task.evidence)}</span> : null}
                </span>
              </div>
              {task.assignee && <Avatar name={task.assignee} />}
            </li>
          );
        })}
      </ul>
      {collapseDone && done.length > 0 && (
        <Button size="sm" variant="ghost" aria-expanded={showDone} onPress={() => setShowDone(!showDone)}>{plural(showDone ? "hideDone" : "showDone", done.length)}</Button>
      )}
    </div>
  );
}
