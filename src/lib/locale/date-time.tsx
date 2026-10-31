import { cx } from "../styles/classes";
import { useLocale } from "react-aria-components";

/**
 * A machine-readable date. Accepts a Date or ISO string. Date-only strings ("2026-10-22") are calendar days:
 * they are never shifted by time zone. `short` adds the year when it isn't the current year.
 */
export function DateTime({ value, format = "date", timeZone }: { value: Date | string; format?: "date" | "datetime" | "short"; timeZone?: string }) {
  const { locale } = useLocale();
  const dateOnly = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
  const date = typeof value === "string" ? (/^\d{4}-\d{2}-\d{2}/.test(value) ? new Date(dateOnly ? `${value}T12:00:00Z` : value) : null) : value;
  if (!date || Number.isNaN(date.getTime())) {
    if (process.env.NODE_ENV !== "production") console.warn(`DateTime: "${String(value)}" isn't a Date or ISO string; shown as written and not localized.`);
    return <>{value as string}</>;
  }
  const zone = dateOnly ? "UTC" : timeZone;
  const thisYear = date.getUTCFullYear() === new Date().getUTCFullYear();
  const opts: Intl.DateTimeFormatOptions =
    format === "datetime" && !dateOnly ? { dateStyle: "medium", timeStyle: "short" }
    : format === "short" ? { day: "numeric", month: "short", year: thisYear ? undefined : "numeric" }
    : { dateStyle: "medium" };
  return <time dateTime={dateOnly ? (value as string) : date.toISOString()} className={cx("plumb-element-time")}>{new Intl.DateTimeFormat(locale, { ...opts, timeZone: zone }).format(date)}</time>;
}
