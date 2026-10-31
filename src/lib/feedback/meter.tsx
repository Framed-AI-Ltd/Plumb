import type { ReactNode } from "react";
import {
Meter as AriaMeter,
Label
} from "react-aria-components";
import { cx } from "../cx";
import { useMessages,useNumberFormat } from "../locale";

export interface MeterProps {
  label: ReactNode;
  value: number;
  minValue?: number;
  maxValue?: number;
  /** e.g. `{ style: "unit", unit: "gigabyte" }`, or a currency. */
  formatOptions?: Intl.NumberFormatOptions;
  /** Optional text instead of the formatted value, e.g. "3 of 5 projects". */
  valueLabel?: string;
  /** Above this share (0–1) the bar turns to warning; above `danger` to danger. Status is also given in words. */
  warning?: number;
  danger?: number;
  className?: string;
}
/** A known quantity within a range: plan usage, storage, allowance spent (F-S22, F-H36). Not for progress over time. */
export function Meter({ label, value, minValue = 0, maxValue = 100, formatOptions, valueLabel, warning = 0.8, danger = 1, className }: MeterProps) {
  const { t } = useMessages();
  const share = maxValue === minValue ? 0 : (value - minValue) / (maxValue - minValue);
  // React Aria clamps the value to the range; an over-limit amount must still read as what it is.
  const exact = useNumberFormat(formatOptions ?? { style: "percent" });
  const text = valueLabel ?? (formatOptions ? exact.format(value) : exact.format(share));
  const tone = share >= danger ? "danger" : share >= warning ? "warning" : "neutral";
  return (
    <AriaMeter value={value} minValue={minValue} maxValue={maxValue} valueLabel={text} className={cx("plumb-progress plumb-meter", className)} data-tone={tone}>
      {({ percentage }) => (
        <>
          <Label className={cx("plumb-label")}>{label}</Label>
          <span className={cx("plumb-element-span", "plumb-description plumb-num")}>{text}{tone !== "neutral" && <> · {tone === "danger" ? t("atLimit") : t("nearLimit")}</>}</span>
          <div className={cx("plumb-element-div", "plumb-progress-track")}><div className={cx("plumb-element-div", "plumb-progress-fill")} style={{ inlineSize: `${Math.min(100, percentage)}%` }} /></div>
        </>
      )}
    </AriaMeter>
  );
}
