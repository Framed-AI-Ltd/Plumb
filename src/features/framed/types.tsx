import type { itemKinds } from "./helpers";

export type LineItemKind = keyof typeof itemKinds;
/* ---------- Estimate breakdown (F-C25) ---------- */
export interface BreakdownLine {
  /** Stable key; defaults to the label. */
  id?: string;
  label: string;
  /** Allowances, provisional sums, and contingency are shown at face value to customers (principle 12). */
  kind?: LineItemKind | "credit";
  amount: number | null;
  /** Inspectable arithmetic only, e.g. "24 hr × $85.00" or "10%". */
  formula?: string;
  /** Prose qualifier shown under the label. */
  note?: string;
  /** Contractor-only lines (overhead, markup) are hidden in customer views and folded into fixed lines. */
  private?: boolean;
}
