import { styleIcon } from "../icons";
import { type ReactNode } from "react";
import { Menu as AriaMenu, MenuItem as AriaMenuItem, Popover as AriaPopover, MenuTrigger, Separator, type Key } from "react-aria-components";
import { cx } from "../cx";
export interface MenuItemSpec {
    id: Key;
    label: string;
    icon?: ReactNode;
    description?: string;
    danger?: boolean;
    disabled?: boolean;
    separatorBefore?: boolean;
    /** Navigates instead of calling onAction. */
    href?: string;
}
export interface MenuProps {
    trigger: ReactNode;
    items: MenuItemSpec[];
    onAction?: (id: Key) => void;
    "aria-label"?: string;
    placement?: "bottom start" | "bottom end" | "top start" | "top end";
    className?: string;
}
/** Actions in a popover menu, opened from any trigger. Use for secondary actions, not navigation. */
export function Menu({ trigger, items, onAction, placement = "bottom end", className, ...props }: MenuProps) {
    return (<MenuTrigger>
      {trigger}
      <AriaPopover className={cx("plumb-popover")} placement={placement} offset={4}>
        <AriaMenu {...props} className={cx("plumb-menu", className)} onAction={onAction} disabledKeys={items.filter((i) => i.disabled).map((i) => i.id)}>
          {items.flatMap((i) => [
            ...(i.separatorBefore ? [<Separator key={`${i.id}-sep`} className={cx("plumb-menu-separator")}/>] : []),
            <AriaMenuItem key={i.id} id={i.id} href={i.href} textValue={i.label} className={cx("plumb-item")} data-danger={i.danger || undefined}>
              {styleIcon(i.icon)}
              <span className={cx("plumb-element-span")}>
                {i.label}
                {i.description && <span className={cx("plumb-element-span", "plumb-item-description")}>{i.description}</span>}
              </span>
            </AriaMenuItem>,
        ])}
        </AriaMenu>
      </AriaPopover>
    </MenuTrigger>);
}
