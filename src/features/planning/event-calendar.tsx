// Delivering the work: schedules, selections, bid levelling, budgets, proposal status, offline sync
// (F-C04, F-C24, F-C33, F-C35, F-C43, F-C51, F-H30, F-H36, F-S16, F-C47).
import { ChevronLeft,ChevronRight,TriangleAlert } from "../../lib/icons";
import { Button as AriaButton } from "react-aria-components";
import { IconButton } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { SegmentedControl } from "../../lib/fields";
import { useMediaQuery } from "../../lib/layout";
import { DateTime,useLocale,useMessages } from "../../lib/locale";

/* ---------- Calendar of events (F-H30, F-C43, F-C61) ---------- */
export interface CalendarEvent {
  id: string;
  title: string;
  /** ISO date (all day) or date-time. */
  start: string;
  /** e.g. "Care task", "Inspection", "Delivery". */
  kind?: string;
  /** Planned (not confirmed) events are dashed. */
  confirmed?: boolean;
  /** Overdue care tasks and missed bookings are flagged in words too. */
  overdue?: boolean;
}
export interface EventCalendarProps {
  "aria-label": string;
  events: CalendarEvent[];
  /** Any day in the month to show (ISO date). */
  month: string;
  onMonthChange?: (month: string) => void;
  onEventAction?: (event: CalendarEvent) => void;
  view?: "month" | "agenda";
  onViewChange?: (view: "month" | "agenda") => void;
  /** Heading level of the month name, to match the page outline. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}
/** The calendar day an event falls on for the viewer: date-only strings as written, date-times in the local zone. */
export const dayKey = (iso: string) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
/**
 * Care tasks, inspections, deliveries, and visits by day. The month view is a table of days; the agenda view lists the
 * same events in order and is the better choice on phones and for screen readers.
 */
export function EventCalendar({ events, month, onMonthChange, onEventAction, view: requestedView = "month", onViewChange, headingLevel = 3, className, ...aria }: EventCalendarProps) {
  // A month grid can't fit readable, tappable events on a phone, so narrow screens always get the agenda.
  const narrow = useMediaQuery("(max-width: 640px)");
  const view = narrow ? "agenda" : requestedView;
  const H = `h${headingLevel}` as const;
  const { t, plural } = useMessages();
  const { locale } = useLocale();
  const [y, m] = month.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  // First day of the week follows the locale (Sunday in en-CA and fr-CA, Monday in most of Europe).
  const loc = new Intl.Locale(locale) as Intl.Locale & { getWeekInfo?: () => { firstDay: number }; weekInfo?: { firstDay: number } };
  // Firefox has neither API yet; fall back to the regions whose weeks start on Monday.
  const region = loc.maximize().region ?? "";
  const firstDay = (loc.getWeekInfo?.() ?? loc.weekInfo)?.firstDay ?? (/^(US|CA|MX|BR|JP|KR|IL|PH|ZA|TW|HK|IN|AU)$/.test(region) ? 7 : 1);
  const weekStart = firstDay % 7;
  const lead = (first.getUTCDay() - weekStart + 7) % 7;
  const cells: (number | null)[] = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const iso = (d: number) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const byDay = new Map<string, CalendarEvent[]>();
  [...events].sort((a, b) => a.start.localeCompare(b.start)).forEach((e) => byDay.set(dayKey(e.start), [...(byDay.get(dayKey(e.start)) ?? []), e]));
  const monthName = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(first);
  const weekday = (i: number) => new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(new Date(Date.UTC(2023, 0, 1 + i + weekStart)));
  const shift = (d: number) => { const n = new Date(Date.UTC(y, m - 1 + d, 1)); onMonthChange?.(n.toISOString().slice(0, 10)); };
  const chip = (e: CalendarEvent) => (
    <AriaButton key={e.id} className={cx("plumb-event plumb-focusable")} data-confirmed={e.confirmed || undefined} data-overdue={e.overdue || undefined} onPress={() => onEventAction?.(e)}>
      {e.overdue && <TriangleAlert aria-hidden />}{e.title}{e.overdue && <span className={cx("plumb-element-span", "plumb-sr-only")}> ({t("overdue")})</span>}{!e.confirmed && <span className={cx("plumb-element-span", "plumb-sr-only")}> ({t("sched_planned")})</span>}
    </AriaButton>
  );
  const inMonth = [...byDay].filter(([d]) => d.startsWith(month.slice(0, 7)));
  return (
    <section className={cx("plumb-element-section", cx("plumb-event-calendar", className))} aria-label={aria["aria-label"]}>
      <div className={cx("plumb-element-div", "plumb-event-bar")}>
        <IconButton size="sm" label={t("previousMonth")} icon={<ChevronLeft />} onPress={() => shift(-1)} isDisabled={!onMonthChange} />
        <H className={cx("plumb-heading")} data-level="subheading" aria-live="polite">{monthName}</H>
        <IconButton size="sm" label={t("nextMonth")} icon={<ChevronRight />} onPress={() => shift(1)} isDisabled={!onMonthChange} />
        {onViewChange && !narrow && <SegmentedControl aria-label={t("calendarView")} size="sm" selectedKey={view} onSelectionChange={(k) => onViewChange(k as "month" | "agenda")} options={[{ id: "month", label: t("monthView") }, { id: "agenda", label: t("agendaView") }]} />}
      </div>
      {view === "agenda" ? (
        inMonth.length ? (
          <ol className={cx("plumb-element-ol", "plumb-agenda")}>
            {inMonth.map(([d, list]) => (
              <li key={d} className={cx("plumb-element-li")}><span className={cx("plumb-element-span", "plumb-agenda-day")}><DateTime value={d} /></span><span className={cx("plumb-element-span", "plumb-agenda-events")}>{list.map(chip)}</span></li>
            ))}
          </ol>
        ) : <p className={cx("plumb-element-p", "plumb-item-description")}>{t("nothingScheduled")}</p>
      ) : (
        <table className={cx("plumb-element-table", "plumb-month")}>
          <thead className={cx("plumb-element-thead")}><tr className={cx("plumb-element-tr")}>{Array.from({ length: 7 }, (_, i) => <th key={i} scope="col" className={cx("plumb-element-th")}>{weekday(i)}</th>)}</tr></thead>
          <tbody className={cx("plumb-element-tbody")}>
            {Array.from({ length: cells.length / 7 }, (_, w) => (
              <tr key={w} className={cx("plumb-element-tr")}>
                {cells.slice(w * 7, w * 7 + 7).map((d, i) => {
                  const list = d ? byDay.get(iso(d)) ?? [] : [];
                  return (
                    <td key={i} data-empty={!d || undefined} className={cx("plumb-element-td")}>
                      {d && <><span className={cx("plumb-element-span", "plumb-month-day")}><span aria-hidden className={cx("plumb-element-span")}>{d}</span><span className={cx("plumb-element-span", "plumb-sr-only")}>{new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso(d)}T12:00:00Z`))}{list.length ? `, ${plural("eventsCount", list.length)}` : ""}</span></span>{list.map(chip)}</>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
