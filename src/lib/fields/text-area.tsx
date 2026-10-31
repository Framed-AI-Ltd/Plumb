import { type Ref } from "react";
import {
TextArea as AriaTextArea,
TextField as AriaTextField
} from "react-aria-components";
import { cx } from "../cx";
import { FieldFoot,FieldLabel } from "../field-chrome";
import type { TextFieldProps } from "./text-field";

/** Multi-line text with label, description, and error. */
export function TextArea({ inputRef, className, label, description, errorMessage, optional, labelAside, placeholder, ...props }: Omit<TextFieldProps, "prefix" | "suffix" | "size">) {
  return (
    <AriaTextField {...props} isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)} className={cx("plumb-field", className)}>
      <FieldLabel label={label} optional={optional} labelAside={labelAside} />
      <AriaTextArea ref={inputRef as Ref<HTMLInputElement & HTMLTextAreaElement>} className={cx("plumb-input")} placeholder={placeholder} />
      <FieldFoot description={description} errorMessage={errorMessage} />
    </AriaTextField>
  );
}
