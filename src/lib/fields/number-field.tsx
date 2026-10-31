import { Minus,Plus } from "../icons";
import { type ReactNode,type Ref } from "react";
import {
Button as AriaButton,
NumberField as AriaNumberField,
Group,
Input,
type NumberFieldProps as AriaNumberFieldProps
} from "react-aria-components";
import { cx } from "../cx";
import { FieldFoot,FieldLabel,type FieldChrome } from "../field-chrome";
import { useMessages } from "../locale";

export interface NumberFieldProps extends Omit<AriaNumberFieldProps, "className">, FieldChrome {
  /** Unit shown inside the field, e.g. "m²", "hr", "lot". */
  unit?: string;
  /** Shown before the value, e.g. "$". Prefer `formatOptions` currency where possible. */
  prefix?: ReactNode;
  placeholder?: string;
  /** Hide −/+ buttons for money and large values. */
  hideStepper?: boolean;
  /** `inline` for table cells: no edge until hover or focus; empty fields keep their edge as a prompt. */
  variant?: "default" | "inline";
}
/** Locale-aware numeric input for quantities, rates, and currency. */
export function NumberField({ inputRef, className, label, description, errorMessage, optional, labelAside, size = "md", unit, prefix, placeholder, hideStepper, variant = "default", ...props }: NumberFieldProps) {
  const { t } = useMessages();
  return (
    <AriaNumberField {...props} isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)} className={cx("plumb-field", className)} data-size={size} data-variant={variant}>
      <FieldLabel label={label} optional={optional} labelAside={labelAside} />
      <Group className={cx("plumb-field-group")}>
        {prefix && <span className={cx("plumb-element-span", "plumb-field-affix")} aria-hidden>{prefix}</span>}
        <Input ref={inputRef as Ref<HTMLInputElement & HTMLTextAreaElement>} className={cx("plumb-input plumb-num")} placeholder={placeholder} />
        {unit && <span className={cx("plumb-element-span", "plumb-field-affix")} aria-hidden>{unit}</span>}
        {!hideStepper && (
          <div className={cx("plumb-element-div", "plumb-stepper")}>
            <AriaButton slot="decrement" className={cx("plumb-step")}><Minus aria-hidden /></AriaButton>
            <AriaButton slot="increment" className={cx("plumb-step")}><Plus aria-hidden /></AriaButton>
          </div>
        )}
      </Group>
      {/* The unit is always part of the accessible description, even when a visible description is given. */}
      <FieldFoot description={description} hiddenDescription={unit ? t("unitIs", { unit }) : undefined} errorMessage={errorMessage} />
    </AriaNumberField>
  );
}
