// Proposal document and payment schedule (F-C29, F-C30, F-C26, F-S11).
import { CircleAlert } from "../../lib/icons";
import { type ReactNode } from "react";
import { cx } from "../../lib/cx";
import { DateTime,useCurrency,useMessages } from "../../lib/locale";
import { Money,Quantity } from "../domain";
import { ItemKind,type TaxLine } from "../framed";
import { DocumentLetterhead } from "./helpers";
import { PaymentSchedule } from "./payment-schedule";
import { proposalTotals } from "./proposal-totals";
import type { Letterhead,Milestone,ProposalLine } from "./types";
import { useProposalBlockers } from "./use-proposal-blockers";

export interface ProposalDocumentProps {
  firm: string;
  /** The firm's letterhead: logo, address, licence or registration number (F-C29). Colours stay Plumb's. */
  letterhead?: Letterhead;
  revision: string;
  recipient: string;
  issuedOn?: Date | string;
  validUntil?: Date | string;
  title: ReactNode;
  lines: ProposalLine[];
  /** Total before tax; must equal the sum of priced lines. */
  total: number;
  /** Configured taxes; the customer then sees and approves a tax-inclusive total. */
  taxes?: TaxLine[];
  /** Unpriced or excluded items exist; the total says "partial". */
  partial?: boolean;
  exclusions?: ReactNode;
  milestones?: Milestone[];
  currency?: string;
  /** Reasons the proposal can't be issued yet, in the reader's language. Combined with computed ones. */
  issueBlockers?: string[];
  /** Heading level of the title: 1 when the proposal is the page (customer view), 2 inside a workspace page. */
  headingLevel?: 1 | 2 | 3;
  className?: string;
}
/** The customer-facing proposal. It always marks non-fixed lines and partial totals, and lists issue blockers. */
export function ProposalDocument(p: ProposalDocumentProps) {
  const defaultCurrency = useCurrency();
  const { t, rich } = useMessages();
  const code = p.currency ?? defaultCurrency;
  // Optional upgrades and exclusions are never part of the price.
  const { inPrice, partial: computedPartial, grand } = proposalTotals(p);
  const partial = p.partial || computedPartial;
  const options = p.lines.filter((l) => l.kind === "option");
  const excluded = p.lines.filter((l) => l.kind === "excluded");
  // The same function decides what the Issue button shows, so the document and the button can't disagree.
  const blockers = useProposalBlockers(p);
  return (
    <article className={cx("plumb-element-article", cx("plumb-proposal", p.className))} aria-label={t("proposalRevision", { revision: p.revision })}>
      <header className={cx("plumb-element-header", "plumb-proposal-head")}>
        <DocumentLetterhead firm={p.firm} letterhead={p.letterhead} />
        <div className={cx("plumb-element-div", "plumb-text")} data-variant="overline" data-tone="muted">{p.firm} · {t("proposalRevision", { revision: p.revision })}</div>
        {(() => { const H = `h${p.headingLevel ?? 2}` as const; return <H className={cx("plumb-heading")} data-level="heading">{p.title}</H>; })()}
        <div className={cx("plumb-element-div", "plumb-text")} data-variant="body" data-tone="muted">
          {t("preparedFor", { name: p.recipient })}
          {p.issuedOn && <> · <DateTime value={p.issuedOn} /></>}
          {p.validUntil && <> · {rich("validUntil", { date: <DateTime value={p.validUntil} /> })}</>}
        </div>
      </header>
      {blockers.length ? (
        <div className={cx("plumb-element-div", "plumb-proposal-blockers")}>
          <CircleAlert aria-hidden />
          <div className={cx("plumb-element-div")}>
            <strong className={cx("plumb-element-strong")}>{t("notReadyToIssue")}</strong>
            <ul className={cx("plumb-element-ul")}>{blockers.map((b) => <li key={b} className={cx("plumb-element-li")}>{b}</li>)}</ul>
          </div>
        </div>
      ) : null}
      <div className={cx("plumb-element-div", "plumb-proposal-lines")} role="table" aria-label={t("proposalItems")}>
        <div role="row" className={cx("plumb-element-div", "plumb-proposal-row plumb-proposal-header")}>
          <span role="columnheader" className={cx("plumb-element-span")}>{t("item")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("quantity")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("amountIn", { code })}</span>
        </div>
        {inPrice.map((l) => (
          <div role="row" key={l.id} className={cx("plumb-element-div", "plumb-proposal-row")}>
            <span role="rowheader" className={cx("plumb-element-span", "plumb-proposal-item")}>
              <span className={cx("plumb-element-span", "plumb-label")}>{l.label}</span>
              {(l.trade || (l.kind && l.kind !== "fixed")) && (
                <span className={cx("plumb-element-span", "plumb-proposal-meta")}>{l.trade}{l.trade && l.kind && l.kind !== "fixed" ? " · " : ""}{l.kind && l.kind !== "fixed" && <ItemKind kind={l.kind} inline />}</span>
              )}
            </span>
            <span role="cell" className={cx("plumb-element-span", "plumb-num")}><Quantity value={l.qty} unit={l.unit} /></span>
            <span role="cell" className={cx("plumb-element-span", "plumb-num")}><Money amount={l.amount} currency={p.currency} /></span>
          </div>
        ))}
      </div>
      {p.taxes?.length ? (
        <div className={cx("plumb-element-div", "plumb-proposal-taxes")}>
          <div className={cx("plumb-element-div")}><span className={cx("plumb-element-span")}>{t("totalBeforeTax")} ({code})</span><Money amount={p.total} currency={p.currency} /></div>
          {p.taxes.map((x) => <div key={x.label} className={cx("plumb-element-div")}><span className={cx("plumb-element-span")}>{x.label}</span><Money amount={x.amount} currency={p.currency} /></div>)}
        </div>
      ) : null}
      <div className={cx("plumb-element-div", "plumb-proposal-total")}>
        <span className={cx("plumb-element-span")}>
          {p.taxes?.length ? t("totalInclTax") : t("totalBeforeTax")} ({code}){partial ? ` · ${t("partial")}` : ""}
          {partial && <span className={cx("plumb-element-span", "plumb-breakdown-note")}>{t("unpricedExcluded")}</span>}
        </span>
        <Money amount={grand} size="lg" currency={p.currency} />
      </div>
      {options.length ? (
        <div className={cx("plumb-element-div", "plumb-proposal-options")}>
          <span className={cx("plumb-element-span", "plumb-heading")} data-level="subheading">{t("optionalUpgrades")}</span>
          <span className={cx("plumb-element-span", "plumb-item-description")}>{t("optionalUpgradesHelp")}</span>
          {options.map((l) => (
            <div key={l.id} className={cx("plumb-element-div", "plumb-proposal-row")}>
              <span className={cx("plumb-element-span", "plumb-proposal-item")}><span className={cx("plumb-element-span", "plumb-label")}>{l.label}</span>{l.trade && <span className={cx("plumb-element-span", "plumb-proposal-meta")}>{l.trade}</span>}</span>
              <span className={cx("plumb-element-span", "plumb-num")}><Quantity value={l.qty} unit={l.unit} /></span>
              <span className={cx("plumb-element-span", "plumb-num")}>+<Money amount={l.amount} currency={p.currency} /></span>
            </div>
          ))}
        </div>
      ) : null}
      {p.milestones?.length ? <PaymentSchedule milestones={p.milestones} total={grand} currency={p.currency} partial={partial} readOnly /> : null}
      {(p.exclusions || excluded.length) ? (
        <div className={cx("plumb-element-div", "plumb-proposal-exclusions")}>
          <strong className={cx("plumb-element-strong")}>{t("notIncluded")}</strong>
          {excluded.length ? <ul className={cx("plumb-element-ul")}>{excluded.map((l) => <li key={l.id} className={cx("plumb-element-li")}>{l.label}</li>)}</ul> : null}
          {p.exclusions && <div className={cx("plumb-element-div")}>{p.exclusions}</div>}
        </div>
      ) : null}
    </article>
  );
}
