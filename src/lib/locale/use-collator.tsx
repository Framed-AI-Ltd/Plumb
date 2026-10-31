import { useMemo } from "react";
import { useLocale } from "react-aria-components";

/** Locale-aware string comparison for sorting (numeric, accent-insensitive). */
export function useCollator() {
  const { locale } = useLocale();
  return useMemo(() => new Intl.Collator(locale, { numeric: true, sensitivity: "base" }), [locale]);
}
