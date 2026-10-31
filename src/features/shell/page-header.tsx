// Page frames: the contractor workspace, public and customer pages, page headers, and project progress.
import { type ReactNode } from "react";
import { cx } from "../../lib/cx";

export interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  /** Sit on the title row, aligned to the h1. */
  actions?: ReactNode;
  /** Short reason under the actions, e.g. why the primary action is disabled. */
  actionHint?: ReactNode;
  className?: string;
}
/** The page's h1 with eyebrow, description, meta, and the page's primary action. */
export function PageHeader({ eyebrow, title, description, meta, actions, actionHint, className }: PageHeaderProps) {
  return (
    <div className={cx("plumb-element-div", cx("plumb-page-header", className))}>
      {eyebrow && <div className={cx("plumb-element-div", "plumb-page-eyebrow")}>{eyebrow}</div>}
      <h1 className={cx("plumb-element-h1", "plumb-heading")} data-level="title">{title}</h1>
      {actions ? <div className={cx("plumb-element-div", "plumb-page-actions")}>{actions}</div> : <span className={cx("plumb-element-span")} />}
      {(description || meta) && (
        <div className={cx("plumb-element-div", "plumb-page-sub plumb-stack")}>
          {description && <p className={cx("plumb-element-p", "plumb-text")} data-variant="body" data-tone="muted">{description}</p>}
          {meta && <div className={cx("plumb-element-div", "plumb-inline plumb-page-meta")}>{meta}</div>}
        </div>
      )}
      {actionHint && <div className={cx("plumb-element-div", "plumb-page-hint")}>{actionHint}</div>}
    </div>
  );
}
