// Page frames: the contractor workspace, public and customer pages, page headers, and project progress.
import { Check } from "../../lib/icons";
import { cx } from "../../lib/cx";
import { useMessages } from "../../lib/locale";

export interface JourneyStep {
  id: string;
  label: string;
}
/** Where the project is in intake → estimate → proposal → record. */
export function Journey({ steps, current, "aria-label": label, className }: { steps: JourneyStep[]; current: string; "aria-label"?: string; className?: string }) {
  const { t } = useMessages();
  const at = steps.findIndex((s) => s.id === current);
  return (
    <ol className={cx("plumb-element-ol", cx("plumb-steps", className))} aria-label={label ?? t("projectProgress")}>
      {steps.map((s, i) => {
        const state = i < at ? "done" : i === at ? "current" : "todo";
        return (
          <li key={s.id} className={cx("plumb-element-li", "plumb-step-item")} data-state={state} aria-current={state === "current" ? "step" : undefined}>
            <span className={cx("plumb-element-span", "plumb-step-dot")}>{state === "done" ? <Check aria-label={t("done")} /> : i + 1}</span>
            {s.label}
          </li>
        );
      })}
    </ol>
  );
}
