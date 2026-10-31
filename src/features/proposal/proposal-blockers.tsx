// Proposal document and payment schedule (F-C29, F-C30, F-C26, F-S11).
import { proposalTotals } from "./proposal-totals";
import { scheduleGap } from "./schedule-gap";
import type { BlockerInput,ProposalBlocker } from "./types";

/** Every reason a proposal can't be issued, including computed checks. Language-neutral; see `useProposalBlockers`. */
export function proposalBlockers(p: BlockerInput): ProposalBlocker[] {
  const { sum, grand } = proposalTotals(p);
  return [
    ...(Math.round(sum * 100) !== Math.round(p.total * 100) ? [{ code: "linesTotal" } as const] : []),
    ...(p.milestones?.length && scheduleGap(p.milestones, grand) ? [{ code: "schedule" } as const] : []),
    ...(p.issueBlockers ?? []).map((message) => ({ code: "custom", message }) as const),
  ];
}
