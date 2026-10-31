import { useMemo } from "react";
import { useLocale } from "react-aria-components";
import { useCurrency } from "./use-currency";

/** A cached Intl.NumberFormat for money in the current locale and currency. */
export function useMoneyFormat(currency?: string, signDisplay?: Intl.NumberFormatOptions["signDisplay"]) {
  const { locale } = useLocale();
  const cur = useCurrency();
  return useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: currency ?? cur, currencyDisplay: "narrowSymbol", signDisplay }),
    [locale, currency, cur, signDisplay],
  );
}
