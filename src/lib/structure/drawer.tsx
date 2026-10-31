import type { ReactNode } from "react";
import {
Dialog as AriaDialog,
Heading as AriaHeading,
DialogTrigger,
Modal,
ModalOverlay
} from "react-aria-components";
import { cx } from "../cx";
import { CloseButton } from "../overlays";

/* ---------- Drawer (side sheet) ---------- */
export interface DrawerProps {
  /** Omit to control with isOpen/onOpenChange (e.g. from Table onRowAction). */
  trigger?: ReactNode;
  title: ReactNode;
  children: ReactNode;
  footer?: (close: () => void) => ReactNode;
  /** Maximum width in px; always fits the viewport. */
  width?: number;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
/** Side sheet for inspecting a record without leaving the page: a line item, a source, a contact. */
export function Drawer({ trigger, title, children, footer, width = 440, isOpen, onOpenChange, className }: DrawerProps) {
  const overlay = (
    <ModalOverlay className={cx("plumb-overlay plumb-drawer-overlay")} isDismissable {...(trigger ? {} : { isOpen, onOpenChange })}>
      <Modal className={cx("plumb-drawer", className)} style={{ inlineSize: `min(${width}px, 100vw)` }}>
        <AriaDialog className={cx("plumb-dialog plumb-drawer-dialog")}>
          {({ close }) => (
            <>
              <div className={cx("plumb-element-div", "plumb-dialog-header")}>
                <AriaHeading slot="title" className={cx("plumb-heading")} data-level="heading">{title}</AriaHeading>
                <CloseButton onPress={close} />
              </div>
              <div className={cx("plumb-element-div", "plumb-dialog-body plumb-drawer-body")}>{children}</div>
              {footer && <div className={cx("plumb-element-div", "plumb-dialog-footer")}>{footer(close)}</div>}
            </>
          )}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
  if (!trigger) return overlay;
  return <DialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>{trigger}{overlay}</DialogTrigger>;
}
