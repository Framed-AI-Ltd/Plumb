// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import { type ReactNode } from "react";
import {
Slider as AriaSlider,
Label,
SliderOutput,
SliderThumb,
SliderTrack,
type SliderProps as AriaSliderProps
} from "react-aria-components";
import { cx } from "../cx";

/* ---------- Slider ---------- */
export interface SliderProps extends Omit<AriaSliderProps<number | number[]>, "className" | "children"> {
  label: ReactNode;
  description?: ReactNode;
  className?: string;
}
/** Choose a value or range on a scale: margin sensitivity, contingency share, budget ranges (F-C27, F-H26).
 *  Pass `formatOptions` (e.g. percent or currency) so the value reads correctly. */
export function Slider({ label, description, className, ...props }: SliderProps) {
  return (
    <AriaSlider {...props} className={cx("plumb-slider", className)}>
      <div className={cx("plumb-element-div", "plumb-label-row")}>
        <Label className={cx("plumb-label")}>{label}</Label>
        <SliderOutput className={cx("plumb-slider-output plumb-num")} />
      </div>
      <SliderTrack className={cx("plumb-slider-track")}>
        {({ state }) => (
          <>
            <div className={cx("plumb-element-div", "plumb-slider-fill")} style={state.values.length > 1
              ? { insetInlineStart: `${state.getThumbPercent(0) * 100}%`, inlineSize: `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%` }
              : { inlineSize: `${state.getThumbPercent(0) * 100}%` }} />
            {state.values.map((_, i) => <SliderThumb key={i} index={i} className={cx("plumb-slider-thumb")} />)}
          </>
        )}
      </SliderTrack>
      {description && <span className={cx("plumb-element-span", "plumb-description")}>{description}</span>}
    </AriaSlider>
  );
}
