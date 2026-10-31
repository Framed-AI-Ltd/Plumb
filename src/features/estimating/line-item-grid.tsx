import { cx } from "../../lib/styles/classes";
// Editable estimate grid (F-C13, F-C20, F-C25, F-C26).
import { NumberParser } from "@internationalized/number";
import { Link2,Plus,Trash2,TriangleAlert } from "../../lib/icons";
import { Fragment,useEffect,useId,useMemo,useRef,useState,type KeyboardEvent,type ReactNode } from "react";
import { Button,IconButton } from "../../lib/actions";
import { EmptyState } from "../../lib/feedback";
import { useLocale,useMessages,useMoneyFormat,useNumberFormat } from "../../lib/locale";
import { toast } from "../../lib/structure";
import { Money,Unknown } from "../domain";
import { ItemKind,lineItemKinds,useItemKindLabel,type LineItemKind } from "../framed";
import { RatePicker,type RateEntry } from "../scope";
import { lineAmount } from "./line-amount";
import type { LineItemRow } from "./types";

export type Col = "label" | "qty" | "unit" | "rate" | "kind";
export const editable: Col[] = ["label", "qty", "unit", "rate", "kind"];
// Navigable columns: the editable ones, then Amount (read-only) and Remove.
export const amountCol = editable.length;
export const removeCol = editable.length + 1;
export const navCols = editable.length + 2;
export interface LineItemGridProps {
  "aria-label": string;
  rows: LineItemRow[];
  onRowsChange: (rows: LineItemRow[]) => void;
  /** Units offered in the unit cell, e.g. ["lot", "hr", "m²", "lin m", "ea"]. */
  units: string[];
  /** Group rows (room or trade) with a subtotal per group. */
  groupBy?: boolean;
  currency?: string;
  onAddRow?: () => void;
  /** The firm's rate library. When given, editing a rate offers library rates (typing a number still works). */
  rates?: RateEntry[];
}
/**
 * Spreadsheet-style editing with WAI-ARIA grid keyboard support: arrows move, Enter or F2 edits, Enter commits and
 * moves down, Esc cancels, Tab commits and leaves the cell. Unknown quantities and rates stay unknown.
 */
export function LineItemGrid({ rows, onRowsChange, units, groupBy, currency, onAddRow, rates, ...aria }: LineItemGridProps) {
  const [rawActive, setActive] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [editTarget, setEditTarget] = useState<{ id: string; col: Col } | null>(null);
  const editing = editTarget !== null && rows.some((row) => row.id === editTarget.id);
  // Cancel a removed row before rendering another editor at its old position.
  if (editTarget && !editing) setEditTarget(null);
  const [draft, setDraft] = useState("");
  const [invalid, setInvalid] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);
  const rowsRef = useRef(rows);
  useEffect(() => { rowsRef.current = rows; });
  const gridId = useId();
  const { locale } = useLocale();
  const money = useMoneyFormat(currency);
  const { t } = useMessages();
  const kindLabel = useItemKindLabel();
  const pct = useNumberFormat(useMemo(() => ({ style: "percent", maximumFractionDigits: 1 }), []));
  const num = useNumberFormat(useMemo(() => ({ maximumFractionDigits: 2 }), []));
  const plainNum = useNumberFormat(useMemo(() => ({ maximumFractionDigits: 6, useGrouping: false }), []));
  const parser = useMemo(() => new NumberParser(locale, { maximumFractionDigits: 6 }), [locale]);
  const amount = lineAmount;
  const counts = (r: LineItemRow) => r.kind !== "option" && r.kind !== "excluded";
  const groups = useMemo(() => {
    if (!groupBy) return [{ name: "", rows: rows.map((row, i) => ({ row, i })) }];
    const map = new Map<string, { row: LineItemRow; i: number }[]>();
    rows.forEach((row, i) => map.set(row.group ?? t("otherGroup"), [...(map.get(row.group ?? t("otherGroup")) ?? []), { row, i }]));
    return [...map].map(([name, rs]) => ({ name, rows: rs }));
  }, [rows, groupBy, t]);
  // Navigation follows what's on screen (grouped order), not the array order.
  const order = useMemo(() => groups.flatMap((g) => g.rows.map((x) => x.i)), [groups]);
  const visualIndex = useMemo(() => new Map(order.map((i, v) => [i, v])), [order]);
  const rowIndex = useMemo(() => {
    const m = new Map<number, number>(); let n = 2; // header row is 1
    groups.forEach((g) => { if (groupBy) n++; g.rows.forEach((x) => m.set(x.i, n++)); });
    return { map: m, count: n - 1 };
  }, [groups, groupBy]);
  // Keep one cell tabbable even after rows are removed.
  const editRow = editTarget ? rows.findIndex((row) => row.id === editTarget.id) : -1;
  const active = editing
    ? { r: visualIndex.get(editRow)!, c: editable.indexOf(editTarget!.col) }
    : { r: Math.min(rawActive.r, Math.max(order.length - 1, 0)), c: rawActive.c };
  const rowAt = (v: number) => rows[order[v]];
  const subtotal = (rs: LineItemRow[]) => {
    const priced = rs.filter((r) => counts(r) && amount(r) !== null);
    return { sum: priced.reduce((a, r) => a + (amount(r) ?? 0), 0), partial: priced.length < rs.filter(counts).length, none: rs.filter(counts).length > 0 && priced.length === 0 };
  };
  const total = subtotal(rows);

  const focusCell = (r: number, c: number) => requestAnimationFrame(() => tableRef.current?.querySelector<HTMLElement>(`[data-cell="${r}-${c}"]`)?.focus());
  const valueFor = (row: LineItemRow, col: Col) =>
    col === "qty" || col === "rate" ? (row[col] === null ? "" : plainNum.format(row[col] as number)) : col === "kind" ? row.kind ?? "fixed" : String(row[col] ?? "");
  const startEdit = (seed?: string, position = active) => {
    const row = rowAt(position.r); const col = editable[position.c];
    if (!row || !col) return;
    setActive(position);
    setInvalid(false); setDraft(seed ?? valueFor(row, col)); setEditTarget({ id: row.id, col });
  };
  /** Returns false (editor stays open) when the number can't be read. */
  const commit = () => {
    const row = rows.find((r) => r.id === editTarget?.id);
    const col = editTarget?.col;
    if (!row || !col) { setEditTarget(null); setInvalid(false); return true; }
    let v: string | number | null = draft.trim();
    if (col === "qty" || col === "rate") {
      // Locale-aware: "2,5" is 2.5 in fr-CA. Empty means unknown, never 0.
      v = v === "" ? null : parser.parse(v);
      if (typeof v === "number" && Number.isNaN(v)) { setInvalid(true); return false; }
    }
    // A typed rate is no longer the library rate.
    onRowsChange(rows.map((r) => (r.id === row.id ? { ...r, [col]: v, ...(col === "rate" && v !== r.rate ? { rateId: undefined } : {}) } : r)));
    setActive(active); setEditTarget(null); setInvalid(false);
    return true;
  };
  // Delete clears the cell, like a spreadsheet; a cleared quantity or rate becomes Unknown, never 0.
  const clearCell = () => {
    const row = rowAt(active.r); const col = editable[active.c];
    if (!row || !col || col === "unit" || col === "kind") return;
    onRowsChange(rows.map((r) => (r.id === row.id ? { ...r, [col]: col === "label" ? "" : null, ...(col === "rate" ? { rateId: undefined } : {}) } : r)));
  };
  const remove = (v: number) => {
    const row = rowAt(v); if (!row) return;
    const at = rows.indexOf(row);
    onRowsChange(rows.filter((r) => r.id !== row.id));
    // Undo puts the line back where it was, keeping any edits made since.
    toast({ title: t("removedName", { name: row.label || t("line") }), action: { label: t("undo"), onAction: () => {
      const now = rowsRef.current;
      if (!now.some((r) => r.id === row.id)) onRowsChange([...now.slice(0, at), row, ...now.slice(at)]);
    } } });
    const next = Math.max(0, Math.min(v, order.length - 2));
    setActive({ r: next, c: active.c }); focusCell(next, active.c);
  };
  const move = (dr: number, dc: number) => {
    const r = Math.max(0, Math.min(order.length - 1, active.r + dr));
    const c = Math.max(0, Math.min(navCols - 1, active.c + dc));
    setActive({ r, c }); focusCell(r, c);
  };
  const onKey = (e: KeyboardEvent) => {
    if (editing) {
      // An open rate list handles its own keys (arrows, Enter to choose, Esc to close).
      if ((e.target as Element).getAttribute("aria-expanded") === "true") return;
      if (e.key === "Escape") { e.preventDefault(); setActive(active); setEditTarget(null); setInvalid(false); focusCell(active.r, active.c); }
      else if (e.key === "Enter") { e.preventDefault(); if (commit()) move(1, 0); }
      else if (e.key === "Tab") { if (!commit()) e.preventDefault(); }
      return;
    }
    const k: Record<string, () => void> = {
      ArrowDown: () => move(1, 0), ArrowUp: () => move(-1, 0), ArrowRight: () => move(0, 1), ArrowLeft: () => move(0, -1),
      Home: () => move(0, -navCols), End: () => move(0, navCols),
      Enter: () => (active.c === removeCol ? remove(active.r) : startEdit()), F2: () => startEdit(),
      Delete: () => (active.c === removeCol ? remove(active.r) : clearCell()),
      Backspace: () => (active.c === removeCol ? remove(active.r) : clearCell()),
    };
    if (e.key === "Backspace" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); remove(active.r); return; }
    if (k[e.key]) { e.preventDefault(); k[e.key](); }
    else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && ["label", "qty", "rate"].includes(editable[active.c])) { e.preventDefault(); startEdit(e.key); }
  };

  const cell = (row: LineItemRow, v: number, col: Col) => {
    const c = editable.indexOf(col);
    const isActive = active.r === v && active.c === c;
    const isEditing = editing && editTarget?.id === row.id && editTarget.col === col;
    const common = {
      role: "gridcell", "data-cell": `${v}-${c}`, tabIndex: isActive ? 0 : -1, "data-active": isActive || undefined,
      onFocus: () => setActive({ r: v, c }), onDoubleClick: () => startEdit(undefined, { r: v, c }),
      className: "plumb-grid-cell", "data-col": col,
    } as const;
    if (isEditing) {
      if (col === "unit" || col === "kind") {
        const opts = col === "unit" ? units : lineItemKinds;
        return (
          <td {...common} className={cx("plumb-element-td")}>
            {/* Changes apply on Enter, Tab, or leaving the cell; Esc cancels. */}
            {/* Editing a cell moves focus into its editor, as in a spreadsheet. */}
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <select autoFocus className={cx("plumb-element-select", "plumb-input plumb-grid-input")} aria-label={t(col === "unit" ? "unitFor" : "kindFor", { name: row.label })} value={draft}
              onChange={(e) => setDraft(e.target.value)} onBlur={() => editing && commit()}>
              {opts.map((o) => <option key={o} value={o} className={cx("plumb-element-option")}>{col === "kind" ? kindLabel(o as LineItemKind) : o}</option>)}
            </select>
          </td>
        );
      }
      if (col === "rate" && rates?.length) {
        // Choosing a library rate commits at once and links the line to it; typing a number and Enter still works.
        return (
          <td {...common} data-picker onBlur={(e) => { if (editing && !e.currentTarget.contains(e.relatedTarget as Node)) commit(); }} className={cx("plumb-element-td")}>
            <RatePicker aria-label={t("rateFor", { name: row.label })} size="sm" rates={rates} forUnit={row.unit} currency={currency} autoFocus allowsCustomValue defaultInputValue={draft} onInputChange={setDraft}
              onSelect={(r) => {
                onRowsChange(rows.map((x) => (x.id === row.id ? { ...x, rate: r.rate, rateId: r.id } : x)));
                setActive(active); setEditTarget(null); focusCell(active.r, active.c);
              }} />
          </td>
        );
      }
      const errId = `${row.id}-${col}-err`;
      return (
        <td {...common} className={cx("plumb-element-td")}>
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <input autoFocus className={cx("plumb-element-input", `plumb-input plumb-grid-input${col === "qty" || col === "rate" ? " plumb-num" : ""}`)} aria-label={t(col === "label" ? "itemFor" : col === "qty" ? "quantityFor" : "rateFor", { name: row.label })}
            inputMode={col === "qty" || col === "rate" ? "decimal" : undefined} value={draft} aria-invalid={invalid || undefined} aria-describedby={invalid ? errId : undefined}
            onChange={(e) => { setDraft(e.target.value); setInvalid(false); }} onBlur={() => editing && commit()} />
          {invalid && <span id={errId} className={cx("plumb-element-span", "plumb-field-error")} role="alert">{t("enterNumber")}</span>}
        </td>
      );
    }
    const display =
      col === "label" ? row.label
      : col === "qty" ? (row.qty === null ? <Unknown>{t("measure")}</Unknown> : <>{num.format(row.qty)}{row.waste ? <span className={cx("plumb-element-span", "plumb-grid-note")}>{t("plusWaste", { pct: pct.format(row.waste) })}</span> : null}</>)
      : col === "unit" ? row.unit
      : col === "rate" ? <RateCell row={row} rates={rates} currency={currency} />
      : <ItemKind kind={row.kind ?? "fixed"} inline />;
    return <td {...common} className={cx("plumb-element-td")}>{display}</td>;
  };
  const readCell = (v: number, c: number, children: ReactNode, extra?: string) => (
    <td role="gridcell" data-cell={`${v}-${c}`} data-col={c === amountCol ? "amount" : undefined} tabIndex={active.r === v && active.c === c ? 0 : -1} data-active={(active.r === v && active.c === c) || undefined}
      onFocus={() => setActive({ r: v, c })} className={cx("plumb-element-td", `plumb-grid-cell${extra ? ` ${extra}` : ""}`)}>{children}</td>
  );

  return (
    <div className={cx("plumb-element-div", "plumb-grid-wrap")}>
      {rows.length > 0 && <p className={cx("plumb-element-p", "plumb-grid-scroll-hint")}>{t("scrollGrid")}</p>}
      {!rows.length && <EmptyState icon={<Plus />} title={t("noLines")} action={onAddRow && <Button size="sm" variant="primary" icon={<Plus />} onPress={onAddRow}>{t("addLine")}</Button>}>{t("noLinesHelp")}</EmptyState>}
      <table ref={tableRef} role="grid" aria-describedby={`${gridId}-help`} className={cx("plumb-element-table", "plumb-table plumb-line-grid")} {...aria} onKeyDown={onKey} aria-rowcount={rowIndex.count}>
        <thead className={cx("plumb-element-thead")}>
          <tr role="row" className={cx("plumb-element-tr")}>
            {[t("item"), t("quantity"), t("unit"), t("rate"), t("kind"), t("amount"), ""].map((h, i) => (
              <th key={i} role="columnheader" className={cx("plumb-element-th", "plumb-column")} data-align={i === 1 || i === 3 || i === 5 ? "end" : undefined}>{h || <span className={cx("plumb-element-span", "plumb-sr-only")}>{t("actions")}</span>}</th>
            ))}
          </tr>
        </thead>
        <tbody className={cx("plumb-element-tbody")}>
          {groups.map((g) => {
            const sub = subtotal(g.rows.map((x) => x.row));
            return (
              <Fragment key={g.name || "all"}>
                {groupBy && (
                  <tr role="row" className={cx("plumb-element-tr", "plumb-grid-group")}>
                    <th role="rowheader" colSpan={5} scope="colgroup" className={cx("plumb-element-th")}>{g.name}</th>
                    <td role="gridcell" className={cx("plumb-element-td", "plumb-num")}>{sub.none ? <Unknown>{t("notPriced")}</Unknown> : <>{money.format(sub.sum)}{sub.partial ? ` · ${t("partial")}` : ""}</>}</td>
                    <td className={cx("plumb-element-td")} />
                  </tr>
                )}
                {g.rows.map(({ row, i }) => {
                  const v = visualIndex.get(i)!;
                  return (
                    <tr key={row.id} role="row" className={cx("plumb-element-tr", "plumb-row")} aria-rowindex={rowIndex.map.get(i)}>
                      {cell(row, v, "label")}
                      {cell(row, v, "qty")}
                      {cell(row, v, "unit")}
                      {cell(row, v, "rate")}
                      {cell(row, v, "kind")}
                      {readCell(v, amountCol, counts(row) ? <Money amount={amount(row)} currency={currency} /> : <span className={cx("plumb-element-span", "plumb-text")} data-tone="muted">{t("notInTotal")}</span>, "plumb-num")}
                      {readCell(v, removeCol,
                        // Reached with arrow keys; Enter or Delete removes. The button itself stays out of the tab order (grid pattern).
                        <IconButton size="sm" label={t("removeName", { name: row.label || t("line") })} icon={<Trash2 />} excludeFromTabOrder onPress={() => remove(v)} />)}
                    </tr>
                  );
                })}
              </Fragment>
            );
          })}
        </tbody>
        <tfoot className={cx("plumb-element-tfoot")}>
          <tr role="row" className={cx("plumb-element-tr", "plumb-grid-total")}>
            <th role="rowheader" colSpan={5} scope="row" className={cx("plumb-element-th")}>{t("subtotal")}{total.partial ? ` · ${t("partial")}` : ""}<span className={cx("plumb-element-span", "plumb-breakdown-note")}>{total.partial ? t("unknownExcluded") : t("beforeMarkup")}</span></th>
            <td role="gridcell" className={cx("plumb-element-td", "plumb-num")}>{total.none || !rows.length ? <Unknown>{t("notPriced")}</Unknown> : <Money amount={Math.round(total.sum * 100) / 100} currency={currency} emphasis="strong" />}</td>
            <td className={cx("plumb-element-td")} />
          </tr>
        </tfoot>
      </table>
      {onAddRow && <Button size="sm" variant="ghost" icon={<Plus />} onPress={onAddRow}>{t("addLine")}</Button>}
      <p id={`${gridId}-help`} className={cx("plumb-element-p", "plumb-sr-only")}>{t(rates?.length ? "gridHelpRates" : "gridHelp")}</p>
    </div>
  );
}
export function RateCell({ row, rates, currency }: { row: LineItemRow; rates?: RateEntry[]; currency?: string }) {
  const { t } = useMessages();
  const linked = row.rateId ? rates?.find((r) => r.id === row.rateId) : undefined;
  return (
    <span className={cx("plumb-element-span", "plumb-grid-rate")}>
      <Money amount={row.rate} currency={currency} />
      {linked && (linked.unit !== row.unit
        ? <TriangleAlert className={cx("plumb-rate-warn")} aria-label={t("rateUnitMismatch", { unit: linked.unit, lineUnit: row.unit })} />
        : <Link2 className={cx("plumb-grid-linked")} aria-label={t("fromLibrary", { name: linked.label })} />)}
    </span>
  );
}
