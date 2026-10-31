// Spatial and media records: floor plans, before/after photos, voice notes, and measured takeoffs
// (F-H12, F-H15, F-H16, F-H18, F-H19, F-H46, F-C07, F-C17, F-C19, F-H48).
import { useState } from "react";
import { Slider } from "../../lib/controls";
import { cx } from "../../lib/cx";
import { useMessages } from "../../lib/locale";
import { MediaImage } from "../discovery";

/* ---------- Before and after (F-C17, F-H48, F-H25) ---------- */
export interface ImageCompareProps {
  before: { src: string; alt: string; label?: string };
  after: { src: string; alt: string; label?: string };
  /** 0–1: where the divider starts, from the start edge (0.5 = middle). The "after" image shows past it. */
  defaultPosition?: number;
  className?: string;
}
/** Two photos of the same view, compared with a slider (arrow keys move it). Both images keep their own alt text. */
export function ImageCompare({ before, after, defaultPosition = 0.5, className }: ImageCompareProps) {
  const { t } = useMessages();
  const [pos, setPos] = useState(defaultPosition);
  return (
    <figure className={cx("plumb-element-figure", cx("plumb-compare-images", className))}>
      <div className={cx("plumb-element-div", "plumb-compare-stage")} style={{ ["--pos" as string]: `${pos * 100}%` }}>
        <MediaImage src={before.src} alt={before.alt} />
        <div className={cx("plumb-element-div", "plumb-compare-after")}><MediaImage src={after.src} alt={after.alt} /></div>
        <span className={cx("plumb-element-span", "plumb-compare-divider")} aria-hidden />
        <span className={cx("plumb-element-span", "plumb-compare-tag")} data-side="before" aria-hidden>{before.label ?? t("before")}</span>
        <span className={cx("plumb-element-span", "plumb-compare-tag")} data-side="after" aria-hidden>{after.label ?? t("after")}</span>
      </div>
      <Slider label={t("compareSlider")} value={pos} onChange={(v) => setPos(v as number)} minValue={0} maxValue={1} step={0.01} formatOptions={{ style: "percent" }} />
    </figure>
  );
}
