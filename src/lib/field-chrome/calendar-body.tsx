import { cx } from "../styles/classes";
// Shared field parts: label row, description and error, focus handle, and the calendar grid.
// Internal to Plumb (not exported from the package index).
import { ChevronLeft,ChevronRight } from "../icons";
import {
Button as AriaButton,
Heading as AriaHeading,
Calendar,
CalendarCell,
CalendarGrid,
RangeCalendar
} from "react-aria-components";

export function CalendarParts() {
  return (
    <>
      <div className={cx("plumb-element-div", "plumb-calendar-head")}>
        <AriaButton slot="previous" className={cx("plumb-button plumb-focusable")} data-variant="ghost" data-size="sm" data-icon-only><ChevronLeft aria-hidden /></AriaButton>
        <AriaHeading className={cx("plumb-heading")} data-level="subheading" />
        <AriaButton slot="next" className={cx("plumb-button plumb-focusable")} data-variant="ghost" data-size="sm" data-icon-only><ChevronRight aria-hidden /></AriaButton>
      </div>
      <CalendarGrid className={cx("plumb-calendar-grid")}>
        {(date) => <CalendarCell date={date} className={cx("plumb-calendar-cell")}>
          {({ formattedDate }) => <span className={cx("plumb-element-span", "plumb-calendar-day")}>{formattedDate}</span>}
        </CalendarCell>}
      </CalendarGrid>
    </>
  );
}
/** The month grid used inside date pickers (reads its value from the surrounding picker). */
export function CalendarBody({ range }: { range?: boolean }) {
  return range
    ? <RangeCalendar className={cx("plumb-calendar plumb-range-calendar")}><CalendarParts /></RangeCalendar>
    : <Calendar className={cx("plumb-calendar")}><CalendarParts /></Calendar>;
}
