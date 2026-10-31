import { styleIcon } from "../icons";
import { type ReactNode } from "react";
import { ListBox, ListBoxItem } from "react-aria-components";
import { cx } from "../cx";
export interface NavListItem {
    id: string;
    label: string;
    description?: ReactNode;
    icon?: ReactNode;
    count?: ReactNode;
}
export interface NavListProps {
    "aria-label": string;
    items: NavListItem[];
    selectedKey?: string | null;
    onSelectionChange: (id: string) => void;
    /** Shown when there are no items. */
    emptyState?: ReactNode;
    className?: string;
}
/** A selectable list for the list side of a list-and-detail page (inbox, documents). Arrow keys move; Enter opens. */
export function NavList({ items, selectedKey, onSelectionChange, emptyState, className, ...aria }: NavListProps) {
    return (<ListBox {...aria} items={items} selectionMode="single" disallowEmptySelection={false} className={cx("plumb-navlist", className)} selectedKeys={selectedKey ? [selectedKey] : []} onAction={(k) => onSelectionChange(String(k))} onSelectionChange={(keys) => { const [k] = keys === "all" ? [] : [...keys]; if (k !== undefined)
        onSelectionChange(String(k)); }} renderEmptyState={emptyState ? () => emptyState : undefined}>
      {(item) => (<ListBoxItem id={item.id} textValue={item.label} className={cx("plumb-navlist-item")}>
          {styleIcon(item.icon)}
          <span className={cx("plumb-element-span", "plumb-navlist-text")}><span className={cx("plumb-element-span", "plumb-label")}>{item.label}</span>{item.description && <span className={cx("plumb-element-span", "plumb-item-description")}>{item.description}</span>}</span>
          {item.count !== undefined && <span className={cx("plumb-element-span", "plumb-navlink-count")}>{item.count}</span>}
        </ListBoxItem>)}
    </ListBox>);
}
