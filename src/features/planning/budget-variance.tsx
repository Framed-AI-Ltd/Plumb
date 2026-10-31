// Delivering the work: schedules, selections, bid levelling, budgets, proposal status, offline sync
// (F-C04, F-C24, F-C33, F-C35, F-C43, F-C51, F-H30, F-H36, F-S16, F-C47).
import { TriangleAlert } from "../../lib/icons";
import { cx } from "../../lib/cx";
import { useMessages,useMoneyFormat } from "../../lib/locale";
import { Money } from "../domain";

/* ---------- Budget vs actual (F-C51, F-H36, F-C56) ---------- */
export interface BudgetLine { id: string; label: string; budget: number | null; committed?: number | null; actual: number | null }
/** Budget, committed, and actual by cost code; variance is computed only where both sides are known. */
export function BudgetVariance({ lines, currency, "aria-label": label, className }: { lines: BudgetLine[]; currency?: string; "aria-label"?: string; className?: string }) {
  const { t } = useMessages();
  const signed = useMoneyFormat(currency, "exceptZero");
  const showCommitted = lines.some((l) => l.committed !== undefined);
  return (
    <div className={cx("plumb-element-div", cx("plumb-budget", className))} role="table" aria-label={label ?? t("budgetVsActual")} data-committed={showCommitted || undefined}>
      <div role="row" className={cx("plumb-element-div", "plumb-budget-row plumb-change-header")}>
        <span role="columnheader" className={cx("plumb-element-span")}>{t("costCode")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("budget")}</span>
        {showCommitted && <span role="columnheader" className={cx("plumb-element-span")}>{t("committed")}</span>}
        <span role="columnheader" className={cx("plumb-element-span")}>{t("actual")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("variance")}</span>
      </div>
      {lines.map((l) => {
        const v = l.budget === null || l.actual === null ? null : Math.round((l.actual - l.budget) * 100) / 100;
        return (
          <div role="row" key={l.id} className={cx("plumb-element-div", "plumb-budget-row")}>
            <span role="rowheader" className={cx("plumb-element-span", "plumb-label")}>{l.label}</span>
            <span role="cell" className={cx("plumb-element-span")}><Money amount={l.budget} currency={currency} /></span>
            {showCommitted && <span role="cell" className={cx("plumb-element-span")}>{l.committed === undefined ? "" : <Money amount={l.committed} currency={currency} />}</span>}
            <span role="cell" className={cx("plumb-element-span")}><Money amount={l.actual} currency={currency} unknownLabel={t("notRecorded")} /></span>
            <span role="cell" data-over={(v !== null && v > 0) || undefined} className={cx("plumb-element-span")}>
              {v === null ? <span className={cx("plumb-element-span", "plumb-text")} data-tone="muted">—</span> : <>{v > 0 && <TriangleAlert aria-hidden />}{signed.format(v)}{v > 0 && <span className={cx("plumb-element-span", "plumb-sr-only")}> {t("overBudget")}</span>}</>}
            </span>
          </div>
        );
      })}
    </div>
  );
}
