import { styleIcon } from "../icons";
import type { HTMLAttributes,ReactNode } from "react";
import { cx } from "../cx";
import { IconTile } from "./icon-tile";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "color" | "title" | "children"> {
  icon: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
}
/** What appears before there's anything to show: say what will be here and how to add it. */
export function EmptyState({ icon, title, children, action, className, ...rest }: EmptyStateProps) {
  return (
    <div {...rest} className={cx("plumb-element-div", cx("plumb-empty", className))}>
      <IconTile icon={styleIcon(icon)} color="gray" size="lg" />
      <p className={cx("plumb-element-p", "plumb-heading")} data-level="subheading">{title}</p>
      {children && <p className={cx("plumb-element-p", "plumb-text")} data-variant="body" data-tone="muted">{children}</p>}
      {action}
    </div>
  );
}
