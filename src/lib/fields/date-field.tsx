import {
DateField as AriaDateField,
DateInput,
DateSegment,
type DateFieldProps as AriaDateFieldProps,
type DateValue
} from "react-aria-components";
import { cx } from "../cx";
import { FieldFoot,FieldLabel,useFieldFocus,type FieldChrome } from "../field-chrome";

export interface DateFieldProps<T extends DateValue> extends Omit<AriaDateFieldProps<T>, "className">, FieldChrome {}
/** Segmented, locale-aware date entry. */
export function DateField<T extends DateValue>({ inputRef, className, label, description, errorMessage, optional, labelAside, size = "md", ...props }: DateFieldProps<T>) {
  const focusRef = useFieldFocus(inputRef, "[role=spinbutton]");
  return (
    <AriaDateField ref={focusRef} {...props} isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)} className={cx("plumb-field", className)} data-size={size}>
      <FieldLabel label={label} optional={optional} labelAside={labelAside} />
      <DateInput className={cx("plumb-field-group plumb-date-input")}>
        {(segment) => <DateSegment segment={segment} className={cx("plumb-date-segment")} />}
      </DateInput>
      <FieldFoot description={description} errorMessage={errorMessage} />
    </AriaDateField>
  );
}
