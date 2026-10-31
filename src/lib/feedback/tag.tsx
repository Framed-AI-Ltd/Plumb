import { styleIcon } from "../icons";
import type { HTMLAttributes,ReactNode } from "react";
import { cx } from "../cx";
import type { CategoryColor } from "../layout";

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color" | "title" | "children"> {
  /** Category colour: trades, rooms, document types. Not for status. */
  color?: CategoryColor;
  icon?: ReactNode;
  children: ReactNode;
}
/** Category label; squarer than status badges so the two never read alike. */
export function Tag({ color = "gray", icon, children, className, ...rest }: TagProps) {
  return (
    <span {...rest} className={cx("plumb-element-span", cx("plumb-tag", className))} data-color={color}>
      {styleIcon(icon)}
      {children}
    </span>
  );
}
