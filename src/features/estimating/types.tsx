// Editable estimate grid (F-C13, F-C20, F-C25, F-C26).
import { type LineItemKind } from "../framed";

export interface LineItemRow {
  id: string;
  label: string;
  /** null = not measured yet (shown as Unknown, never 0). */
  qty: number | null;
  unit: string;
  /** null = not priced yet. */
  rate: number | null;
  kind?: LineItemKind;
  /** Grouping value, e.g. room or trade. */
  group?: string;
  /** The rate library entry this line is priced from (F-C20). */
  rateId?: string;
  /** Waste or overage as a share of the quantity, e.g. 0.1 for 10 %; included in the amount and shown. */
  waste?: number;
}
