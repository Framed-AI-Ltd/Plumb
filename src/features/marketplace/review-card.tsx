// Finding and judging professionals (F-M04, F-M06, F-M14, F-M27, F-M28, F-H42).
import { BadgeCheck } from "../../lib/icons";
import type { ReactNode } from "react";
import { Rating } from "../../lib/controls";
import { cx } from "../../lib/cx";
import { Badge } from "../../lib/feedback";
import { DateTime,useMessages } from "../../lib/locale";

export interface ReviewCardProps {
  author: string;
  rating: number;
  body: ReactNode;
  at: Date | string;
  /** What the review is tied to, e.g. "Kitchen renovation, 2026". Only verified-interaction reviews are shown (F-M27). */
  job: string;
  response?: { by: string; body: ReactNode; at: Date | string };
  actions?: ReactNode;
  className?: string;
}
/** A review tied to a verified job, with the firm's response. */
export function ReviewCard({ author, rating, body, at, job, response, actions, className }: ReviewCardProps) {
  const { t } = useMessages();
  return (
    <article className={cx("plumb-element-article", cx("plumb-review", className))}>
      <div className={cx("plumb-element-div", "plumb-review-head")}>
        <Rating label={t("ratingBy", { name: author })} value={rating} isReadOnly />
        <span className={cx("plumb-element-span", "plumb-item-description")}>{author} · <DateTime value={at} format="short" /></span>
      </div>
      <Badge icon={<BadgeCheck aria-hidden />}>{t("verifiedJob", { job })}</Badge>
      <div className={cx("plumb-element-div", "plumb-review-body")}>{body}</div>
      {response && (
        <blockquote className={cx("plumb-element-blockquote", "plumb-review-response")}>
          <span className={cx("plumb-element-span", "plumb-label")}>{t("responseFrom", { name: response.by })}</span> <span className={cx("plumb-element-span", "plumb-item-description")}>· <DateTime value={response.at} format="short" /></span>
          <div className={cx("plumb-element-div")}>{response.body}</div>
        </blockquote>
      )}
      {actions && <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>{actions}</div>}
    </article>
  );
}
