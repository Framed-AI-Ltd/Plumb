import { styleIcon } from "../icons";
import { Loader } from "../icons";
import type { ReactNode, Ref } from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cx } from "../cx";
export interface ButtonProps extends Omit<AriaButtonProps, "className" | "children"> {
    /** One `primary` per task region. `soft` is a quiet brand-tinted alternative. */
    variant?: "primary" | "secondary" | "soft" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    icon?: ReactNode;
    className?: string;
    /** React 19 passes refs as props; this reaches the <button>. */
    ref?: Ref<HTMLButtonElement>;
    children?: ReactNode;
}
/** `isPending` keeps the button's width, shows a spinner, and blocks repeat presses (React Aria announces it). */
export function Button({ variant = "secondary", size = "md", icon, className, children, ...props }: ButtonProps) {
    return (<AriaButton {...props} className={cx("plumb-button plumb-focusable", className)} data-variant={variant} data-size={size}>
      {({ isPending }) => (<>
          {isPending ? <Loader className={cx("plumb-spin")} aria-hidden/> : styleIcon(icon)}
          {children}
        </>)}
    </AriaButton>);
}
