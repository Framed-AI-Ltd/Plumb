import { styleIcon } from "../icons";
// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import { type ReactNode } from "react";
import {
ToggleButton as AriaToggleButton,
type ToggleButtonProps as AriaToggleButtonProps
} from "react-aria-components";
import { cx } from "../cx";

/* ---------- Toggle button and toolbar ---------- */
export interface ToggleButtonProps extends Omit<AriaToggleButtonProps, "className" | "children"> {
  icon?: ReactNode;
  children?: ReactNode;
  /** Icon-only toggles need a name. */
  "aria-label"?: string;
  size?: "sm" | "md";
  className?: string;
}
/** A pressed/not-pressed control: "Show private lines", "Pin", view options. */
export function ToggleButton({ icon, children, size = "md", className, ...props }: ToggleButtonProps) {
  return (
    <AriaToggleButton {...props} className={cx("plumb-button plumb-toggle plumb-focusable", className)} data-variant="secondary" data-size={size} data-icon-only={!children || undefined}>
      {styleIcon(icon)}
      {children}
    </AriaToggleButton>
  );
}
