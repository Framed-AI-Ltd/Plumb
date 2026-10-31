// Working together: threads and RFIs, tasks and punch lists, assistant task progress, notifications
// (F-S12, F-S14, F-C39, F-C40, F-C41, F-C42, F-C59, F-M24).

/* ---------- Notifications (F-S14) ---------- */
export interface Notification {
  id: string;
  kind: "assignment" | "deadline" | "comment" | "approval" | "reminder" | "bid";
  title: string;
  detail?: string;
  at: Date | string;
  read?: boolean;
  /** Project or home it belongs to. */
  context?: string;
}
