// Truth primitives: unknowns, money, quantities, sources, lifecycle, visibility, and AI drafts.
import {
CircleHelp
} from "../../lib/icons";
import { type ReactNode } from "react";
import { Button as AriaButton,Dialog as AriaDialog,DialogTrigger,Popover } from "react-aria-components";
import { cx } from "../../lib/cx";
import { useMessages } from "../../lib/locale";

/** A value that is not yet known. Never substitute zero or a guess (principle 7). */
export function Unknown({ children, reason, className }: { children?: ReactNode; reason?: string; className?: string }) {
  const { t } = useMessages();
  const pill = (
    <span className={cx("plumb-element-span", cx("plumb-unknown", className))}>
      <CircleHelp aria-hidden />
      {children ?? t("unknown")}
    </span>
  );
  if (!reason) return pill;
  // The reason must reach touch and keyboard users, so it opens in a popover rather than a `title`.
  return (
    <DialogTrigger>
      <AriaButton className={cx("plumb-provenance plumb-focusable")}>{pill}<span className={cx("plumb-element-span", "plumb-sr-only")}>{t("whySuffix")}</span></AriaButton>
      <Popover className={cx("plumb-popover")} placement="bottom start" offset={6}>
        <AriaDialog className={cx("plumb-help")} aria-label={t("whyUnknown")}><p className={cx("plumb-element-p")}>{reason}</p></AriaDialog>
      </Popover>
    </DialogTrigger>
  );
}
