import { cx } from "../../lib/styles/classes";
// Revisions, facts, and access (F-S01, F-S03, F-S04, F-S06, F-S07, F-C05, F-C34, F-C38, F-H10, F-H35, F-M19).
import { Badge,Callout } from "../../lib/feedback";
import { useMessages,useMoneyFormat,useNumberFormat,type MessageKey } from "../../lib/locale";
import { Money,Unknown } from "../domain";
import { ItemKind } from "../framed";
import { qtyFmt } from "./helpers";
import { lineChange } from "./line-change";
import { priceDelta } from "./price-delta";
import type { DiffLine,DiffSide } from "./types";

export interface RevisionDiffProps {
  before: { label: string };
  after: { label: string };
  lines: DiffLine[];
  /** Approvals that the changes invalidate. */
  affectsApprovals?: string[];
  currency?: string;
  /** Show unchanged lines too. */
  showUnchanged?: boolean;
}
/** What changed between two revisions, line by line, with the price effect (F-S06, F-C34, F-C80, F-M19). */
export function RevisionDiff({ before, after, lines, affectsApprovals, currency, showUnchanged }: RevisionDiffProps) {
  const qty = useNumberFormat(qtyFmt);
  const { t, plural } = useMessages();
  const signed = useMoneyFormat(currency, "exceptZero");
  const shown = lines.filter((l) => showUnchanged || lineChange(l) !== "unchanged");
  const { delta, partial } = priceDelta(lines);
  const side = (s?: DiffSide) => s
    ? <>{s.qty === null ? <Unknown>{t("unknownUnit", { unit: s.unit })}</Unknown> : `${qty.format(s.qty)} ${s.unit}`} · <Money amount={s.amount} currency={currency} />{s.kind && s.kind !== "fixed" && <> · <ItemKind kind={s.kind} inline /></>}</>
    : <span className={cx("plumb-element-span", "plumb-text")} data-tone="muted">—</span>;
  return (
    <section className={cx("plumb-element-section", "plumb-diff-view")} aria-label={t("changesFromTo", { before: before.label, after: after.label })}>
      <div className={cx("plumb-element-div", "plumb-diff-summary")}>
        <span className={cx("plumb-element-span", "plumb-heading")} data-level="subheading">{before.label} → {after.label}</span>
        <span className={cx("plumb-element-span", "plumb-item-description")}>{plural("changes", shown.length)} · {t("priceDelta", { delta: signed.format(delta) })}{partial ? ` · ${t("partialUnpriced")}` : ""}</span>
      </div>
      {affectsApprovals?.length ? <Callout tone="warning" title={t("affectsApprovals")}>{t("needReapproval", { list: affectsApprovals.join(", ") })}</Callout> : null}
      <div role="table" aria-label={t("lineChanges")} className={cx("plumb-element-div", "plumb-diff-table")}>
        <div role="row" className={cx("plumb-element-div", "plumb-diff-row plumb-change-header")}><span role="columnheader" className={cx("plumb-element-span")}>{t("line")}</span><span role="columnheader" className={cx("plumb-element-span")}>{before.label}</span><span role="columnheader" className={cx("plumb-element-span")}>{after.label}</span></div>
        {shown.map((l) => {
          const c = lineChange(l);
          return (
            <div role="row" key={l.id} className={cx("plumb-element-div", "plumb-diff-row")} data-change={c}>
              <span role="rowheader" className={cx("plumb-element-span")}><span className={cx("plumb-element-span", "plumb-label")}>{l.label}</span> <Badge tone={c === "added" ? "success" : c === "removed" ? "danger" : "neutral"} variant="outline">{t(`change_${c}` as MessageKey)}</Badge></span>
              <span role="cell" className={cx("plumb-element-span", c === "removed" || c === "changed" ? "plumb-change-before" : undefined)}>{side(l.before)}</span>
              <span role="cell" className={cx("plumb-element-span", "plumb-change-after")}>{side(l.after)}</span>
            </div>
          );
        })}
        {!shown.length && <div className={cx("plumb-element-div", "plumb-item-description")}>{t("noLineChanges")}</div>}
      </div>
    </section>
  );
}
