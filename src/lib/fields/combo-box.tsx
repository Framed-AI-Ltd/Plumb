import * as stylex from "@stylexjs/stylex";
import { tokens } from "../theme/tokens.stylex";
import { ChevronsUpDown } from "../icons";
import { type Ref } from "react";
import {
Button as AriaButton,
ComboBox as AriaComboBox,
Group,
Input,
ListBox,
Popover,
type ComboBoxProps as AriaComboBoxProps
} from "react-aria-components";
import { cx } from "../cx";
import { FieldFoot,FieldLabel,type FieldChrome } from "../field-chrome";
import { useMessages } from "../locale";
import { OptionItem } from "./helpers";
import type { SelectOption } from "./types";

export interface ComboBoxProps extends Omit<AriaComboBoxProps<SelectOption>, "className" | "children">, FieldChrome {
  options: SelectOption[];
  placeholder?: string;
}
/** Type-to-filter picker for long lists: contacts, rates, assemblies, rooms. */
export function ComboBox({ inputRef, className, label, description, errorMessage, optional, labelAside, size = "md", options, placeholder, ...props }: ComboBoxProps) {
  const { t } = useMessages();
  return (
    <AriaComboBox {...props} isInvalid={props.isInvalid ?? (errorMessage ? true : undefined)} defaultItems={options} className={cx("plumb-field", className)} data-size={size}>
      <FieldLabel label={label} optional={optional} labelAside={labelAside} />
      <Group className={cx("plumb-field-group")}>
        <Input ref={inputRef as Ref<HTMLInputElement & HTMLTextAreaElement>} className={cx("plumb-input")} placeholder={placeholder} />
        <AriaButton className={cx("plumb-clear")} aria-label={t("showOptions")}><ChevronsUpDown size={16} aria-hidden /></AriaButton>
      </Group>
      <FieldFoot description={description} errorMessage={errorMessage} />
      <Popover className={cx("plumb-popover")} offset={6}>
        <ListBox className={cx("plumb-listbox")} renderEmptyState={() => <div className={[cx("plumb-element-div", "plumb-item"), stylex.props(styles.noMatches).className].join(" ")}>{t("noMatches")}</div>}>
          {(o: SelectOption) => <OptionItem o={o} />}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
}

const styles = stylex.create({ noMatches: { color: tokens.textSecondary } });
