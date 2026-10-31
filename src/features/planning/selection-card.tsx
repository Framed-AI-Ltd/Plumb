// Delivering the work: schedules, selections, bid levelling, budgets, proposal status, offline sync
// (F-C04, F-C24, F-C33, F-C35, F-C43, F-C51, F-H30, F-H36, F-S16, F-C47).
import { CircleHelp,Image as ImageIcon,TriangleAlert } from "../../lib/icons";
import { type ReactNode } from "react";
import { cx } from "../../lib/cx";
import { Badge } from "../../lib/feedback";
import { DateTime,useMessages,useMoneyFormat,type MessageKey } from "../../lib/locale";
import { MediaImage } from "../discovery";
import { Money } from "../domain";
import { toTime } from "./helpers";

export const isPastDay = (d: Date | string) => toTime(d) < Date.now();
/* ---------- Material selections (F-C35, F-C37, F-H23) ---------- */
export interface SelectionCardProps {
  /** What is being chosen, e.g. "Kitchen faucet". */
  item: string;
  room?: string;
  /** The chosen product, or null while undecided. */
  choice: { name: string; spec?: string; image?: string; price: number | null } | null;
  /** Allowance for this selection; overage is shown, never hidden in the total. */
  allowance?: number;
  /** Needed-by date for the decision. */
  neededBy?: Date | string;
  status: "open" | "proposed" | "approved" | "ordered";
  actions?: ReactNode;
  currency?: string;
  className?: string;
}
/** One product decision against its allowance and deadline. */
export function SelectionCard({ item, room, choice, allowance, neededBy, status, actions, currency, className }: SelectionCardProps) {
  const { t } = useMessages();
  const signed = useMoneyFormat(currency, "always");
  const diff = allowance !== undefined && choice?.price != null ? Math.round((choice.price - allowance) * 100) / 100 : null;
  const late = neededBy && status === "open" && isPastDay(neededBy);
  return (
    <article className={cx("plumb-element-article", cx("plumb-selection", className))} data-status={status}>
      <div className={cx("plumb-element-div", "plumb-selection-media")}>
        {choice?.image ? <MediaImage src={choice.image} alt={choice.name} /> : <span className={cx("plumb-element-span", "plumb-media-fallback")} aria-hidden><ImageIcon /></span>}
      </div>
      <div className={cx("plumb-element-div", "plumb-selection-body")}>
        <div className={cx("plumb-element-div", "plumb-selection-head")}>
          <span className={cx("plumb-element-span", "plumb-label")}>{item}</span>
          <Badge tone={status === "approved" || status === "ordered" ? "success" : status === "proposed" ? "accent" : "neutral"} variant={status === "proposed" ? "dashed" : status === "open" ? "outline" : "soft"}>{t(`selection_${status}` as MessageKey)}</Badge>
        </div>
        <span className={cx("plumb-element-span", "plumb-item-description")}>{room}{room && neededBy && " · "}{neededBy && <span data-overdue={late || undefined} className={cx("plumb-element-span")}>{late && <TriangleAlert aria-hidden />}{t("decideBy")} <DateTime value={neededBy} format="short" /></span>}</span>
        {choice
          ? <div className={cx("plumb-element-div", "plumb-selection-choice")}><span className={cx("plumb-element-span")}>{choice.name}</span>{choice.spec && <span className={cx("plumb-element-span", "plumb-item-description")}>{choice.spec}</span>}</div>
          : <span className={cx("plumb-element-span", "plumb-unknown")}><CircleHelp aria-hidden />{t("notChosen")}</span>}
        <div className={cx("plumb-element-div", "plumb-selection-money")}>
          {choice && <Money amount={choice.price} currency={currency} />}
          {allowance !== undefined && <span className={cx("plumb-element-span", "plumb-item-description")}>{t("allowanceIs")} <Money amount={allowance} currency={currency} /></span>}
          {diff !== null && diff !== 0 && <Badge tone={diff > 0 ? "warning" : "neutral"}>{diff > 0 ? t("overAllowance", { amount: signed.format(diff) }) : t("underAllowance", { amount: signed.format(diff) })}</Badge>}
        </div>
        {actions && <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>{actions}</div>}
      </div>
    </article>
  );
}
