// Delivering the work: schedules, selections, bid levelling, budgets, proposal status, offline sync
// (F-C04, F-C24, F-C33, F-C35, F-C43, F-C51, F-H30, F-H36, F-S16, F-C47).
import { Check,CloudOff,RefreshCw,TriangleAlert } from "../../lib/icons";
import { Button } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { DateTime,useMessages,type MessageKey } from "../../lib/locale";

/* ---------- Offline sync (F-S16) ---------- */
export interface SyncStatusProps {
  state: "synced" | "offline" | "syncing" | "conflict" | "failed";
  /** Changes saved on this device but not yet sent. */
  pending?: number;
  lastSynced?: Date | string;
  onRetry?: () => void;
  onResolve?: () => void;
  className?: string;
}
/** Whether field changes have reached everyone; conflicts must be resolved before publishing. */
export function SyncStatus({ state, pending = 0, lastSynced, onRetry, onResolve, className }: SyncStatusProps) {
  const { t, plural } = useMessages();
  const Icon = state === "offline" ? CloudOff : state === "conflict" || state === "failed" ? TriangleAlert : state === "syncing" ? RefreshCw : Check;
  return (
    <div className={cx("plumb-element-div", cx("plumb-sync", className))} data-state={state} role="status">
      <Icon className={cx(state === "syncing" ? "plumb-spin" : undefined)} aria-hidden />
      <span className={cx("plumb-element-span")}>
        {t(`sync_${state}` as MessageKey)}
        {pending > 0 && ` · ${plural("pendingChanges", pending)}`}
        {lastSynced && state !== "syncing" && <span className={cx("plumb-element-span", "plumb-item-description")}> · {t("lastSynced")} <DateTime value={lastSynced} format="datetime" /></span>}
      </span>
      {state === "failed" && onRetry && <Button size="sm" variant="ghost" onPress={onRetry}>{t("retry")}</Button>}
      {state === "conflict" && onResolve && <Button size="sm" variant="secondary" onPress={onResolve}>{t("resolve")}</Button>}
    </div>
  );
}
