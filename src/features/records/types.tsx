// Revisions, facts, and access (F-S01, F-S03, F-S04, F-S06, F-S07, F-C05, F-C34, F-C38, F-H10, F-H35, F-M19).
import { type LineItemKind } from "../framed";

export interface DiffSide { qty: number | null; unit: string; amount: number | null; kind?: LineItemKind }
export interface DiffLine { id: string; label: string; before?: DiffSide; after?: DiffSide }
export type LineChange = "added" | "removed" | "changed" | "unchanged";
