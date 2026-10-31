// Truth primitives: unknowns, money, quantities, sources, lifecycle, visibility, and AI drafts.
import { cx } from "../../lib/cx";
import { useMessages,useMoneyFormat } from "../../lib/locale";
import { Unknown } from "./unknown";

export interface MoneyProps {
  /** `null` renders as Unknown. */
  amount: number | null;
  /** Defaults to the LocaleProvider currency. */
  currency?: string;
  emphasis?: "default" | "strong";
  size?: "md" | "lg";
  unknownLabel?: string;
  className?: string;
}
/** Tabular, currency-explicit amount. */
export function Money({ amount, currency, emphasis = "default", size = "md", unknownLabel, className }: MoneyProps) {
  // One currency format everywhere: narrow symbol in figures; the currency code lives in column headers and totals.
  const fmt = useMoneyFormat(currency);
  const { t } = useMessages();
  if (amount === null) return <Unknown>{unknownLabel ?? t("notPriced")}</Unknown>;
  return (
    <span className={cx("plumb-element-span", cx("plumb-money", className))} data-emphasis={emphasis} data-size={size}>
      {fmt.format(amount)}
    </span>
  );
}
