import { useMemo } from "react";
import { useLocale } from "react-aria-components";

/** Options are compared by value, so inline objects don't create a new formatter every render. */
export function useNumberFormat(options?: Intl.NumberFormatOptions) {
  const { locale } = useLocale();
  const key = JSON.stringify(options ?? {});
  // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` is the value of `options`.
  return useMemo(() => new Intl.NumberFormat(locale, options), [locale, key]);
}
