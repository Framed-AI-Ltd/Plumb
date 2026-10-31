// Editable scope and the rate library (F-C05, F-C13, F-C14, F-C16, F-C20, F-C21, F-C25, F-S19).
import { Link2,TriangleAlert } from "../../lib/icons";
import { type ReactNode } from "react";
import { cx } from "../../lib/cx";
import { ComboBox } from "../../lib/fields";
import { DateTime,useCurrency,useLocale,useMessages } from "../../lib/locale";

/* ---------- Rate library picker ---------- */
export interface RateEntry {
  id: string;
  label: string;
  /** Price per `unit`, in the workspace currency unless `currency` is set. */
  rate: number;
  unit: string;
  currency?: string;
  region?: string;
  /** When the rate was last checked; stale rates are flagged. */
  date?: Date | string;
  source?: string;
}
export interface RatePickerProps {
  label?: ReactNode;
  "aria-label"?: string;
  rates: RateEntry[];
  selectedId?: string | null;
  onSelect: (rate: RateEntry) => void;
  /** The unit of the line being priced; a rate in another unit is flagged and never silently converted. */
  forUnit?: string;
  /** Rates older than this many days are marked stale (F-C27). */
  staleAfterDays?: number;
  size?: "sm" | "md";
  autoFocus?: boolean;
  /** Currency of the line being priced; rates in another currency are shown but can't be chosen. Defaults to the workspace currency. */
  currency?: string;
  /** For use inside an editable cell: typed text that isn't a library rate is kept (e.g. a number). */
  allowsCustomValue?: boolean;
  defaultInputValue?: string;
  onInputChange?: (value: string) => void;
  className?: string;
}
export const daysSince = (d: Date | string) => (Date.now() - new Date(typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T12:00:00Z` : d).getTime()) / 86_400_000;
/** Type to find a rate in the firm's library; shows unit, region, and date, and flags unit mismatches and stale rates. */
export function RatePicker({ label, rates, selectedId, onSelect, forUnit, staleAfterDays = 180, size = "md", autoFocus, currency, allowsCustomValue, defaultInputValue, onInputChange, className, ...aria }: RatePickerProps) {
  const { t } = useMessages();
  const { locale } = useLocale();
  const workspaceCurrency = useCurrency();
  const fmt = (r: RateEntry) => new Intl.NumberFormat(locale, { style: "currency", currency: r.currency ?? workspaceCurrency, currencyDisplay: "narrowSymbol" }).format(r.rate);
  const otherCurrency = (r: RateEntry) => !!r.currency && r.currency !== (currency ?? workspaceCurrency);
  const selected = rates.find((r) => r.id === selectedId);
  const options = rates.map((r) => ({
    id: r.id,
    label: r.label,
    description: [t("perUnit", { rate: fmt(r), unit: r.unit }), r.region, r.date && (daysSince(r.date) > staleAfterDays ? t("staleRate") : null)].filter(Boolean).join(" · "),
    icon: otherCurrency(r) ? <TriangleAlert aria-label={t("otherCurrency")} className={cx("plumb-rate-warn")} /> : forUnit && r.unit !== forUnit ? <TriangleAlert aria-label={t("otherUnit")} className={cx("plumb-rate-warn")} /> : <Link2 aria-hidden />,
    // A rate in another currency can't price this line; it's listed so people know it exists.
    isDisabled: otherCurrency(r),
  }));
  const mismatch = selected && forUnit && selected.unit !== forUnit;
  const stale = selected?.date && daysSince(selected.date) > staleAfterDays;
  return (
    <ComboBox
      label={label ?? ""}
      aria-label={label ? undefined : aria["aria-label"] ?? t("rateFromLibrary")}
      size={size}
      className={cx("plumb-rate-picker", className)}
      options={options}
      selectedKey={selectedId ?? null}
      autoFocus={autoFocus}
      menuTrigger={allowsCustomValue ? "input" : "focus"}
      allowsCustomValue={allowsCustomValue}
      defaultInputValue={defaultInputValue}
      onInputChange={onInputChange}
      onSelectionChange={(k) => { const r = rates.find((x) => x.id === k); if (r) onSelect(r); }}
      description={selected && (mismatch || stale)
        ? <span className={cx("plumb-element-span", "plumb-rate-note")}><TriangleAlert aria-hidden />{mismatch ? t("rateUnitMismatch", { unit: selected.unit, lineUnit: forUnit! }) : <>{t("rateCheckedOn")} <DateTime value={selected.date!} /></>}</span>
        : selected?.source}
    />
  );
}
