import type { HTMLAttributes,ReactNode } from "react";
import { cx } from "../cx";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: "body" | "label" | "caption" | "overline";
  tone?: "default" | "muted" | "accent" | "danger" | "warning" | "success";
  numeric?: boolean;
  as?: "p" | "span" | "div";
  children?: ReactNode;
}
/** Inter body text. Use `numeric` for tabular figures. */
export function Text({ variant = "body", tone = "default", numeric, as: As = "p", className, ...props }: TextProps) {
  return (
    <As
      {...props}
      className={cx(numeric ? "plumb-text plumb-num" : "plumb-text", className)}
      data-variant={variant}
      data-tone={tone}
    />
  );
}
