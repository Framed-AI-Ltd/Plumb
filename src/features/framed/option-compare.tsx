import {
Check
} from "../../lib/icons";
import { type ReactNode } from "react";
import { Button } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { useMessages,useMoneyFormat } from "../../lib/locale";
import { Money,Unknown } from "../domain";
import { r2 } from "./helpers";

/* ---------- Option comparison (F-C28, F-H25, F-M17) ---------- */
export interface CompareOption {
  id: string;
  name: string;
  summary?: string;
  price: number | null;
  badge?: ReactNode;
}
export interface CompareRow {
  label: string;
  /** What each option shows (may be formatted elements). */
  values: Record<string, ReactNode>;
  /** Raw values used to decide whether options differ; required when `values` are elements. */
  compare?: Record<string, string | number | null>;
}
export interface OptionCompareProps {
  options: CompareOption[];
  rows: CompareRow[];
  selected?: string;
  onSelect?: (id: string) => void;
  selectLabel?: string;
  currency?: string;
  className?: string;
}
/** Side-by-side alternatives with shared scope; rows that differ are marked. */
export function OptionCompare({ options, rows, selected, onSelect, selectLabel, currency, className }: OptionCompareProps) {
  const signed = useMoneyFormat(currency, "always");
  const { t } = useMessages();
  const choose = selectLabel ?? t("choose_action");
  const raw = (r: CompareRow, id: string) => {
    if (r.compare) return r.compare[id] ?? null;
    const v = r.values[id];
    if (v === null || v === undefined || typeof v === "string" || typeof v === "number") return v ?? null;
    // Elements can't be compared reliably; without `compare`, treat them as different so nothing is hidden.
    return Symbol();
  };
  const differs = (r: CompareRow) => new Set(options.map((o) => raw(r, o.id))).size > 1;
  const first = options[0];
  return (
    <div className={cx("plumb-element-div", cx("plumb-compare", className))} style={{ gridTemplateColumns: `minmax(140px, 0.8fr) repeat(${options.length}, minmax(0, 1fr))` }} role="table" aria-label={t("optionComparison")}>
      <div role="row" className={cx("plumb-element-div", "plumb-contents")}>
        <div role="columnheader" className={cx("plumb-element-div", "plumb-compare-corner")}><span className={cx("plumb-element-span", "plumb-sr-only")}>{t("comparedItem")}</span></div>
        {options.map((o, oi) => (
          <div role="columnheader" key={o.id} className={cx("plumb-element-div", "plumb-compare-head")} data-selected={selected === o.id || undefined} style={{ gridColumn: oi + 2, ["--o" as string]: oi * 100 }}>
            <div className={cx("plumb-element-div", "plumb-compare-name")}>{o.name} {o.badge}</div>
            {o.summary && <div className={cx("plumb-element-div", "plumb-compare-summary")}>{o.summary}</div>}
            <Money amount={o.price} size="lg" currency={currency} />
            {o.price !== null && first?.price != null && o.id !== first.id && (
              <span className={cx("plumb-element-span", "plumb-compare-delta")}>{t("versus", { delta: signed.format(r2(o.price - first.price)), name: first.name })}</span>
            )}
            {onSelect && (
              // The same button stays mounted (focus is kept); selection is announced with aria-pressed.
              <Button size="sm" variant={selected === o.id ? "soft" : "secondary"} icon={selected === o.id ? <Check aria-hidden /> : undefined}
                aria-pressed={selected === o.id} aria-label={`${selected === o.id ? t("selected") : choose} ${o.name}`} onPress={() => onSelect(o.id)}>
                {selected === o.id ? t("selected") : choose}
              </Button>
            )}
          </div>
        ))}
      </div>
      {rows.map((r, ri) => {
        const d = differs(r);
        return (
          <div role="row" key={r.label} className={cx("plumb-element-div", "plumb-contents")}>
            <div role="rowheader" className={cx("plumb-element-div", "plumb-compare-label")} data-differs={d || undefined}>
              {r.label}
              <span className={cx("plumb-element-span", "plumb-compare-diff")} data-differs={d || undefined}>{d ? t("differs") : t("same")}</span>
            </div>
            {options.map((o, oi) => (
              <div role="cell" key={o.id} className={cx("plumb-element-div", "plumb-compare-cell")} data-differs={d || undefined} data-selected={selected === o.id || undefined} data-row={r.label} style={{ ["--o" as string]: oi * 100 + ri + 1 }}>{r.values[o.id] ?? <Unknown />}</div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
