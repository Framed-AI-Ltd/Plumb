import { ChevronsUpDown } from "../icons";
import {
Button as AriaButton,
Select as AriaSelect,
ListBox,
Popover,
SelectValue,
type SelectProps as AriaSelectProps
} from "react-aria-components";
import { cx } from "../cx";
import { FieldFoot,FieldLabel,useFieldFocus,type FieldChrome } from "../field-chrome";
import { useMessages } from "../locale";
import { OptionItem } from "./helpers";
import type { SelectOption } from "./types";

export interface SelectProps extends Omit<AriaSelectProps<SelectOption>, "className" | "children">, FieldChrome {
  options: SelectOption[];
  placeholder?: string;
}
/** One choice from a list in a popover. Use ComboBox when people need to type to filter. */
export function Select({ inputRef, className, label, description, errorMessage, optional, labelAside, size = "md", options, placeholder, ...props }: SelectProps) {
  const focusRef = useFieldFocus(inputRef, ".plumb-select-trigger");
  const { t } = useMessages();
  return (
    <AriaSelect ref={focusRef} {...props} isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)} placeholder={placeholder ?? t("choose")} className={cx("plumb-field", className)} data-size={size}>
      <FieldLabel label={label} optional={optional} labelAside={labelAside} />
      <AriaButton className={cx("plumb-input plumb-select-trigger")}>
        <SelectValue className={cx("plumb-select-value")} />
        <ChevronsUpDown aria-hidden />
      </AriaButton>
      <FieldFoot description={description} errorMessage={errorMessage} />
      <Popover className={cx("plumb-popover")} offset={6}>
        <ListBox className={cx("plumb-listbox")} items={options}>
          {(o) => <OptionItem o={o} />}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
