// Delivering the work: schedules, selections, bid levelling, budgets, proposal status, offline sync
// (F-C04, F-C24, F-C33, F-C35, F-C43, F-C51, F-H30, F-H36, F-S16, F-C47).
import { Check,CircleDashed,CircleHelp,Minus,X } from "../../lib/icons";
import { Button } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { useMediaQuery } from "../../lib/layout";
import { DateTime,useMessages,type MessageKey } from "../../lib/locale";
import { Money } from "../domain";

/* ---------- Bid levelling (F-C22, F-C24, F-M17) ---------- */
export type Coverage = "included" | "excluded" | "allowance" | "unclear" | "missing";
export interface BidLevelingProps {
  bids: { id: string; name: string; total: number | null; expires?: Date | string }[];
  /** Scope items down the side; `coverage[bidId]` says how each bid treats it. */
  items: { id: string; label: string; coverage: Record<string, Coverage>; note?: Record<string, string> }[];
  currency?: string;
  /** Never chosen automatically; a person selects (F-M18). */
  selected?: string;
  onSelect?: (bidId: string) => void;
  className?: string;
}
export const coverageIcons = { included: Check, excluded: X, allowance: Minus, unclear: CircleHelp, missing: CircleDashed };
/** Compare trade or supplier bids against the same scope: gaps, exclusions, and allowances are visible before choosing. */
export function BidLeveling({ bids, items, currency, selected, onSelect, className }: BidLevelingProps) {
  const { t, plural } = useMessages();
  const gaps = (id: string) => items.filter((i) => ["missing", "unclear", "excluded"].includes(i.coverage[id] ?? "missing")).length;
  const narrow = useMediaQuery("(max-width: 640px)");
  if (narrow) return (
    <section className={cx("plumb-element-section", cx("plumb-leveling-mobile", className))} aria-label={t("bidLeveling")}>
      {bids.map((b) => (
        <article key={b.id} className={cx("plumb-element-article", "plumb-leveling-bid")} aria-label={b.name} data-selected={selected === b.id || undefined}>
          <header className={cx("plumb-element-header", "plumb-leveling-bid-head")}>
            <span className={cx("plumb-element-span", "plumb-label")}>{b.name}</span>
            <Money amount={b.total} currency={currency} emphasis="strong" />
            <span className={cx("plumb-element-span", "plumb-item-description")}>{gaps(b.id) ? plural("gapsToClarify", gaps(b.id)) : t("coversAll")}{b.expires && <> · {t("expires")} <DateTime value={b.expires} format="short" /></>}</span>
            {onSelect && <Button size="sm" variant={selected === b.id ? "soft" : "secondary"} aria-pressed={selected === b.id} onPress={() => onSelect(b.id)} aria-label={`${selected === b.id ? t("selected") : t("choose_action")} ${b.name}`}>{selected === b.id ? t("selected") : t("choose_action")}</Button>}
          </header>
          <dl className={cx("plumb-element-dl", "plumb-leveling-bid-items")}>
            {items.map((i) => {
              const coverage = i.coverage[b.id] ?? "missing";
              const Icon = coverageIcons[coverage];
              return <div key={i.id} className={cx("plumb-element-div")}>
                <dt className={cx("plumb-element-dt", "plumb-label")}>{i.label}</dt>
                <dd className={cx("plumb-element-dd")}><span className={cx("plumb-element-span", "plumb-leveling-status")} data-coverage={coverage}><Icon aria-hidden />{t(`coverage_${coverage}` as MessageKey)}</span>{i.note?.[b.id] && <span className={cx("plumb-element-span", "plumb-item-description")}>{i.note[b.id]}</span>}</dd>
              </div>;
            })}
          </dl>
        </article>
      ))}
    </section>
  );
  return (
    <div className={cx("plumb-element-div", cx("plumb-leveling", className))} role="table" aria-label={t("bidLeveling")} style={{ gridTemplateColumns: `minmax(160px, 1fr) repeat(${bids.length}, minmax(120px, 1fr))` }}>
      <div role="row" className={cx("plumb-element-div", "plumb-contents")}>
        <span role="columnheader" className={cx("plumb-element-span", "plumb-compare-corner")}><span className={cx("plumb-element-span", "plumb-sr-only")}>{t("scopeItem")}</span></span>
        {bids.map((b) => (
          <div role="columnheader" key={b.id} className={cx("plumb-element-div", "plumb-leveling-head")} data-selected={selected === b.id || undefined}>
            <span className={cx("plumb-element-span", "plumb-label")}>{b.name}</span>
            <Money amount={b.total} currency={currency} emphasis="strong" />
            <span className={cx("plumb-element-span", "plumb-item-description")}>{gaps(b.id) ? plural("gapsToClarify", gaps(b.id)) : t("coversAll")}{b.expires && <> · {t("expires")} <DateTime value={b.expires} format="short" /></>}</span>
            {onSelect && <Button size="sm" variant={selected === b.id ? "soft" : "secondary"} aria-pressed={selected === b.id} onPress={() => onSelect(b.id)} aria-label={`${selected === b.id ? t("selected") : t("choose_action")} ${b.name}`}>{selected === b.id ? t("selected") : t("choose_action")}</Button>}
          </div>
        ))}
      </div>
      {items.map((i) => (
        <div role="row" key={i.id} className={cx("plumb-element-div", "plumb-contents")}>
          <span role="rowheader" className={cx("plumb-element-span", "plumb-compare-label")}>{i.label}</span>
          {bids.map((b) => {
            const c = i.coverage[b.id] ?? "missing";
            const Icon = coverageIcons[c];
            return (
              <span role="cell" key={b.id} className={cx("plumb-element-span", "plumb-leveling-cell")} data-coverage={c}>
                <Icon aria-hidden />{t(`coverage_${c}` as MessageKey)}
                {i.note?.[b.id] && <span className={cx("plumb-element-span", "plumb-item-description")}>{i.note[b.id]}</span>}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
