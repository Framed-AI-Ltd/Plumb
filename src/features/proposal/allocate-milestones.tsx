// Proposal document and payment schedule (F-C29, F-C30, F-C26, F-S11).
import type { Milestone } from "./types";

/** Allocates milestone amounts in whole cents; the last milestone takes the rounding remainder. */
export function allocateMilestones(milestones: Milestone[], total: number): number[] {
  const totalCents = Math.round(total * 100);
  const cents = milestones.map((m) => (m.amount !== undefined ? Math.round(m.amount * 100) : Math.round((m.percent ?? 0) * totalCents)));
  const percentShare = milestones.reduce((a, m) => a + (m.amount === undefined ? m.percent ?? 0 : 0), 0);
  const fixedShare = milestones.reduce((a, m) => a + (m.amount !== undefined ? Math.round(m.amount * 100) : 0), 0) / (totalCents || 1);
  // Each share is rounded to the nearest cent (floor would turn 0.29 × 100000 = 28999.999… into a lost cent).
  // Only when the shares add to 100 % does the last milestone absorb the rounding remainder.
  if (Math.abs(percentShare + fixedShare - 1) < 1e-9 && cents.length) {
    cents[cents.length - 1] += totalCents - cents.reduce((a, c) => a + c, 0);
  }
  return cents.map((c) => c / 100);
}
