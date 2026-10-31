// Proposal document and payment schedule (F-C29, F-C30, F-C26, F-S11).
import { allocateMilestones } from "./allocate-milestones";
import type { Milestone } from "./types";

/** Amount of the total not covered by the schedule (negative when it's over). */
export function scheduleGap(milestones: Milestone[], total: number) {
  return Math.round((total - allocateMilestones(milestones, total).reduce((a, c) => a + c, 0)) * 100) / 100;
}
