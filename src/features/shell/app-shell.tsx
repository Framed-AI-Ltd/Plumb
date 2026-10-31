// Page frames: the contractor workspace, public and customer pages, page headers, and project progress.
import { House,Menu as MenuIcon } from "../../lib/icons";
import { useState,type ReactNode } from "react";
import { Dialog as AriaDialog,DialogTrigger,Modal,ModalOverlay } from "react-aria-components";
import { IconButton } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { useMediaQuery } from "../../lib/layout";
import { useMessages } from "../../lib/locale";
import { CloseButton } from "../../lib/overlays";
import { Drawer } from "../../lib/structure";

export interface AppShellProps {
  nav: ReactNode;
  topbar?: ReactNode;
  sidebarFoot?: ReactNode;
  /** Replaces the product mark at the top of the sidebar, e.g. a `WorkspaceSwitcher`. */
  sidebarHead?: ReactNode;
  /**
   * A persistent side panel, e.g. the assistant (F-S09). A column beside the content from 1200px; below that it opens
   * as a sheet. Control it with `isAsideOpen` / `onAsideOpenChange` (a top-bar button usually toggles it).
   */
  aside?: ReactNode;
  asideLabel?: string;
  isAsideOpen?: boolean;
  onAsideOpenChange?: (open: boolean) => void;
  children: ReactNode;
  productName?: string;
  className?: string;
}
/**
 * Sidebar + top bar workspace frame for contractor screens. Below 960px the sidebar becomes a sheet opened from the
 * top bar (F-S15). The first focusable element skips to the content (WCAG 2.4.1).
 */
export function AppShell({ nav, topbar, sidebarFoot, sidebarHead, aside, asideLabel, isAsideOpen = false, onAsideOpenChange, children, productName = "framed", className }: AppShellProps) {
  const { t } = useMessages();
  const wide = useMediaQuery("(min-width: 1200px)");
  // The panel is a column on wide screens and a modal sheet on narrow ones. A modal must only open because someone
  // asked for it: on narrow screens the sheet opens when `isAsideOpen` turns true there, never on load, resize, or
  // hydration with a panel that was already open.
  const [sheetOpen, setSheetOpen] = useState(false);
  const [seen, setSeen] = useState({ open: isAsideOpen, wide });
  if (seen.open !== isAsideOpen || seen.wide !== wide) {
    setSeen({ open: isAsideOpen, wide });
    setSheetOpen(isAsideOpen && !wide && (sheetOpen || !seen.open));
  }
  const closeAside = () => {
    onAsideOpenChange?.(false);
    // The panel goes away; send focus to the main content rather than the page.
    requestAnimationFrame(() => document.getElementById("plumb-main")?.focus());
  };
  const sidebar = (
    <>
      {sidebarHead ?? (
        <div className={cx("plumb-element-div", "plumb-shell-brand")}>
          <span className={cx("plumb-element-span", "plumb-shell-mark")} aria-hidden><House /></span>
          {productName}
        </div>
      )}
      {nav}
      {sidebarFoot && <div className={cx("plumb-element-div", "plumb-shell-foot")}>{sidebarFoot}</div>}
    </>
  );
  return (
    <div className={cx("plumb-element-div", cx("plumb-shell", className))} data-aside={(aside && isAsideOpen && wide) || undefined}>
      <a className={cx("plumb-element-a", "plumb-skip-link")} href="#plumb-main">{t("skipToContent")}</a>
      <aside className={cx("plumb-element-aside", "plumb-shell-sidebar")}>
        <div className={cx("plumb-element-div", "plumb-shell-sidebar-inner")}>{sidebar}</div>
      </aside>
      <div className={cx("plumb-element-div", "plumb-shell-main")}>
        <div className={cx("plumb-element-div", "plumb-shell-panel")}>
          <header className={cx("plumb-element-header", "plumb-shell-topbar")}>
            <span className={cx("plumb-element-span", "plumb-shell-navtrigger")}>
              <DialogTrigger>
                <IconButton label={t("openNavigation")} icon={<MenuIcon />} />
                <ModalOverlay className={cx("plumb-overlay plumb-drawer-overlay plumb-nav-sheet-overlay")} isDismissable>
                  <Modal className={cx("plumb-drawer plumb-nav-sheet")}>
                    <AriaDialog className={cx("plumb-dialog plumb-shell-sidebar-inner")} aria-label={t("navigation")}>
                      {({ close }) => (
                        // Choosing a destination closes the sheet. The links themselves are the interactive elements.
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                        <div className={cx("plumb-element-div", "plumb-stack plumb-nav-sheet-body")} onClick={(e) => (e.target as Element).closest("a, [role=link]") && close()}>
                          {sidebar}
                        </div>
                      )}
                    </AriaDialog>
                  </Modal>
                </ModalOverlay>
              </DialogTrigger>
            </span>
            {topbar}
          </header>
          <main id="plumb-main" tabIndex={-1} className={cx("plumb-element-main", "plumb-shell-content")}>{children}</main>
        </div>
      </div>
      {aside && isAsideOpen && wide && (
        <aside className={cx("plumb-element-aside", "plumb-shell-aside")} aria-label={asideLabel}>
          <div className={cx("plumb-element-div", "plumb-shell-aside-head")}>
            <span className={cx("plumb-element-span", "plumb-label")}>{asideLabel}</span>
            <CloseButton onPress={closeAside} />
          </div>
          <div className={cx("plumb-element-div", "plumb-shell-aside-body")}>{aside}</div>
        </aside>
      )}
      {aside && !wide && (
        <Drawer isOpen={sheetOpen} onOpenChange={(o) => { if (!o) { setSheetOpen(false); onAsideOpenChange?.(false); } }} title={asideLabel}>{aside}</Drawer>
      )}
    </div>
  );
}
