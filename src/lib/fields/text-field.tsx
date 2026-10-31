import { type ReactNode,type Ref } from "react";
import {
TextField as AriaTextField,
Group,
Input,
type TextFieldProps as AriaTextFieldProps
} from "react-aria-components";
import { cx } from "../cx";
import { FieldFoot,FieldLabel,type FieldChrome } from "../field-chrome";

export interface TextFieldProps extends Omit<AriaTextFieldProps, "className">, FieldChrome {
  placeholder?: string;
  /** Text shown inside the field before the value, e.g. "BP-". */
  prefix?: ReactNode;
  suffix?: ReactNode;
}
/** Single-line text with label, description, error, and optional prefix/suffix. */
export function TextField({ inputRef, className, label, description, errorMessage, optional, labelAside, size = "md", placeholder, prefix, suffix, ...props }: TextFieldProps) {
  return (
    <AriaTextField {...props} isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)} className={cx("plumb-field", className)} data-size={size}>
      <FieldLabel label={label} optional={optional} labelAside={labelAside} />
      {prefix || suffix ? (
        <Group className={cx("plumb-field-group")}>
          {prefix && <span className={cx("plumb-element-span", "plumb-field-affix")} aria-hidden>{prefix}</span>}
          <Input ref={inputRef as Ref<HTMLInputElement & HTMLTextAreaElement>} className={cx("plumb-input")} placeholder={placeholder} />
          {/* Text affixes are decoration (the label says it all); interactive ones, like a show-password toggle, stay reachable. */}
          {suffix && <span className={cx("plumb-element-span", "plumb-field-affix")} aria-hidden={typeof suffix === "string" || undefined}>{suffix}</span>}
        </Group>
      ) : (
        <Input ref={inputRef as Ref<HTMLInputElement & HTMLTextAreaElement>} className={cx("plumb-input")} placeholder={placeholder} />
      )}
      <FieldFoot description={description} errorMessage={errorMessage} />
    </AriaTextField>
  );
}
