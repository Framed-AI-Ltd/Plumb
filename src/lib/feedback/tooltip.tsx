import { cx } from "../styles/classes";
import type { ReactElement,ReactNode } from "react";
import {
Tooltip as AriaTooltip,
OverlayArrow,
TooltipTrigger
} from "react-aria-components";

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  placement?: "top" | "bottom" | "start" | "end";
}
/** Supplementary hints only; never the sole place for essential information. */
export function Tooltip({ content, children, placement = "top" }: TooltipProps) {
  return (
    <TooltipTrigger delay={400}>
      {children}
      <AriaTooltip className={cx("plumb-tooltip")} placement={placement} offset={8}>
        <OverlayArrow className={cx("plumb-tooltip-arrow")}>
          <svg width={8} height={8} viewBox="0 0 8 8" className={cx("plumb-element-svg")}><path d="M0 0 L4 4 L8 0" className={cx("plumb-element-path")} /></svg>
        </OverlayArrow>
        {content}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
