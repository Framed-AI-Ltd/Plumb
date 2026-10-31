import { styleIcon } from "../icons";
import { type ReactNode } from "react";
import { ToggleButton, ToggleButtonGroup, type Key } from "react-aria-components";
import { cx } from "../cx";
export interface SegmentedControlProps {
    "aria-label": string;
    /** `sm` matches small fields. */
    size?: "sm" | "md";
    options: {
        id: Key;
        label: ReactNode;
        icon?: ReactNode;
    }[];
    selectedKey?: Key;
    defaultSelectedKey?: Key;
    onSelectionChange?: (key: Key) => void;
}
/** Single-choice view switcher (e.g. contractor vs customer view). */
export function SegmentedControl({ options, selectedKey, defaultSelectedKey, onSelectionChange, className, size = "md", ...props }: SegmentedControlProps & {
    className?: string;
}) {
    return (<ToggleButtonGroup {...props} className={cx("plumb-segmented", className)} data-size={size} selectionMode="single" disallowEmptySelection selectedKeys={selectedKey === undefined ? undefined : [selectedKey]} defaultSelectedKeys={defaultSelectedKey === undefined ? undefined : [defaultSelectedKey]} onSelectionChange={(keys) => {
            const [first] = keys;
            if (first !== undefined)
                onSelectionChange?.(first);
        }}>
      {options.map((o) => (<ToggleButton key={o.id} id={o.id} className={cx("plumb-segment plumb-focusable")}>
          {styleIcon(o.icon)}
          {o.label}
        </ToggleButton>))}
    </ToggleButtonGroup>);
}
