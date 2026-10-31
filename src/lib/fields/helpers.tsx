import { styleIcon } from "../icons";
import { cx } from "../styles/classes";
import { Check } from "../icons";
import { ListBoxItem } from "react-aria-components";
import type { SelectOption } from "./types";
export function OptionItem({ o }: {
    o: SelectOption;
}) {
    return (<ListBoxItem id={o.id} textValue={o.label} className={cx("plumb-item")}>
      {styleIcon(o.icon)}
      <span style={{ flex: 1 }} className={cx("plumb-element-span")}>
        {o.label}
        {o.description && <span className={cx("plumb-element-span", "plumb-item-description")}>{o.description}</span>}
      </span>
      <Check className={cx("plumb-check")} aria-hidden/>
    </ListBoxItem>);
}
