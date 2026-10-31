import { ArrowDown,ArrowUp } from "../icons";
import { useMemo,useState,type ReactNode } from "react";
import {
Table as AriaTable,
Cell,
Column,
Row,
TableBody,
TableHeader,
type Key,
type Selection,
type SortDescriptor,
} from "react-aria-components";
import { cx } from "../cx";
import { Skeleton } from "../feedback";
import { Checkbox } from "../fields";
import { useCollator,useMessages } from "../locale";

export interface TableColumn<T> {
  id: string;
  label: ReactNode;
  /** Right-align numeric columns. */
  align?: "start" | "end";
  isRowHeader?: boolean;
  width?: number;
  /** Provide to allow sorting by this column. */
  sortValue?: (row: T) => string | number | null;
  render: (row: T) => ReactNode;
}
export interface TableProps<T extends { id: Key }> {
  "aria-label": string;
  columns: TableColumn<T>[];
  rows: T[];
  density?: "comfortable" | "compact";
  selectionMode?: "none" | "single" | "multiple";
  selectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;
  defaultSelectedKeys?: Iterable<Key>;
  disabledKeys?: Iterable<Key>;
  /** Enter or click on a row: open a drawer, navigate, etc. */
  onRowAction?: (key: Key) => void;
  emptyState?: ReactNode;
  /** Controlled sort; omit for built-in sorting state. */
  sortDescriptor?: SortDescriptor;
  onSortChange?: (d: SortDescriptor) => void;
  /** Shows skeleton rows and marks the table busy. */
  isLoading?: boolean;
  /** `auto` stacks rows as labelled cards below 640px; `table` always keeps columns. */
  layout?: "auto" | "table";
  /** Keeps the header visible while scrolling long lists (rate libraries). */
  stickyHeader?: boolean;
  /** Values the cells render from besides the row itself (view mode, currency…); cells re-render when they change. */
  dependencies?: unknown[];
  className?: string;
}
/** Accessible data table with optional sorting; unknown values sort last. */
export function Table<T extends { id: Key }>({ columns, rows, density = "comfortable", emptyState, sortDescriptor, onSortChange, isLoading, layout = "auto", stickyHeader, dependencies = [], className, ...props }: TableProps<T>) {
  const multi = props.selectionMode === "multiple";
  const allColumns = useMemo(() => (multi ? [{ id: "__select", label: "", render: () => null } as TableColumn<T>, ...columns] : columns), [multi, columns]);
  // React Aria caches rows by row object; anything else a cell renders from must invalidate that cache.
  const deps = [allColumns, ...dependencies];
  const [ownSort, setOwnSort] = useState<SortDescriptor>();
  const sort = sortDescriptor ?? ownSort;
  const setSort = (d: SortDescriptor) => (onSortChange ? onSortChange(d) : setOwnSort(d));
  const collator = useCollator();
  const { t } = useMessages();
  const sorted = useMemo(() => {
    const col = columns.find((c) => c.id === sort?.column);
    if (!col?.sortValue || !sort) return rows;
    const dir = sort.direction === "descending" ? -1 : 1;
    return [...rows].sort((a, b) => {
      const x = col.sortValue!(a);
      const y = col.sortValue!(b);
      if (x === null && y === null) return 0;
      if (x === null) return 1;
      if (y === null) return -1;
      const c = typeof x === "number" && typeof y === "number" ? x - y : collator.compare(String(x), String(y));
      return c * dir;
    });
  }, [rows, columns, sort, collator]);
  return (
    <div className={cx("plumb-element-div", cx("plumb-table-wrap", className))} aria-busy={isLoading || undefined}>
      <AriaTable {...props} className={cx("plumb-table")} data-density={density} data-layout={layout} data-sticky={stickyHeader || undefined} sortDescriptor={sort} onSortChange={setSort}>
        <TableHeader columns={allColumns}>
          {(c) => c.id === "__select" ? (
            <Column id="__select" className={cx("plumb-column plumb-select-col")}><Checkbox slot="selection" /></Column>
          ) : (
            <Column
              id={c.id}
              isRowHeader={c.isRowHeader}
              allowsSorting={!!c.sortValue}
              width={c.width}
              className={cx("plumb-column")}
              data-align={c.align}
            >
              {({ sortDirection }) => (
                <span className={cx("plumb-element-span", "plumb-column-inner")}>
                  {c.label}
                  {sortDirection === "ascending" && <ArrowUp aria-hidden />}
                  {sortDirection === "descending" && <ArrowDown aria-hidden />}
                </span>
              )}
            </Column>
          )}
        </TableHeader>
        <TableBody
          items={isLoading ? [] : sorted}
          dependencies={deps}
          renderEmptyState={isLoading ? () => <div className={cx("plumb-element-div", "plumb-table-loading")} role="status"><span className={cx("plumb-element-span", "plumb-sr-only")}>{t("loadingRows")}</span>{[0, 1, 2].map((i) => <Skeleton key={i} height={16} />)}</div> : emptyState ? () => emptyState : undefined}
        >
          {(row) => (
            <Row id={row.id} columns={allColumns} dependencies={deps} className={cx("plumb-row")}>
              {(c) => c.id === "__select" ? (
                <Cell className={cx("plumb-cell plumb-select-col")}><Checkbox slot="selection" /></Cell>
              ) : (
                <Cell className={cx("plumb-cell")} data-align={c.align} data-label={typeof c.label === "string" ? c.label : undefined}>
                  {c.render(row)}
                </Cell>
              )}
            </Row>
          )}
        </TableBody>
      </AriaTable>
    </div>
  );
}
