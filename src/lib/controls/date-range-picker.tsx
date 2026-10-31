// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import { CalendarDays } from "../icons";
import {
Button as AriaButton,
DateRangePicker as AriaDateRangePicker,
Dialog as AriaDialog,
RangeCalendar as AriaRangeCalendar,
DateInput,
DateSegment,
Group,
Popover,
type DateRangePickerProps as AriaDateRangePickerProps,
type DateValue
} from "react-aria-components";
import { cx } from "../cx";
import { CalendarParts,FieldFoot,FieldLabel,useFieldFocus,type FieldChrome } from "../field-chrome";
import { useMessages } from "../locale";

/* ---------- Date range ---------- */
export interface DateRangePickerProps<T extends DateValue> extends Omit<AriaDateRangePickerProps<T>, "className">, FieldChrome {}
/** Start and end dates with a range calendar: schedules, access windows, reporting periods (F-C41, F-C43). */
export function DateRangePicker<T extends DateValue>({ inputRef, className, label, description, errorMessage, optional, labelAside, size = "md", ...props }: DateRangePickerProps<T>) {
  const { t } = useMessages();
  const focusRef = useFieldFocus(inputRef, "[role=spinbutton]");
  return (
    <AriaDateRangePicker ref={focusRef} {...props} isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)} className={cx("plumb-field", className)} data-size={size}>
      <FieldLabel label={label} optional={optional} labelAside={labelAside} />
      <Group className={cx("plumb-field-group plumb-date-range")}>
        <DateInput slot="start" className={cx("plumb-date-input")}>{(segment) => <DateSegment segment={segment} className={cx("plumb-date-segment")} />}</DateInput>
        <span className={cx("plumb-element-span", "plumb-range-dash")} aria-hidden>–</span>
        <DateInput slot="end" className={cx("plumb-date-input")}>{(segment) => <DateSegment segment={segment} className={cx("plumb-date-segment")} />}</DateInput>
        <AriaButton className={cx("plumb-clear")} aria-label={t("openCalendar")}><CalendarDays size={16} aria-hidden /></AriaButton>
      </Group>
      <FieldFoot description={description} errorMessage={errorMessage} />
      <Popover className={cx("plumb-popover plumb-calendar-popover")} offset={6}>
        <AriaDialog className={cx("plumb-calendar-dialog")}>
          <AriaRangeCalendar className={cx("plumb-calendar plumb-range-calendar")}><CalendarParts /></AriaRangeCalendar>
        </AriaDialog>
      </Popover>
    </AriaDateRangePicker>
  );
}
