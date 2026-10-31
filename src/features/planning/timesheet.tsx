// Delivering the work: schedules, selections, bid levelling, budgets, proposal status, offline sync
// (F-C04, F-C24, F-C33, F-C35, F-C43, F-C51, F-H30, F-H36, F-S16, F-C47).
import { cx } from "../../lib/cx";
import { Badge } from "../../lib/feedback";
import { NumberField,Select } from "../../lib/fields";
import { DateTime,useMessages,useNumberFormat } from "../../lib/locale";
import { Money,Unknown } from "../domain";

/* ---------- Timesheet (F-C54) ---------- */
export interface TimeEntry {
  id: string;
  person: string;
  /** ISO date. */
  date: string;
  /** Hours worked; null = not entered. */
  hours: number | null;
  costCode?: string;
  /** Labour cost per hour; null or absent = not costed (contractor-only). */
  rate?: number | null;
  /** Approved entries are locked. */
  approved?: boolean;
}
export interface TimesheetProps {
  "aria-label": string;
  entries: TimeEntry[];
  onChange?: (entries: TimeEntry[]) => void;
  /** Cost codes offered for each entry. */
  costCodes?: string[];
  currency?: string;
  className?: string;
}
/**
 * Crew time by person and day, with cost code and labour cost (F-C54). Hours not entered stay blank, totals say
 * "partial" when anything is missing, and approved entries can't be edited.
 */
export function Timesheet({ entries, onChange, costCodes = [], currency, className, ...aria }: TimesheetProps) {
  const { t } = useMessages();
  const hoursFmt = useNumberFormat({ maximumFractionDigits: 2 });
  const update = (id: string, patch: Partial<TimeEntry>) => onChange?.(entries.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const cost = (e: TimeEntry) => (e.hours === null || e.rate == null ? null : Math.round(e.hours * e.rate * 100) / 100);
  const known = entries.filter((e) => e.hours !== null);
  const hours = known.reduce((a, e) => a + (e.hours ?? 0), 0);
  const costed = entries.filter((e) => cost(e) !== null);
  const total = Math.round(costed.reduce((a, e) => a + (cost(e) ?? 0), 0) * 100) / 100;
  const partial = known.length < entries.length || costed.length < entries.length;
  return (
    <div className={cx("plumb-element-div", cx("plumb-timesheet", className))} role="table" aria-label={aria["aria-label"]}>
      <div role="row" className={cx("plumb-element-div", "plumb-timesheet-row plumb-change-header")}>
        <span role="columnheader" className={cx("plumb-element-span")}>{t("person")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("date")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("hours")}</span>
        <span role="columnheader" className={cx("plumb-element-span")}>{t("costCode")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("labourCost")}</span>
      </div>
      {entries.map((e) => {
        const locked = !onChange || e.approved;
        return (
          <div role="row" key={e.id} className={cx("plumb-element-div", "plumb-timesheet-row")} data-approved={e.approved || undefined}>
            <span role="rowheader" className={cx("plumb-element-span", "plumb-label")}>{e.person}{e.approved && <> <Badge tone="success">{t("approved")}</Badge></>}</span>
            <span role="cell" className={cx("plumb-element-span")}><DateTime value={e.date} format="short" /></span>
            <span role="cell" className={cx("plumb-element-span")}>
              {locked ? (e.hours === null ? <Unknown>{t("notEntered")}</Unknown> : <span className={cx("plumb-element-span", "plumb-num")}>{hoursFmt.format(e.hours)}</span>)
                : <NumberField label="" aria-label={t("hoursFor", { name: e.person })} size="sm" hideStepper minValue={0} maxValue={24} step={0.25} value={e.hours ?? NaN} onChange={(v) => update(e.id, { hours: Number.isNaN(v) ? null : v })} />}
            </span>
            <span role="cell" className={cx("plumb-element-span")}>
              {locked || !costCodes.length ? (e.costCode ?? "—")
                : <Select label="" aria-label={t("costCodeFor", { name: e.person })} size="sm" options={costCodes.map((c) => ({ id: c, label: c }))} selectedKey={e.costCode ?? null} onSelectionChange={(k) => update(e.id, { costCode: String(k) })} />}
            </span>
            <span role="cell" className={cx("plumb-element-span")}><Money amount={cost(e)} currency={currency} unknownLabel={t("notCosted")} /></span>
          </div>
        );
      })}
      <div role="row" className={cx("plumb-element-div", "plumb-timesheet-row plumb-timesheet-total")}>
        <span role="rowheader" className={cx("plumb-element-span")}>{t("total")}{partial ? ` · ${t("partial")}` : ""}</span><span role="cell" className={cx("plumb-element-span")} />
        <span role="cell" className={cx("plumb-element-span", "plumb-num")}>{hoursFmt.format(hours)}</span><span role="cell" className={cx("plumb-element-span")} />
        <span role="cell" className={cx("plumb-element-span")}><Money amount={costed.length ? total : null} currency={currency} emphasis="strong" unknownLabel={t("notCosted")} /></span>
      </div>
    </div>
  );
}
