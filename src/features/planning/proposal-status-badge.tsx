// Delivering the work: schedules, selections, bid levelling, budgets, proposal status, offline sync
// (F-C04, F-C24, F-C33, F-C35, F-C43, F-C51, F-H30, F-H36, F-S16, F-C47).
import { Badge } from "../../lib/feedback";
import { DateTime,useMessages,type MessageKey } from "../../lib/locale";

/* ---------- Proposal status (F-C33) ---------- */
export type ProposalStatus = "draft" | "issued" | "viewed" | "questioned" | "accepted" | "declined" | "expired" | "superseded";
export const statusTones: Record<ProposalStatus, "neutral" | "accent" | "success" | "warning" | "danger"> = {
  draft: "neutral", issued: "accent", viewed: "accent", questioned: "warning", accepted: "success", declined: "danger", expired: "neutral", superseded: "neutral",
};
/** Where a proposal stands with the customer; draft is dashed, ended states are outlined. */
export function ProposalStatusBadge({ status, at }: { status: ProposalStatus; at?: Date | string }) {
  const { t } = useMessages();
  return (
    <Badge tone={statusTones[status]} variant={status === "draft" ? "dashed" : status === "expired" || status === "superseded" ? "outline" : "soft"}>
      {t(`proposal_${status}` as MessageKey)}{at && <> · <DateTime value={at} format="short" /></>}
    </Badge>
  );
}
