import { cx } from "../../lib/styles/classes";
// Proposal document and payment schedule (F-C29, F-C30, F-C26, F-S11).
import { parseDate } from "@internationalized/date";
import { CircleCheck,Plus,Trash2,TriangleAlert } from "../../lib/icons";
import { useRef } from "react";
import { Button,IconButton } from "../../lib/actions";
import { Badge } from "../../lib/feedback";
import { DatePicker,NumberField,SegmentedControl,TextField } from "../../lib/fields";
import { DateTime,useCurrency,useMessages,useMoneyFormat,useNumberFormat } from "../../lib/locale";
import { Money } from "../domain";
import { allocateMilestones } from "./allocate-milestones";
import { pctOptions } from "./helpers";
import { scheduleGap } from "./schedule-gap";
import type { Milestone } from "./types";

export interface PaymentScheduleProps {
  milestones: Milestone[];
  total: number;
  currency?: string;
  readOnly?: boolean;
  /** The total is partial (unpriced items): payments are shares of an incomplete price. */
  partial?: boolean;
  onChange?: (milestones: Milestone[]) => void;
  /** Creates ids for new milestones; defaults to `crypto.randomUUID()`. */
  createId?: () => string;
}
/** Deposit and progress payments. Shares must add to 100 % of the total, and the sum is always shown. */
export function PaymentSchedule({ milestones, total, currency, readOnly, partial, onChange, createId = () => crypto.randomUUID() }: PaymentScheduleProps) {
  const { t } = useMessages();
  const fmt = useMoneyFormat(currency);
  const defaultCurrency = useCurrency();
  const cur = currency ?? defaultCurrency;
  const symbol = fmt.formatToParts(0).find((x) => x.type === "currency")?.value ?? cur;
  const pctFmt = useNumberFormat(pctOptions);
  const amounts = allocateMilestones(milestones, total);
  const off = scheduleGap(milestones, total);
  const addRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const name = (m: Milestone, i: number) => m.label || t("milestoneN", { n: i + 1 });
  const remove = (id: string, index: number) => {
    onChange?.(milestones.filter((x) => x.id !== id));
    // Keep focus in the schedule: the next row's remove button, or Add milestone.
    requestAnimationFrame(() => {
      const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>("[data-remove]");
      (buttons?.[Math.min(index, (buttons?.length ?? 1) - 1)] ?? addRef.current)?.focus();
    });
  };
  const update = (id: string, patch: Partial<Milestone>) => onChange?.(milestones.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  return (
    <section className={cx("plumb-element-section", "plumb-schedule")} aria-label={t("paymentSchedule")}>
      <div className={cx("plumb-element-div", "plumb-schedule-head")}>
        <span className={cx("plumb-element-span", "plumb-heading")} data-level="subheading">{t("paymentSchedule")}{partial ? ` · ${t("ofPartialTotal")}` : ""}</span>
        {off === 0
          ? partial ? <Badge icon={<CircleCheck aria-hidden />}>{t("addsUpPartial")}</Badge> : <Badge tone="success" icon={<CircleCheck aria-hidden />}>{t("addsUp")}</Badge>
          : <Badge tone="warning" icon={<TriangleAlert aria-hidden />}>{off > 0 ? t("unscheduled", { amount: fmt.format(off) }) : t("overTotal", { amount: fmt.format(-off) })}</Badge>}
      </div>
      {!readOnly && milestones.length > 0 && (
        <div className={cx("plumb-element-div", "plumb-schedule-labels")} aria-hidden><span className={cx("plumb-element-span")} /><span className={cx("plumb-element-span")}>{t("milestone")}</span><span className={cx("plumb-element-span")}>{t("setBy")}</span><span className={cx("plumb-element-span")}>{t("shareOrAmount")}</span><span className={cx("plumb-element-span")}>{t("dueOptional")}</span><span className={cx("plumb-element-span")}>{t("amount")}</span><span className={cx("plumb-element-span")} /></div>
      )}
      <ol className={cx("plumb-element-ol", "plumb-schedule-list")} ref={listRef} data-editing={!readOnly || undefined}>
        {milestones.map((m, i) => (
          <li key={m.id} className={cx("plumb-element-li", "plumb-schedule-row")}>
            <span className={cx("plumb-element-span", "plumb-schedule-step")} aria-hidden>{i + 1}</span>
            {readOnly ? (
              <>
                <span className={cx("plumb-element-span", "plumb-schedule-label")}>{m.label}{m.due && <span className={cx("plumb-element-span", "plumb-item-description")}>{t("dueOn")} <DateTime value={m.due} /></span>}</span>
                <span className={cx("plumb-element-span", "plumb-num plumb-text")} data-tone="muted">{m.percent !== undefined ? pctFmt.format(m.percent) : ""}</span>
                <Money amount={amounts[i]} currency={currency} />
              </>
            ) : (
              <>
                <div className={cx("plumb-element-div", "plumb-schedule-edit")}>
                  <TextField label="" aria-label={t("milestoneName", { n: i + 1 })} size="sm" value={m.label} onChange={(v) => update(m.id, { label: v })} />
                  <SegmentedControl aria-label={t("howSet", { name: name(m, i) })} selectedKey={m.amount !== undefined ? "amount" : "percent"}
                    options={[{ id: "percent", label: "%" }, { id: "amount", label: symbol }]} size="sm"
                    onSelectionChange={(k) => update(m.id, k === "amount" ? { amount: amounts[i], percent: undefined } : { percent: total ? amounts[i] / total : 0, amount: undefined })} />
                  {m.amount !== undefined
                    ? <NumberField label="" aria-label={t("amountFor", { name: name(m, i) })} size="sm" hideStepper value={m.amount} formatOptions={{ style: "currency", currency: cur, currencyDisplay: "narrowSymbol" }} minValue={0} onChange={(v) => update(m.id, { amount: Number.isNaN(v) ? 0 : v })} />
                    : <NumberField label="" aria-label={t("shareFor", { name: name(m, i) })} size="sm" hideStepper value={m.percent ?? NaN} formatOptions={pctOptions} minValue={0} maxValue={1} onChange={(v) => update(m.id, { percent: Number.isNaN(v) ? undefined : v, amount: undefined })} />}
                  <DatePicker label="" aria-label={t("dueFor", { name: name(m, i) })} size="sm" value={m.due ? parseDate(m.due) : null} onChange={(d) => update(m.id, { due: d ? d.toString() : undefined })} />
                </div>
                <Money amount={amounts[i]} currency={currency} />
                <IconButton size="sm" data-remove label={t("removeName", { name: name(m, i) })} icon={<Trash2 />} onPress={() => remove(m.id, i)} />
              </>
            )}
          </li>
        ))}
      </ol>
      {!readOnly && onChange && (
        <div className={cx("plumb-element-div")}><Button ref={addRef} size="sm" variant="ghost" icon={<Plus />} onPress={() => { onChange([...milestones, { id: createId(), label: "", percent: off > 0 && total ? off / total : 0 }]); }}>{t("addMilestone")}</Button></div>
      )}
    </section>
  );
}
