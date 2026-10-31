// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import {
Calendar as AriaCalendar,
type CalendarProps as AriaCalendarProps,
type DateValue
} from "react-aria-components";
import { cx } from "../cx";
import { CalendarParts } from "../field-chrome";

/** A month you can pick a day from, shown inline (scheduling panels, availability). */
export function Calendar<T extends DateValue>({ className, ...props }: Omit<AriaCalendarProps<T>, "className"> & { className?: string }) {
  return <AriaCalendar {...props} className={cx("plumb-calendar plumb-calendar-inline", className)}><CalendarParts /></AriaCalendar>;
}
