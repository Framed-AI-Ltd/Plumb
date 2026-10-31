import { CircleHelp } from "../icons";
import { type ReactNode } from "react";
import {
Button as AriaButton,
Dialog as AriaDialog,
Heading as AriaHeading,
Popover as AriaPopover,
DialogTrigger
} from "react-aria-components";
import { cx } from "../cx";
import { useMessages } from "../locale";

export interface ContextualHelpProps {
  /** What the help is about; becomes the button's name ("Help: <title>"). */
  title: string;
  children: ReactNode;
  className?: string;
}
/** A small "?" that explains a term or rule in place. Reachable by keyboard and touch, unlike `title`. */
export function ContextualHelp({ title, children, className }: ContextualHelpProps) {
  const { t } = useMessages();
  return (
    <DialogTrigger>
      <AriaButton className={cx("plumb-contextual-help plumb-focusable", className)} aria-label={t("helpAbout", { title })}><CircleHelp aria-hidden /></AriaButton>
      <AriaPopover className={cx("plumb-popover")} placement="bottom start" offset={6}>
        <AriaDialog className={cx("plumb-help")}>
          <AriaHeading slot="title" className={cx("plumb-help-title")}>{title}</AriaHeading>
          <div className={cx("plumb-element-div")}>{children}</div>
        </AriaDialog>
      </AriaPopover>
    </DialogTrigger>
  );
}
