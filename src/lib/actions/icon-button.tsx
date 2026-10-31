import { Loader } from "../icons";
import type { ReactNode } from "react";
import {
Button as AriaButton
} from "react-aria-components";
import { cx } from "../cx";
import type { ButtonProps } from "./button";

export interface IconButtonProps extends Omit<ButtonProps, "children" | "icon"> {
  /** Required accessible name. */
  label: string;
  icon: ReactNode;
}
/** A button with only an icon. `label` is required and becomes its accessible name. */
export function IconButton({ label, icon, variant = "ghost", size = "md", className, ...props }: IconButtonProps) {
  return (
    <AriaButton
      {...props}
      aria-label={label}
      className={cx("plumb-button plumb-focusable", className)}
      data-variant={variant}
      data-size={size}
      data-icon-only
    >
      {({ isPending }) => (isPending ? <Loader className={cx("plumb-spin")} aria-hidden /> : icon)}
    </AriaButton>
  );
}
