import { type ReactNode } from "react";
import {
Dialog as AriaDialog,
Heading as AriaHeading,
DialogTrigger,
Modal,
ModalOverlay
} from "react-aria-components";
import { Button } from "../actions";
import { cx } from "../cx";
import { Callout } from "../feedback";
import { useMessages } from "../locale";
import { CloseButton } from "./close-button";
import { useAsyncConfirm } from "./use-async-confirm";

export interface DialogProps {
  /** Element that opens the dialog. Omit it to open from a menu, a row action, or code via isOpen/onOpenChange;
   *  focus returns to whatever was focused before. */
  trigger?: ReactNode;
  title: ReactNode;
  children: ReactNode;
  /** Custom footer actions; receives `close`. Put the confirming action last. Ignored when `onConfirm` is set. */
  footer?: (close: () => void) => ReactNode;
  /**
   * A deliberate action (issue, share, revoke). Return a promise: the dialog stays open and can't be dismissed while
   * it runs, closes when it resolves, and shows the error inside the dialog when it rejects (the thrown message, or a
   * generic one).
   */
  onConfirm?: () => unknown;
  confirmLabel?: ReactNode;
  /** `danger` for destructive actions. */
  confirmVariant?: "primary" | "danger";
  cancelLabel?: ReactNode;
  /** Disables the confirm button, e.g. until a required field is filled. */
  isConfirmDisabled?: boolean;
  size?: "md" | "lg";
  /** Alert dialogs cannot be dismissed by clicking outside. */
  role?: "dialog" | "alertdialog";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
/** Deliberate decisions: issuing, sharing, approving, deleting. */
export function Dialog({ trigger, size = "md", role = "dialog", isOpen, onOpenChange, className, ...content }: DialogProps) {
  const confirm = useAsyncConfirm(content.onConfirm);
  const openChange = (open: boolean) => {
    if (!open && confirm.pending) return;
    // Clear an old failure on every open or close; controlled dialogs open through `isOpen` without calling this.
    confirm.reset();
    onOpenChange?.(open);
  };
  const overlay = (
    <ModalOverlay
      className={cx("plumb-overlay")}
      isDismissable={role === "dialog" && !confirm.pending}
      isKeyboardDismissDisabled={confirm.pending}
      {...(trigger ? {} : { isOpen, onOpenChange: openChange })}
    >
      <Modal className={cx("plumb-modal", className)} data-size={size}>
        <AriaDialog className={cx("plumb-dialog")} role={role}>
          {({ close }) => <DialogContent {...content} close={close} confirm={confirm} />}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
  if (!trigger) return overlay;
  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={openChange}>
      {trigger}
      {overlay}
    </DialogTrigger>
  );
}
export function DialogContent({ title, children, footer, onConfirm, confirmLabel, confirmVariant = "primary", cancelLabel, isConfirmDisabled, close, confirm }:
  Pick<DialogProps, "title" | "children" | "footer" | "onConfirm" | "confirmLabel" | "confirmVariant" | "cancelLabel" | "isConfirmDisabled"> & { close: () => void; confirm: ReturnType<typeof useAsyncConfirm> }) {
  const { t } = useMessages();
  return (
    <>
      <div className={cx("plumb-element-div", "plumb-dialog-header")}>
        <AriaHeading slot="title" className={cx("plumb-heading")} data-level="heading">{title}</AriaHeading>
        <CloseButton onPress={close} isDisabled={confirm.pending} />
      </div>
      <div className={cx("plumb-element-div", "plumb-dialog-body")} aria-busy={confirm.pending || undefined}>
        {children}
        {confirm.error !== null && <Callout tone="danger" live title={t("failed")}>{confirm.error || t("tryAgain")}</Callout>}
      </div>
      {onConfirm ? (
        <div className={cx("plumb-element-div", "plumb-dialog-footer")}>
          <Button variant="ghost" onPress={close} isDisabled={confirm.pending}>{cancelLabel ?? t("cancel")}</Button>
          <Button variant={confirmVariant} isPending={confirm.pending} isDisabled={isConfirmDisabled} onPress={() => confirm.run(close)}>{confirmLabel ?? t("confirm")}</Button>
        </div>
      ) : footer && <div className={cx("plumb-element-div", "plumb-dialog-footer")}>{footer(close)}</div>}
    </>
  );
}
