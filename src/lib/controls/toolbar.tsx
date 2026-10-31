// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import {
Toolbar as AriaToolbar,
type ToolbarProps as AriaToolbarProps
} from "react-aria-components";
import { cx } from "../cx";

export interface ToolbarProps extends Omit<AriaToolbarProps, "className"> {
  "aria-label": string;
  className?: string;
}
/** Groups related actions; arrow keys move between them and Tab leaves the group (WAI-ARIA toolbar). */
export function Toolbar({ className, ...props }: ToolbarProps) {
  return <AriaToolbar {...props} className={cx("plumb-toolbar", className)} />;
}
