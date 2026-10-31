import { styleIcon } from "../icons";
// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import { Check, ChevronsUpDown, X } from "../icons";
import { useState } from "react";
import { Button as AriaButton, Select as AriaSelect, Tag as AriaTag, ListBox, ListBoxItem, Popover, SelectValue, TagGroup, TagList, type Key } from "react-aria-components";
import { cx } from "../cx";
import { FieldFoot, FieldLabel, useFieldFocus, type FieldChrome } from "../field-chrome";
import { type SelectOption } from "../fields";
import { useMessages } from "../locale";
/* ---------- Several choices from a long list ---------- */
export interface MultiSelectProps extends FieldChrome {
    /** Submitted with the form as one value per selected key. */
    name?: string;
    isInvalid?: boolean;
    options: SelectOption[];
    value?: Key[];
    defaultValue?: Key[];
    onChange?: (value: Key[]) => void;
    placeholder?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    "aria-label"?: string;
}
/** Choose several from a list (trades, service areas, roles). Chosen items show as removable tags below. */
export function MultiSelect({ inputRef, label, description, errorMessage, optional, labelAside, size = "md", className, options, value, defaultValue, onChange, placeholder, isDisabled, isRequired, isInvalid, name, ...aria }: MultiSelectProps) {
    const focusRef = useFieldFocus(inputRef, ".plumb-select-trigger");
    const { t, plural } = useMessages();
    const [own, setOwn] = useState<Key[]>(defaultValue ?? []);
    const selected = value ?? own;
    const set = (v: Key[]) => { if (value === undefined)
        setOwn(v); onChange?.(v); };
    return (<div className={cx("plumb-element-div", cx("plumb-multiselect", className))}>
      <AriaSelect ref={focusRef} selectionMode="multiple" value={selected} onChange={(v) => set([...(v as Key[])])} isDisabled={isDisabled} isRequired={isRequired} name={name} isInvalid={isInvalid ?? (errorMessage ? true : undefined)} placeholder={placeholder ?? t("choose")} className={cx("plumb-field")} data-size={size} aria-label={aria["aria-label"]}>
        <FieldLabel label={label} optional={optional} labelAside={labelAside}/>
        <AriaButton className={cx("plumb-input plumb-select-trigger")}>
          <SelectValue className={cx("plumb-select-value")}>{({ isPlaceholder, defaultChildren }) => (isPlaceholder ? defaultChildren : plural("nSelected", selected.length))}</SelectValue>
          <ChevronsUpDown aria-hidden/>
        </AriaButton>
        <FieldFoot description={description} errorMessage={errorMessage}/>
        <Popover className={cx("plumb-popover")} offset={6}>
          <ListBox className={cx("plumb-listbox")} items={options}>
            {(o) => (<ListBoxItem id={o.id} textValue={o.label} className={cx("plumb-item")}>
                {styleIcon(o.icon)}<span className={cx("plumb-element-span", "plumb-grow")}>{o.label}{o.description && <span className={cx("plumb-element-span", "plumb-item-description")}>{o.description}</span>}</span><Check className={cx("plumb-check")} aria-hidden/>
              </ListBoxItem>)}
          </ListBox>
        </Popover>
      </AriaSelect>
      {selected.length > 0 && (<TagGroup aria-label={t("selectedItems")} onRemove={isDisabled ? undefined : (keys) => set(selected.filter((k) => !keys.has(k)))} className={cx("plumb-chips")}>
          <TagList className={cx("plumb-chip-list")} items={options.filter((o) => selected.includes(o.id))}>
            {(o) => (<AriaTag id={o.id} textValue={o.label} className={cx("plumb-chip plumb-chip-removable")}>
                {o.label}
                {!isDisabled && <AriaButton slot="remove" className={cx("plumb-chip-remove")} aria-label={t("removeName", { name: o.label })}><X size={12} aria-hidden/></AriaButton>}
              </AriaTag>)}
          </TagList>
        </TagGroup>)}
    </div>);
}
