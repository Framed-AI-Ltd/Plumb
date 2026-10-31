import { cx } from "../../lib/styles/classes";
import {
BadgeCheck,Check,
TriangleAlert
} from "../../lib/icons";
import { Badge } from "../../lib/feedback";
import { DateTime,useMessages } from "../../lib/locale";
import { Money } from "../domain";

/* ---------- Approval snapshot (F-C34, F-M22) ---------- */
export interface ApprovalSnapshotProps {
  approver: string;
  role: string;
  option: string;
  revision: string;
  amount: number;
  /** Date or ISO string. */
  date: Date | string;
  conditions?: string[];
  /** Later changes that affect what was approved. */
  affectedBy?: string;
  currency?: string;
}
/** The exact thing someone approved, frozen. Flags when later edits make it stale. */
export function ApprovalSnapshot({ approver, role, option, revision, amount, date, conditions, affectedBy, currency }: ApprovalSnapshotProps) {
  const { t, rich } = useMessages();
  return (
    <section className={cx("plumb-element-section", "plumb-approval")} data-stale={affectedBy ? true : undefined} aria-label={t("approvalOf", { revision })}>
      <div className={cx("plumb-element-div", "plumb-approval-head")}>
        {affectedBy ? <TriangleAlert aria-hidden className={cx("plumb-approval-icon-stale")} /> : <BadgeCheck aria-hidden />}
        <div className={cx("plumb-element-div", "plumb-approval-main")}>
          <div className={cx("plumb-element-div", "plumb-approval-title")}>{t("approvedOption", { approver, option })}</div>
          <div className={cx("plumb-element-div", "plumb-approval-meta")}>
            <span className={cx("plumb-element-span", "plumb-item-description")}>{role} · <DateTime value={date} /> · <span className={cx("plumb-element-span", "plumb-ref")}>{rich("revisionRef", { revision })}</span></span>
            {affectedBy ? <Badge tone="warning" icon={<TriangleAlert aria-hidden />}>{t("needsReapproval")}</Badge> : <Badge tone="success" icon={<Check aria-hidden />}>{t("inEffect")}</Badge>}
          </div>
        </div>
        <Money amount={amount} emphasis="strong" currency={currency} />
      </div>
      {conditions && conditions.length > 0 && (
        <ul className={cx("plumb-element-ul", "plumb-approval-conditions")}>{conditions.map((c) => <li key={c} className={cx("plumb-element-li")}>{c}</li>)}</ul>
      )}
      {affectedBy && (
        <div className={cx("plumb-element-div", "plumb-approval-stale")}><TriangleAlert aria-hidden /><span className={cx("plumb-element-span")}>{affectedBy} {t("reapprovalNeeded")}</span></div>
      )}
    </section>
  );
}
