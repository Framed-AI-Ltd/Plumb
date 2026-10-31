// Revisions, facts, and access (F-S01, F-S03, F-S04, F-S06, F-S07, F-C05, F-C34, F-C38, F-H10, F-H35, F-M19).
import type { DiffSide } from "./types";

export const qtyFmt: Intl.NumberFormatOptions = { maximumFractionDigits: 2 };
export const same = (a?: DiffSide, b?: DiffSide) => !!a && !!b && a.qty === b.qty && a.unit === b.unit && a.amount === b.amount && (a.kind ?? "fixed") === (b.kind ?? "fixed");
