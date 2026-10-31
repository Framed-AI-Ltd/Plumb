import {
Tag as AriaTag,
Label,
TagGroup,
TagList,
type Key,
type Selection
} from "react-aria-components";
import { cx } from "../cx";

/* ---------- Filter chips ---------- */
export interface FilterChipsProps {
  label: string;
  items: { id: Key; label: string; count?: number }[];
  selectedKeys?: Selection;
  defaultSelectedKeys?: Iterable<Key>;
  onSelectionChange?: (keys: Selection) => void;
  selectionMode?: "single" | "multiple";
}
/** Quick filters for lists: document type, room, trade, status. */
export function FilterChips({ label, items, selectionMode = "multiple", className, ...props }: FilterChipsProps & { className?: string }) {
  return (
    <TagGroup {...props} selectionMode={selectionMode} className={cx("plumb-chips", className)}>
      <Label className={cx("plumb-sr-only")}>{label}</Label>
      <TagList items={items} className={cx("plumb-chip-list")}>
        {(item) => (
          <AriaTag id={item.id} textValue={item.label} className={cx("plumb-chip")}>
            {item.label}
            {item.count !== undefined && <span className={cx("plumb-element-span", "plumb-chip-count")}>{item.count}</span>}
          </AriaTag>
        )}
      </TagList>
    </TagGroup>
  );
}
