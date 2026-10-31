import { Search,X } from "../icons";
import { type ReactNode,type Ref } from "react";
import {
Button as AriaButton,
SearchField as AriaSearchField,
Group,
Input,
type SearchFieldProps as AriaSearchFieldProps
} from "react-aria-components";
import { cx } from "../cx";
import { FieldFoot,FieldLabel,type FieldChrome } from "../field-chrome";
import { useMessages } from "../locale";

export interface SearchFieldProps extends Omit<AriaSearchFieldProps, "className">, Partial<Pick<FieldChrome, "description" | "size" | "className" | "inputRef">> {
  label?: ReactNode;
  placeholder?: string;
}
/** Text search with a clear button; Esc clears. */
export function SearchField({ inputRef, className, label, description, size = "md", placeholder: ph, ...props }: SearchFieldProps) {
  const { t } = useMessages();
  const placeholder = ph ?? t("search");
  return (
    <AriaSearchField {...props} aria-label={label ? undefined : props["aria-label"] ?? placeholder} className={cx("plumb-field plumb-searchfield", className)} data-size={size}>
      {label && <FieldLabel label={label} />}
      <Group className={cx("plumb-field-group")}>
        <Search className={cx("plumb-search-icon")} aria-hidden />
        <Input ref={inputRef as Ref<HTMLInputElement & HTMLTextAreaElement>} className={cx("plumb-input")} placeholder={placeholder} />
        <AriaButton className={cx("plumb-clear")}><X size={14} aria-hidden /></AriaButton>
      </Group>
      <FieldFoot description={description} />
    </AriaSearchField>
  );
}
