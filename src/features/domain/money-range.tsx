// Truth primitives: unknowns, money, quantities, sources, lifecycle, visibility, and AI drafts.
import { type ReactNode } from "react";
import { cx } from "../../lib/cx";
import { Badge } from "../../lib/feedback";
import { useMessages,useNumberFormat } from "../../lib/locale";
import { Money } from "./money";

export interface MoneyRangeProps {
  /** Either end can be unknown; an unknown end is never shown as 0. */
  low: number | null;
  high: number | null;
  currency?: string;
  /** What moves the number, as shares of the range (0–1), largest first. */
  drivers?: { label: string; share: number }[];
  /** What the range is based on, e.g. "Supplied measurements · prices from Oct 2026". */
  basis?: ReactNode;
  className?: string;
}
/** An indicative budget: a low–high range, its biggest drivers, and its basis. Never a quote (F-H26, F-H36). */
export function MoneyRange({ low, high, currency, drivers = [], basis, className }: MoneyRangeProps) {
  const { t } = useMessages();
  const pct = useNumberFormat({ style: "percent", maximumFractionDigits: 0 });
  return (
    <div className={cx("plumb-element-div", cx("plumb-money-range", className))}>
      <div className={cx("plumb-element-div", "plumb-money-range-value")}>
        <Money amount={low} size="lg" unknownLabel={t("unknown")} currency={currency} />
        <span aria-hidden className={cx("plumb-element-span")}>–</span><span className={cx("plumb-element-span", "plumb-sr-only")}>{t("to")}</span>
        <Money amount={high} size="lg" unknownLabel={t("unknown")} currency={currency} />
      </div>
      <Badge variant="dashed">{t("indicativeNotQuote")}</Badge>
      {drivers.length > 0 && (
        <ul className={cx("plumb-element-ul", "plumb-money-range-drivers")} aria-label={t("costDrivers")}>
          {drivers.map((d) => (
            <li key={d.label} className={cx("plumb-element-li")}>
              <span className={cx("plumb-element-span")}>{d.label}</span>
              <span className={cx("plumb-element-span", "plumb-money-range-bar")} aria-hidden><span style={{ inlineSize: `${Math.min(100, Math.max(0, d.share * 100))}%` }} className={cx("plumb-element-span")} /></span>
              <span className={cx("plumb-element-span", "plumb-num")}>{pct.format(d.share)}</span>
            </li>
          ))}
        </ul>
      )}
      {basis && <span className={cx("plumb-element-span", "plumb-item-description")}>{basis}</span>}
    </div>
  );
}
