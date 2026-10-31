import { cx } from "../../lib/styles/classes";
// Working together: threads and RFIs, tasks and punch lists, assistant task progress, notifications
// (F-S12, F-S14, F-C39, F-C40, F-C41, F-C42, F-C59, F-M24).
import {
Bell
} from "../../lib/icons";
import { Dialog as AriaDialog,Heading as AriaHeading,DialogTrigger,Popover } from "react-aria-components";
import { IconButton } from "../../lib/actions";
import { useMessages } from "../../lib/locale";
import type {NotificationListProps } from "./notification-list";
import { NotificationList } from "./notification-list";

/** A bell button with the unread count that opens the notification list (F-S14). */
export function NotificationsPopover(props: NotificationListProps) {
  const { t, plural } = useMessages();
  const unread = props.items.filter((i) => !i.read).length;
  return (
    <DialogTrigger>
      <IconButton className={cx("plumb-notify-trigger")} label={unread ? plural("notificationsUnread", unread) : t("notifications")}
        icon={<span className={cx("plumb-element-span", "plumb-notify-bell")}><Bell />{unread > 0 && <span className={cx("plumb-element-span", "plumb-notify-count")} aria-hidden>{unread > 9 ? "9+" : unread}</span>}</span>} />
      <Popover className={cx("plumb-popover plumb-notify-popover")} placement="bottom end" offset={6}>
        <AriaDialog className={cx("plumb-notify-dialog")} aria-label={t("notifications")}>
          <AriaHeading slot="title" className={cx("plumb-sr-only")}>{t("notifications")}</AriaHeading>
          <NotificationList {...props} />
        </AriaDialog>
      </Popover>
    </DialogTrigger>
  );
}
