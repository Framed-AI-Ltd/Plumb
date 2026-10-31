// Proposal document and payment schedule (F-C29, F-C30, F-C26, F-S11).
import { type ReactNode } from "react";
import { cx } from "../../lib/cx";
import { Badge } from "../../lib/feedback";
import { DateTime,useCurrency,useMessages,type MessageKey } from "../../lib/locale";
import { Money } from "../domain";
import { type TaxLine } from "../framed";
import { DocumentLetterhead } from "./helpers";
import type { Letterhead } from "./types";

/* ---------- Invoice (F-C50, F-C53, F-M34) ---------- */
export interface InvoiceLine { id: string; label: string; amount: number; /** e.g. "Milestone 2 of 3" or "Change order CO-02". */ basis?: string }
export interface InvoiceDocumentProps {
  firm: string;
  /** The firm's letterhead: logo, address, licence or registration number (F-C29). Colours stay Plumb's. */
  letterhead?: Letterhead;
  number: string;
  recipient: string;
  issuedOn: Date | string;
  dueOn?: Date | string;
  lines: InvoiceLine[];
  taxes?: TaxLine[];
  /** Payments already received against this invoice. */
  payments?: { id: string; label: string; amount: number; on: Date | string }[];
  status: "draft" | "sent" | "partly-paid" | "paid" | "overdue" | "void";
  currency?: string;
  /** Payment instructions or a pay button. */
  footer?: ReactNode;
  /** Heading level of the title: 1 when the invoice is the page, 2 inside a workspace page. */
  headingLevel?: 1 | 2 | 3;
  className?: string;
}
/** An invoice for agreed work: what it bills, tax, what's been paid, and what's still due. */
export function InvoiceDocument(p: InvoiceDocumentProps) {
  const { t } = useMessages();
  const defaultCurrency = useCurrency();
  const code = p.currency ?? defaultCurrency;
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const subtotal = r2(p.lines.reduce((a, l) => a + l.amount, 0));
  const tax = r2((p.taxes ?? []).reduce((a, x) => a + x.amount, 0));
  const paid = r2((p.payments ?? []).reduce((a, x) => a + x.amount, 0));
  const due = r2(subtotal + tax - paid);
  const tone = p.status === "paid" ? "success" : p.status === "overdue" ? "warning" : p.status === "void" ? "neutral" : "accent";
  return (
    <article className={cx("plumb-element-article", cx("plumb-proposal plumb-invoice", p.className))} aria-label={t("invoiceN", { number: p.number })} data-status={p.status}>
      <header className={cx("plumb-element-header", "plumb-proposal-head")}>
        <DocumentLetterhead firm={p.firm} letterhead={p.letterhead} />
        <div className={cx("plumb-element-div", "plumb-text")} data-variant="overline" data-tone="muted">{p.firm} · {t("invoiceN", { number: p.number })}</div>
        <div className={cx("plumb-element-div", "plumb-invoice-title")}>
          {(() => { const H = `h${p.headingLevel ?? 2}` as const; return <H className={cx("plumb-heading")} data-level="heading">{t("billedTo", { name: p.recipient })}</H>; })()}
          <Badge tone={tone} variant={p.status === "draft" ? "dashed" : p.status === "void" ? "outline" : "soft"}>{t(`invoice_${p.status}` as MessageKey)}</Badge>
        </div>
        <div className={cx("plumb-element-div", "plumb-text")} data-variant="body" data-tone="muted"><DateTime value={p.issuedOn} />{p.dueOn && <> · {t("dueOn")} <DateTime value={p.dueOn} /></>}</div>
      </header>
      <div className={cx("plumb-element-div", "plumb-proposal-lines")} role="table" aria-label={t("invoiceItems")}>
        <div role="row" className={cx("plumb-element-div", "plumb-proposal-row plumb-proposal-header")}><span role="columnheader" className={cx("plumb-element-span")}>{t("item")}</span><span role="columnheader" className={cx("plumb-element-span")}><span className={cx("plumb-element-span", "plumb-sr-only")}>{t("basis")}</span></span><span role="columnheader" className={cx("plumb-element-span")}>{t("amountIn", { code })}</span></div>
        {p.lines.map((l) => (
          <div role="row" key={l.id} className={cx("plumb-element-div", "plumb-proposal-row")}>
            <span role="rowheader" className={cx("plumb-element-span", "plumb-proposal-item")}><span className={cx("plumb-element-span", "plumb-label")}>{l.label}</span>{l.basis && <span className={cx("plumb-element-span", "plumb-proposal-meta")}>{l.basis}</span>}</span>
            <span role="cell" className={cx("plumb-element-span")} />
            <span role="cell" className={cx("plumb-element-span", "plumb-num")}><Money amount={l.amount} currency={p.currency} /></span>
          </div>
        ))}
      </div>
      <div className={cx("plumb-element-div", "plumb-proposal-taxes")}>
        <div className={cx("plumb-element-div")}><span className={cx("plumb-element-span")}>{t("subtotal")}</span><Money amount={subtotal} currency={p.currency} /></div>
        {(p.taxes ?? []).map((x, i) => <div key={i} className={cx("plumb-element-div")}><span className={cx("plumb-element-span")}>{x.label}</span><Money amount={x.amount} currency={p.currency} /></div>)}
        {(p.payments ?? []).map((x) => <div key={x.id} className={cx("plumb-element-div")}><span className={cx("plumb-element-span")}>{x.label} · <DateTime value={x.on} format="short" /></span><span className={cx("plumb-element-span", "plumb-num")}>−<Money amount={x.amount} currency={p.currency} /></span></div>)}
      </div>
      <div className={cx("plumb-element-div", "plumb-proposal-total")}>
        <span className={cx("plumb-element-span")}>{due <= 0 ? t("paidInFull") : t("amountDue")} ({code})</span>
        <Money amount={Math.max(0, due)} size="lg" currency={p.currency} />
      </div>
      {due < 0 && <Badge tone="warning">{t("overpaid")}</Badge>}
      {p.footer}
    </article>
  );
}
