import { CalendarDays } from "../icons";
import {
Button as AriaButton,
DatePicker as AriaDatePicker,
Dialog as AriaDialog,
DateInput,
DateSegment,
Group,
Popover,
type DatePickerProps as AriaDatePickerProps,
type DateValue
} from "react-aria-components";
import { cx } from "../cx";
import { CalendarBody,FieldFoot,FieldLabel,useFieldFocus,type FieldChrome } from "../field-chrome";
import { useMessages } from "../locale";

export interface DatePickerProps<T extends DateValue> extends Omit<AriaDatePickerProps<T>, "className">, FieldChrome {}
/** Date entry with a calendar: site visits, validity, milestones. */
export function DatePicker<T extends DateValue>({ inputRef, className, label, description, errorMessage, optional, labelAside, size = "md", ...props }: DatePickerProps<T>) {
  const { t } = useMessages();
  const focusRef = useFieldFocus(inputRef, "[role=spinbutton]");
  return (
    <AriaDatePicker ref={focusRef} {...props} isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)} className={cx("plumb-field", className)} data-size={size}>
      <FieldLabel label={label} optional={optional} labelAside={labelAside} />
      <Group className={cx("plumb-field-group")}>
        <DateInput className={cx("plumb-date-input")}>
          {(segment) => <DateSegment segment={segment} className={cx("plumb-date-segment")} />}
        </DateInput>
        <AriaButton className={cx("plumb-clear")} aria-label={t("openCalendar")}><CalendarDays size={16} aria-hidden /></AriaButton>
      </Group>
      <FieldFoot description={description} errorMessage={errorMessage} />
      <Popover className={cx("plumb-popover plumb-calendar-popover")} offset={6}>
        <AriaDialog className={cx("plumb-calendar-dialog")}>
          <CalendarBody />
        </AriaDialog>
      </Popover>
    </AriaDatePicker>
  );
}
