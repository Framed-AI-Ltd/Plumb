import type { ReactNode } from "react";
import {
ProgressBar as AriaProgressBar,
Label,
type ProgressBarProps as AriaProgressBarProps
} from "react-aria-components";
import { cx } from "../cx";

export interface ProgressBarProps extends Omit<AriaProgressBarProps, "className" | "children"> {
  label: ReactNode;
}
/** Progress of a task over time (uploads, imports). Omit `value` for indeterminate. */
export function ProgressBar({ label, className, ...props }: ProgressBarProps & { className?: string }) {
  return (
    <AriaProgressBar {...props} className={cx("plumb-progress", className)}>
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <Label className={cx("plumb-label")}>{label}</Label>
          <span className={cx("plumb-element-span", "plumb-description plumb-num")}>{valueText}</span>
          <div className={cx("plumb-element-div", "plumb-progress-track")}>
            <div className={cx("plumb-element-div", "plumb-progress-fill")} data-indeterminate={isIndeterminate || undefined} style={isIndeterminate ? undefined : { inlineSize: `${percentage ?? 0}%` }} />
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}
