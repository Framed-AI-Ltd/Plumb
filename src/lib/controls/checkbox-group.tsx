// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import { type ReactNode } from "react";
import {
CheckboxGroup as AriaCheckboxGroup,
type CheckboxGroupProps as AriaCheckboxGroupProps
} from "react-aria-components";
import { cx } from "../cx";
import { FieldFoot,FieldLabel,useFieldFocus,type FieldChrome } from "../field-chrome";
import { Checkbox } from "../fields";

/* ---------- Checkbox group ---------- */
export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, "className" | "children">, Omit<FieldChrome, "size"> {
  options: { value: string; label: ReactNode; description?: ReactNode; isDisabled?: boolean }[];
  /** `row` lays short options side by side. */
  orientation?: "column" | "row";
}
/** Several independent choices under one label: notification channels, trades, document types. */
export function CheckboxGroup({ inputRef, label, description, errorMessage, optional, labelAside, options, orientation = "column", className, ...props }: CheckboxGroupProps) {
  const focusRef = useFieldFocus(inputRef, "input[type=checkbox]");
  return (
    <AriaCheckboxGroup ref={focusRef} {...props} isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)} className={cx("plumb-radio-group", className)}>
      <FieldLabel label={label} optional={optional} labelAside={labelAside} />
      <div className={cx("plumb-element-div", "plumb-radio-options")} data-orientation={orientation}>
        {options.map((o) => <Checkbox key={o.value} value={o.value} description={o.description} isDisabled={o.isDisabled}>{o.label}</Checkbox>)}
      </div>
      <FieldFoot description={description} errorMessage={errorMessage} />
    </AriaCheckboxGroup>
  );
}
