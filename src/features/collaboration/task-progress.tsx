// Working together: threads and RFIs, tasks and punch lists, assistant task progress, notifications
// (F-S12, F-S14, F-C39, F-C40, F-C41, F-C42, F-C59, F-M24).
import {
CircleAlert,CircleCheck,CircleDashed,CircleSlash,
Loader,
RotateCcw
} from "../../lib/icons";
import { type ReactNode } from "react";
import { Button } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { useMessages,type MessageKey } from "../../lib/locale";

/* ---------- Assistant task progress (F-S12) ---------- */
export interface TaskStep {
  id: string;
  label: string;
  status: "pending" | "running" | "done" | "failed" | "skipped";
  /** Result summary or failure reason. */
  detail?: string;
}
export interface TaskProgressProps {
  title: ReactNode;
  steps: TaskStep[];
  /** Retry from a failed step; completed steps are not repeated. */
  onRetry?: (stepId: string) => void;
  onCancel?: () => void;
  /** Shown when every step is done: what was produced and where it went (always a draft). */
  result?: ReactNode;
  className?: string;
}
export const stepIcons = { pending: CircleDashed, running: Loader, done: CircleCheck, failed: CircleAlert, skipped: CircleSlash };
/** What the assistant is doing, step by step, with recoverable failures and nothing applied silently. */
export function TaskProgress({ title, steps, onRetry, onCancel, result, className }: TaskProgressProps) {
  const { t, plural } = useMessages();
  const running = steps.some((s) => s.status === "running" || s.status === "pending");
  const doneCount = steps.filter((s) => s.status === "done").length;
  return (
    <section className={cx("plumb-element-section", cx("plumb-task-progress", className))} aria-label={typeof title === "string" ? title : t("assistantTask")} aria-busy={running || undefined}>
      <div className={cx("plumb-element-div", "plumb-draft-head")}>
        <span className={cx("plumb-element-span", "plumb-heading")} data-level="subheading">{title}</span>
        <span className={cx("plumb-element-span", "plumb-item-description")} role="status">{plural("stepsDone", doneCount, { total: steps.length })}</span>
      </div>
      <ol className={cx("plumb-element-ol", "plumb-steps-list")}>
        {steps.map((s) => {
          const Icon = stepIcons[s.status];
          return (
            <li key={s.id} className={cx("plumb-element-li", "plumb-step-row")} data-status={s.status}>
              <Icon className={cx(s.status === "running" ? "plumb-spin" : undefined)} aria-hidden />
              <div className={cx("plumb-element-div")}>
                <span className={cx("plumb-element-span", "plumb-label")}>{s.label}</span> <span className={cx("plumb-element-span", "plumb-sr-only")}>({t(`step_${s.status}` as MessageKey)})</span>
                {s.detail && <span className={cx("plumb-element-span", "plumb-item-description")}>{s.detail}</span>}
              </div>
              {s.status === "failed" && onRetry && <Button size="sm" variant="secondary" icon={<RotateCcw />} onPress={() => onRetry(s.id)} aria-label={t("retryName", { name: s.label })}>{t("retry")}</Button>}
            </li>
          );
        })}
      </ol>
      {!running && result && <div className={cx("plumb-element-div", "plumb-task-result")}>{result}</div>}
      {running && onCancel && <div className={cx("plumb-element-div")}><Button size="sm" variant="ghost" onPress={onCancel}>{t("stop")}</Button></div>}
    </section>
  );
}
