// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import { Star } from "../icons";
import {
Radio,
RadioGroup
} from "react-aria-components";
import { cx } from "../cx";
import { useMessages,useNumberFormat } from "../locale";

/* ---------- Rating ---------- */
export interface RatingProps {
  /** Required: what is being rated, e.g. "Quality of work". */
  label: string;
  /** 1–max. `null` = not rated (never shown as 0 stars). */
  value: number | null;
  onChange?: (value: number) => void;
  max?: number;
  /** Read-only display, e.g. on a review card. */
  isReadOnly?: boolean;
  className?: string;
}
/** Star rating with radio semantics; read-only ratings announce "4 of 5" as text (F-M27). */
export function Rating({ label, value, onChange, max = 5, isReadOnly, className }: RatingProps) {
  const { t } = useMessages();
  const nf = useNumberFormat();
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  if (isReadOnly || !onChange)
    return (
      <span className={cx("plumb-element-span", cx("plumb-rating", className))} role="img" aria-label={value === null ? t("notRated", { label }) : t("ratingOf", { label, value: nf.format(value), max })}>
        {stars.map((n) => {
          // Shown to the nearest half star; the exact value is in the accessible name.
          const v = value === null ? 0 : Math.round(value * 2) / 2;
          if (v >= n) return <Star key={n} aria-hidden data-filled />;
          if (v === n - 0.5) return <span key={n} className={cx("plumb-element-span", "plumb-rating-half")} aria-hidden><Star /><Star data-filled /></span>;
          return <Star key={n} aria-hidden />;
        })}
      </span>
    );
  return (
    <RadioGroup className={cx("plumb-rating plumb-rating-input", className)} aria-label={label} orientation="horizontal" value={value === null ? null : String(value)} onChange={(v) => onChange(Number(v))}>
      {stars.map((n) => (
        <Radio key={n} value={String(n)} aria-label={t("nStars", { n, max })} className={cx("plumb-rating-star plumb-focusable")}>
          <Star aria-hidden data-filled={(value !== null && n <= value) || undefined} />
        </Radio>
      ))}
    </RadioGroup>
  );
}
