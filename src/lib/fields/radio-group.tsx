import { type ReactNode } from "react";
import {
Radio as AriaRadio,
RadioGroup as AriaRadioGroup,
type RadioGroupProps as AriaRadioGroupProps
} from "react-aria-components";
import { cx } from "../cx";
import { FieldFoot,FieldLabel,useFieldFocus,type FieldChrome } from "../field-chrome";

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, "className" | "children">, Omit<FieldChrome, "size"> {
  options: { value: string; label: ReactNode; description?: ReactNode }[];
  /** `cards` renders each option as a selectable tile (pricing basis, base vs upgrade). */
  variant?: "list" | "cards";
}
/** One choice from a short list; `cards` shows each option as a tile. */
export function RadioGroup({ inputRef, label, description, errorMessage, optional, labelAside, options, variant = "list", className, ...props }: RadioGroupProps) {
  const focusRef = useFieldFocus(inputRef, "input[type=radio]:checked", "input[type=radio]");
  return (
    <AriaRadioGroup ref={focusRef} {...props} isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)} className={cx("plumb-radio-group", className)} data-variant={variant}>
      <FieldLabel label={label} optional={optional} labelAside={labelAside} />
      <div className={cx("plumb-element-div", "plumb-radio-options")}>
        {options.map((o) => (
          <AriaRadio key={o.value} value={o.value} className={cx("plumb-check-row")}>
            <span className={cx("plumb-element-span", "plumb-box")} data-shape="radio" aria-hidden />
            <span className={cx("plumb-element-span")}>
              {o.label}
              {o.description && <span className={cx("plumb-element-span", "plumb-item-description")}>{o.description}</span>}
            </span>
          </AriaRadio>
        ))}
      </div>
      <FieldFoot description={description} errorMessage={errorMessage} />
    </AriaRadioGroup>
  );
}
