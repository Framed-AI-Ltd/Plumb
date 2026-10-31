import { type ReactNode } from "react";
import {
Switch as AriaSwitch,
type SwitchProps as AriaSwitchProps
} from "react-aria-components";
import { cx } from "../cx";

export interface SwitchProps extends Omit<AriaSwitchProps, "className" | "children"> {
  children: ReactNode;
}
/** An on/off setting that takes effect immediately. */
export function Switch({ children, className, ...props }: SwitchProps & { className?: string }) {
  return (
    <AriaSwitch {...props} className={cx("plumb-check-row", className)}>
      <span className={cx("plumb-element-span", "plumb-switch-track")} aria-hidden />
      <span className={cx("plumb-element-span")}>{children}</span>
    </AriaSwitch>
  );
}
