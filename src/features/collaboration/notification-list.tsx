// Working together: threads and RFIs, tasks and punch lists, assistant task progress, notifications
// (F-S12, F-S14, F-C39, F-C40, F-C41, F-C42, F-C59, F-M24).
import {
Bell
} from "../../lib/icons";
import { type ReactNode } from "react";
import { Button as AriaButton } from "react-aria-components";
import { Button } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { EmptyState } from "../../lib/feedback";
import { DateTime,useMessages } from "../../lib/locale";
import { notificationIcons } from "./helpers";
import type { Notification } from "./types";

export interface NotificationListProps {
  items: Notification[];
  onOpen?: (item: Notification) => void;
  onMarkAllRead?: () => void;
  /** Link or button to notification preferences (digest, mute, channels). */
  settings?: ReactNode;
  className?: string;
}
/** The inbox list: unread first, each item says what happened, where, and when. */
export function NotificationList({ items, onOpen, onMarkAllRead, settings, className }: NotificationListProps) {
  const { t } = useMessages();
  const unread = items.filter((i) => !i.read);
  const read = items.filter((i) => i.read);
  const group = (label: string, list: Notification[]) => list.length > 0 && (
    <div className={cx("plumb-element-div", "plumb-notify-group")}>
      <h3 className={cx("plumb-element-h3", "plumb-notify-group-title")}>{label}</h3>
      <ul className={cx("plumb-element-ul", "plumb-notify-list")}>
        {list.map((n) => {
          const Icon = notificationIcons[n.kind];
          return (
            <li key={n.id} className={cx("plumb-element-li", "plumb-notify-item")} data-unread={!n.read || undefined}>
              <span className={cx("plumb-element-span", "plumb-notify-icon")} aria-hidden><Icon /></span>
              <div className={cx("plumb-element-div", "plumb-notify-body")}>
                {onOpen ? <AriaButton className={cx("plumb-notify-title plumb-focusable")} onPress={() => onOpen(n)}>{n.title}{!n.read && <span className={cx("plumb-element-span", "plumb-sr-only")}> ({t("unread")})</span>}</AriaButton>
                  : <span className={cx("plumb-element-span", "plumb-notify-title")}>{n.title}</span>}
                {n.detail && <span className={cx("plumb-element-span", "plumb-item-description")}>{n.detail}</span>}
                <span className={cx("plumb-element-span", "plumb-item-description")}>{n.context && `${n.context} · `}<DateTime value={n.at} format="datetime" /></span>
              </div>
              {!n.read && <span className={cx("plumb-element-span", "plumb-notify-dot")} aria-hidden />}
            </li>
          );
        })}
      </ul>
    </div>
  );
  return (
    <div className={cx("plumb-element-div", cx("plumb-notify", className))}>
      <div className={cx("plumb-element-div", "plumb-notify-bar")}>
        <span className={cx("plumb-element-span", "plumb-heading")} data-level="subheading">{t("notifications")}</span>
        {onMarkAllRead && unread.length > 0 && <Button size="sm" variant="ghost" onPress={onMarkAllRead}>{t("markAllRead")}</Button>}
      </div>
      {items.length ? <>{group(t("new"), unread)}{group(t("earlier"), read)}</> : <EmptyState icon={<Bell />} title={t("allCaughtUp")} />}
      {settings && <div className={cx("plumb-element-div", "plumb-notify-foot")}>{settings}</div>}
    </div>
  );
}
