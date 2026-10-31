// Proposal document and payment schedule (F-C29, F-C30, F-C26, F-S11).
import type { ProposalDocumentProps } from "./proposal-document";

/** Totals every proposal view shares: the price excludes options and exclusions; the schedule is checked against
 *  the tax-inclusive total the customer approves. */
export function proposalTotals(p: Pick<ProposalDocumentProps, "lines" | "total" | "taxes">) {
  const inPrice = p.lines.filter((l) => l.kind !== "option" && l.kind !== "excluded");
  const priced = inPrice.filter((l) => l.amount !== null);
  const sum = Math.round(priced.reduce((a, l) => a + (l.amount ?? 0), 0) * 100) / 100;
  const taxTotal = Math.round((p.taxes ?? []).reduce((a, x) => a + x.amount, 0) * 100) / 100;
  return { inPrice, sum, grand: Math.round((p.total + taxTotal) * 100) / 100, partial: priced.length < inPrice.length };
}
