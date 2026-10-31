// Editable estimate grid (F-C13, F-C20, F-C25, F-C26).
import type { LineItemRow } from "./types";

/** Amount for a line: quantity (plus waste) × rate, in whole cents; `null` when either is unknown. */
export const lineAmount = (r: LineItemRow) => (r.qty === null || r.rate === null ? null : Math.round(r.qty * (1 + (r.waste ?? 0)) * r.rate * 100) / 100);
