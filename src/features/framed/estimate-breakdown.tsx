import {
CircleAlert,
Lock
} from "../../lib/icons";
import { cx } from "../../lib/cx";
import { useCurrency,useMessages,useMoneyFormat,useNumberFormat } from "../../lib/locale";
import { Money } from "../domain";
import { customerBreakdown } from "./customer-breakdown";
import { r2 } from "./helpers";
import { ItemKind } from "./item-kind";
import type { BreakdownLine } from "./types";

export const pctOptions: Intl.NumberFormatOptions = { style: "percent", maximumFractionDigits: 2 };
export interface TaxLine {
  label: string;
  /** e.g. 0.15 for 15 %; shown as arithmetic. */
  rate?: number;
  amount: number;
}
export interface EstimateBreakdownProps {
  lines: BreakdownLine[];
  /** Total before tax. */
  total: number;
  /** Configured taxes; when present a tax-inclusive grand total is shown (F-C25, F-S19). */
  taxes?: TaxLine[];
  /** Also mark the total partial; unpriced in-price lines are detected automatically. */
  partial?: boolean;
  view?: "contractor" | "customer";
  currency?: string;
  subtotalLabel?: string;
  className?: string;
}
/** Totals with visible arithmetic. The customer view never shows private lines or the working (`customerBreakdown`). */
export function EstimateBreakdown({ lines, total, taxes, partial: explicitPartial, view = "contractor", currency, subtotalLabel, className }: EstimateBreakdownProps) {
  const fmt = useMoneyFormat(currency);
  const { t } = useMessages();
  const pctFmt = useNumberFormat(pctOptions);
  const code = useCurrency();
  const checked = customerBreakdown(lines, total);
  const partial = explicitPartial || lines.some((line) => line.amount === null && line.kind !== "option" && line.kind !== "excluded");
  // Customer view: private lines and working are removed before anything else, so no path can leak them.
  const shown = view === "customer" ? checked.rows : lines;
  const problems = checked.problems.map((p) => t(p.key, p.vars && Object.fromEntries(Object.entries(p.vars).map(([k, v]) => [k, fmt.format(v)]))));
  const taxTotal = r2((taxes ?? []).reduce((a, x) => a + x.amount, 0));
  const partialSuffix = partial ? ` · ${t("partial")}` : "";
  const totalLabel = subtotalLabel ?? (view === "customer" ? t("price") : t("customerPrice"));
  return (
    <>
      {problems.length > 0 && (
        <div className={cx("plumb-element-div", "plumb-breakdown-problem")} role="alert"><CircleAlert aria-hidden />
          {/* The specific problems are contractor information; customers only learn the price is being corrected. */}
          {view === "customer" ? <span className={cx("plumb-element-span")}>{t("priceUnavailable")}</span>
            : problems.length === 1 ? <span className={cx("plumb-element-span")}>{problems[0]}</span> : <ul className={cx("plumb-element-ul")}>{problems.map((x) => <li key={x} className={cx("plumb-element-li")}>{x}</li>)}</ul>}
        </div>
      )}
      {!(problems.length && view === "customer") && (
        <div className={cx("plumb-element-div", cx("plumb-breakdown", className))} role="table" aria-label={t("estimateBreakdown")}>
          <div role="row" className={cx("plumb-element-div", "plumb-sr-only")}><span role="columnheader" className={cx("plumb-element-span")}>{t("item")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("working")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("amount")}</span></div>
          {shown.map((l) => (
            <div key={l.id ?? l.label} className={cx("plumb-element-div", "plumb-breakdown-row")} role="row" data-private={l.private || undefined}>
              <span className={cx("plumb-element-span", "plumb-breakdown-label")} role="rowheader">
                <span className={cx("plumb-element-span")}>
                  <span className={cx("plumb-element-span", "plumb-breakdown-label-text")}>{l.label}{l.private && <Lock aria-label={t("contractorOnly")} />}</span>
                  {(l.note || (l.kind && l.kind !== "fixed")) && (
                    <span className={cx("plumb-element-span", "plumb-breakdown-note")}>
                      {l.kind === "credit" ? t("credit") : l.kind && l.kind !== "fixed" && <ItemKind kind={l.kind} inline />}
                      {l.kind && l.kind !== "fixed" && l.note ? " · " : ""}{l.note}
                    </span>
                  )}
                </span>
              </span>
              <span className={cx("plumb-element-span", "plumb-breakdown-formula")} role="cell">{l.formula ?? ""}</span>
              <span className={cx("plumb-element-span", "plumb-breakdown-amount")} role="cell"><Money amount={l.amount} currency={currency} /></span>
            </div>
          ))}
          {taxes?.length ? (
            <>
              <div className={cx("plumb-element-div", "plumb-breakdown-row plumb-breakdown-sub")} role="row">
                <span className={cx("plumb-element-span", "plumb-breakdown-label")} role="rowheader">{totalLabel} · {t("beforeTax").toLowerCase()}{partialSuffix}</span>
                <span className={cx("plumb-element-span", "plumb-breakdown-formula")} role="cell" />
                <span className={cx("plumb-element-span", "plumb-breakdown-amount")} role="cell"><Money amount={total} currency={currency} /></span>
              </div>
              {taxes.map((x) => (
                <div key={x.label} className={cx("plumb-element-div", "plumb-breakdown-row")} role="row">
                  <span className={cx("plumb-element-span", "plumb-breakdown-label")} role="rowheader">{x.label}</span>
                  <span className={cx("plumb-element-span", "plumb-breakdown-formula")} role="cell">{x.rate !== undefined ? pctFmt.format(x.rate) : ""}</span>
                  <span className={cx("plumb-element-span", "plumb-breakdown-amount")} role="cell"><Money amount={x.amount} currency={currency} /></span>
                </div>
              ))}
            </>
          ) : null}
          <div className={cx("plumb-element-div", "plumb-breakdown-total")} role="row">
            <span role="rowheader" className={cx("plumb-element-span")}>{totalLabel} ({currency ?? code}){partialSuffix}<span className={cx("plumb-element-span", "plumb-breakdown-note")}>{partial ? `${t("unpricedExcludedShort")} · ${taxes?.length ? t("includingTax") : t("beforeTax")}` : taxes?.length ? t("includingTax") : t("beforeTax")}</span></span>
            <span role="cell" className={cx("plumb-element-span", "plumb-breakdown-amount")}><Money amount={r2(total + taxTotal)} size="lg" currency={currency} /></span>
          </div>
        </div>
      )}
    </>
  );
}
