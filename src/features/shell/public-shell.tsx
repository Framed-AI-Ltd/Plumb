// Page frames: the contractor workspace, public and customer pages, page headers, and project progress.
import { type ReactNode } from "react";
import { cx } from "../../lib/cx";
import { useMessages } from "../../lib/locale";

export interface PublicShellProps {
  /** Left of the header: the firm's or Framed's name and mark. */
  brand: ReactNode;
  /** Right of the header: sign in, help, language. */
  actions?: ReactNode;
  footer?: ReactNode;
  /** `narrow` (sign-in, approvals), `medium` (proposals, portal), `wide` (marketplace listings). */
  width?: "narrow" | "medium" | "wide";
  children: ReactNode;
  className?: string;
}
/** Frame for pages without the workspace sidebar: sign-in, the customer portal, shared proposals, public profiles. */
export function PublicShell({ brand, actions, footer, width = "medium", children, className }: PublicShellProps) {
  const { t } = useMessages();
  return (
    <div className={cx("plumb-element-div", cx("plumb-public", className))} data-width={width}>
      <a className={cx("plumb-element-a", "plumb-skip-link")} href="#plumb-main">{t("skipToContent")}</a>
      <header className={cx("plumb-element-header", "plumb-public-header")}>
        <div className={cx("plumb-element-div", "plumb-public-brand")}>{brand}</div>
        {actions && <div className={cx("plumb-element-div", "plumb-public-actions")}>{actions}</div>}
      </header>
      <main id="plumb-main" tabIndex={-1} className={cx("plumb-element-main", "plumb-public-main")}>{children}</main>
      {footer && <footer className={cx("plumb-element-footer", "plumb-public-footer")}>{footer}</footer>}
    </div>
  );
}
