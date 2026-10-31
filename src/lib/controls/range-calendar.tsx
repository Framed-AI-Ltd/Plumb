// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import {
RangeCalendar as AriaRangeCalendar,
type RangeCalendarProps as AriaRangeCalendarProps,
type DateValue
} from "react-aria-components";
import { cx } from "../cx";
import { CalendarParts } from "../field-chrome";

/** An inline month for choosing a start and end day. */
export function RangeCalendar<T extends DateValue>({ className, ...props }: Omit<AriaRangeCalendarProps<T>, "className"> & { className?: string }) {
  return <AriaRangeCalendar {...props} className={cx("plumb-calendar plumb-calendar-inline plumb-range-calendar", className)}><CalendarParts /></AriaRangeCalendar>;
}
