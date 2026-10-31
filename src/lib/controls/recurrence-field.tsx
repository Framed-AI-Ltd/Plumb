// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import { parseDate } from "@internationalized/date";
import { type ReactNode } from "react";
import { cx } from "../cx";
import { DatePicker,NumberField,Select,Switch } from "../fields";
import { useMessages } from "../locale";

/* ---------- Recurrence (F-H30, F-C43) ---------- */
export const safeDate = (iso?: string) => { if (!iso) return null; try { return parseDate(iso); } catch { return null; } };
export interface Recurrence { every: number; unit: "day" | "week" | "month" | "year"; until?: string }
export interface RecurrenceFieldProps {
  label: ReactNode;
  value: Recurrence | null;
  onChange: (value: Recurrence | null) => void;
  description?: ReactNode;
  className?: string;
}
/** How often something repeats (care tasks, reminders): "every 3 months until 2027-06-30", or not at all. */
export function RecurrenceField({ label, value, onChange, description, className }: RecurrenceFieldProps) {
  const { t } = useMessages();
  const units = (["day", "week", "month", "year"] as const).map((u) => ({ id: u, label: t(`every_${u}`) }));
  return (
    <fieldset className={cx("plumb-element-fieldset", cx("plumb-recurrence", className))}>
      <legend className={cx("plumb-element-legend", "plumb-label")}>{label}</legend>
      <Switch isSelected={!!value} onChange={(on) => onChange(on ? { every: 1, unit: "month" } : null)}>{t("repeats")}</Switch>
      {value && (
        <div className={cx("plumb-element-div", "plumb-recurrence-row")}>
          <NumberField label={t("every")} size="sm" minValue={1} maxValue={99} value={value.every} onChange={(n) => onChange({ ...value, every: Number.isNaN(n) ? 1 : n })} />
          <Select label={t("unit")} size="sm" options={units} selectedKey={value.unit} onSelectionChange={(k) => onChange({ ...value, unit: k as Recurrence["unit"] })} />
          <DatePicker label={t("until")} optional size="sm" value={safeDate(value.until)} onChange={(d) => onChange({ ...value, until: d ? d.toString() : undefined })} />
        </div>
      )}
      {description && <span className={cx("plumb-element-span", "plumb-description")}>{description}</span>}
    </fieldset>
  );
}
