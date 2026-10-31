// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import {
TimeField as AriaTimeField,
DateInput,
DateSegment,
type TimeFieldProps as AriaTimeFieldProps,
type TimeValue
} from "react-aria-components";
import { cx } from "../cx";
import { FieldFoot,FieldLabel,useFieldFocus,type FieldChrome } from "../field-chrome";

/* ---------- Time ---------- */
export interface TimeFieldProps<T extends TimeValue> extends Omit<AriaTimeFieldProps<T>, "className">, FieldChrome {}
/** Locale-aware time entry: crew hours, visit windows, inspection bookings (F-C54, F-C61). */
export function TimeField<T extends TimeValue>({ inputRef, className, label, description, errorMessage, optional, labelAside, size = "md", ...props }: TimeFieldProps<T>) {
  const focusRef = useFieldFocus(inputRef, "[role=spinbutton]");
  return (
    <AriaTimeField ref={focusRef} {...props} isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)} className={cx("plumb-field", className)} data-size={size}>
      <FieldLabel label={label} optional={optional} labelAside={labelAside} />
      <DateInput className={cx("plumb-field-group plumb-date-input")}>
        {(segment) => <DateSegment segment={segment} className={cx("plumb-date-segment")} />}
      </DateInput>
      <FieldFoot description={description} errorMessage={errorMessage} />
    </AriaTimeField>
  );
}
