import { type ReactNode } from "react";
import {
Dialog as AriaDialog,
Heading as AriaHeading,
Popover as AriaPopover,
DialogTrigger
} from "react-aria-components";
import { cx } from "../cx";

export interface PopoverProps {
  /** The pressable element that opens it. */
  trigger: ReactNode;
  /** Accessible name when there is no visible heading. */
  "aria-label"?: string;
  title?: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom" | "bottom start" | "bottom end" | "top start" | "top end" | "start" | "end";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
/** Non-modal floating panel for short, interactive content: filters, quick details, help. */
export function Popover({ trigger, title, children, placement = "bottom start", isOpen, onOpenChange, className, ...aria }: PopoverProps) {
  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger}
      <AriaPopover className={cx("plumb-popover")} placement={placement} offset={6}>
        <AriaDialog className={cx("plumb-popover-dialog", className)} aria-label={title ? undefined : aria["aria-label"]}>
          {title && <AriaHeading slot="title" className={cx("plumb-heading")} data-level="subheading">{title}</AriaHeading>}
          {children}
        </AriaDialog>
      </AriaPopover>
    </DialogTrigger>
  );
}
