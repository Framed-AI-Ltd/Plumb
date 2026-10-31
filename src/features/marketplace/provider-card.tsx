// Finding and judging professionals (F-M04, F-M06, F-M14, F-M27, F-M28, F-H42).
import { Megaphone,ShieldCheck } from "../../lib/icons";
import type { ReactNode } from "react";
import { Rating } from "../../lib/controls";
import { cx } from "../../lib/cx";
import { Avatar,Tag } from "../../lib/feedback";
import { DateTime,useMessages } from "../../lib/locale";
import { MediaImage } from "../discovery";

export interface ProviderCardProps {
  name: string;
  /** e.g. "General contractor · Halifax". */
  summary: string;
  trades?: string[];
  /** Only ratings from verified jobs; `null` when there are none (never shown as 0). */
  rating?: { value: number | null; count: number };
  /** Credentials Framed has checked, with the date checked (F-M28: evidence, not guarantees). */
  verified?: { label: string; checkedOn: Date | string }[];
  /** Paid placement is always labelled and kept apart from relevance (F-M28). */
  sponsored?: boolean;
  /** Why this provider is shown (F-M06: explainable matching). */
  matchReason?: string;
  photos?: { src: string; alt: string }[];
  actions?: ReactNode;
  /** Heading level of the name; match the page outline (2 under the page title, 3 inside a titled section). */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}
/** A contractor or professional in search results or a shortlist. Claims are evidence with dates, never "trusted". */
export function ProviderCard({ name, summary, trades = [], rating, verified = [], sponsored, matchReason, photos = [], actions, headingLevel = 3, className }: ProviderCardProps) {
  const H = `h${headingLevel}` as const;
  const { t, plural } = useMessages();
  return (
    <article className={cx("plumb-element-article", cx("plumb-provider", className))} aria-label={name}>
      {sponsored && <span className={cx("plumb-element-span", "plumb-provider-sponsored")}><Megaphone aria-hidden />{t("sponsored")}</span>}
      <div className={cx("plumb-element-div", "plumb-provider-head")}>
        <Avatar name={name} />
        <div className={cx("plumb-element-div")}>
          <H className={cx("plumb-heading")} data-level="subheading">{name}</H>
          <span className={cx("plumb-element-span", "plumb-item-description")}>{summary}</span>
        </div>
      </div>
      {rating && (
        <div className={cx("plumb-element-div", "plumb-provider-rating")}>
          {rating.value === null
            ? <span className={cx("plumb-element-span", "plumb-item-description")}>{t("noVerifiedReviews")}</span>
            : <><Rating label={t("averageRating")} value={rating.value} isReadOnly /><span className={cx("plumb-element-span", "plumb-item-description")}>{plural("verifiedReviews", rating.count)}</span></>}
        </div>
      )}
      {trades.length > 0 && <div className={cx("plumb-element-div", "plumb-inline plumb-tags")}>{trades.map((x) => <Tag key={x}>{x}</Tag>)}</div>}
      {verified.length > 0 && (
        <ul className={cx("plumb-element-ul", "plumb-provider-checks")}>
          {verified.map((v) => <li key={v.label} className={cx("plumb-element-li")}><ShieldCheck aria-hidden />{v.label} <span className={cx("plumb-element-span", "plumb-item-description")}>· {t("checkedOn")} <DateTime value={v.checkedOn} format="short" /></span></li>)}
        </ul>
      )}
      {photos.length > 0 && <div className={cx("plumb-element-div", "plumb-provider-photos")}>{photos.slice(0, 3).map((p) => <MediaImage key={p.src} src={p.src} alt={p.alt} />)}</div>}
      {matchReason && <p className={cx("plumb-element-p", "plumb-provider-why")}><span className={cx("plumb-element-span", "plumb-label")}>{t("whyShown")}</span> {matchReason}</p>}
      {actions && <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>{actions}</div>}
    </article>
  );
}
