import {
Link as AriaLink,
type LinkProps as AriaLinkProps
} from "react-aria-components";
import { cx } from "../cx";

export interface LinkProps extends Omit<AriaLinkProps, "className"> {
  variant?: "default" | "quiet";
  className?: string;
}
/** Inline text link; `quiet` inherits the text colour and keeps the underline. */
export function Link({ variant = "default", className, ...props }: LinkProps) {
  return <AriaLink {...props} className={cx("plumb-link plumb-focusable", className)} data-variant={variant} />;
}
