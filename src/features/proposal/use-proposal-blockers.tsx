// Proposal document and payment schedule (F-C29, F-C30, F-C26, F-S11).
import { useMessages } from "../../lib/locale";
import { proposalBlockers } from "./proposal-blockers";
import type { BlockerInput } from "./types";

/** `proposalBlockers` as sentences in the current locale; use them to disable Issue with a reason. */
export function useProposalBlockers(p: BlockerInput): string[] {
  const { t } = useMessages();
  return proposalBlockers(p).map((b) => (b.code === "custom" ? b.message : b.code === "linesTotal" ? t("blockerLinesTotal") : t("blockerSchedule")));
}
