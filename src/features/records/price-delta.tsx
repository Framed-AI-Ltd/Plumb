// Revisions, facts, and access (F-S01, F-S03, F-S04, F-S06, F-S07, F-C05, F-C34, F-C38, F-H10, F-H35, F-M19).
import type { DiffLine,DiffSide } from "./types";

/**
 * The price effect of a set of line changes. Options and exclusions aren't in the price; an unpriced side makes the
 * change partial, never a fake 0.
 */
export function priceDelta(lines: DiffLine[]) {
  const inPrice = (s?: DiffSide) => !!s && s.kind !== "option" && s.kind !== "excluded";
  let partial = false;
  const delta = lines.reduce((a, l) => {
    const b = inPrice(l.before) ? l.before!.amount : 0;
    const c = inPrice(l.after) ? l.after!.amount : 0;
    if (b === null || c === null) { partial = true; return a; }
    return a + c - b;
  }, 0);
  return { delta: Math.round(delta * 100) / 100, partial };
}
