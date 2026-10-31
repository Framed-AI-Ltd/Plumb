import { type MessageKey } from "../../lib/locale";
import { faceValue,r2 } from "./helpers";
import type { BreakdownLine } from "./types";

/**
 * The customer's rows: private lines are removed and their total folded into fixed lines proportionally;
 * allowances, provisional sums, contingency, and credits keep their face value. Returns problems instead of a
 * misleading result. Exported so apps can produce the same figures for PDFs and emails.
 */
export function customerBreakdown(lines: BreakdownLine[], total: number) {
  const problems: { key: MessageKey; vars?: Record<string, number> }[] = [];
  const outside = (l: BreakdownLine) => l.kind === "option" || l.kind === "excluded";
  if (lines.some((l) => l.kind === "excluded" && l.amount)) problems.push({ key: "problemExcludedAmount" });
  if (lines.some((l) => l.private && l.kind && faceValue.includes(l.kind))) problems.push({ key: "problemPrivateFaceValue" });
  // Arithmetic check (F-C25): the lines in the price must add up to the stated total.
  const lineSum = r2(lines.filter((l) => !outside(l) && l.amount !== null).reduce((a, l) => a + (l.amount ?? 0), 0));
  const totalsMatch = Math.round(lineSum * 100) === Math.round(total * 100);
  if (!totalsMatch) problems.push({ key: "problemLinesTotal", vars: { sum: lineSum, total } });
  const hidden = lines.filter((l) => l.private).reduce((a, l) => a + (l.amount ?? 0), 0);
  const visible = lines.filter((l) => !l.private);
  const absorbs = (l: BreakdownLine) => !outside(l) && (!l.kind || !faceValue.includes(l.kind)) && (l.amount ?? 0) > 0;
  const base = visible.filter(absorbs).reduce((a, l) => a + (l.amount ?? 0), 0);
  if (hidden && !base) problems.push({ key: "problemNoFixedLines" });
  const rows = visible.map((l) => ({ ...l, formula: undefined, amount: l.amount === null ? null : absorbs(l) ? r2(l.amount + (base ? (hidden * l.amount) / base : 0)) : l.amount }));
  // Rounding remainder goes to the largest fixed line so the customer's rows always sum to the total.
  const priced = rows.filter((l) => l.amount !== null && !outside(l));
  const drift = r2(total - priced.reduce((a, l) => a + (l.amount ?? 0), 0));
  const largest = priced.filter(absorbs).reduce<BreakdownLine | undefined>((a, l) => (!a || (l.amount ?? 0) > (a.amount ?? 0) ? l : a), undefined);
  if (largest && totalsMatch && Math.abs(drift) < 1) largest.amount = r2((largest.amount ?? 0) + drift);
  else if (Math.abs(drift) >= 1 && !problems.length) problems.push({ key: "problemCustomerDrift", vars: { drift } });
  return { rows, problems };
}
