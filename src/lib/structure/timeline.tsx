import { styleIcon } from "../icons";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { DateTime, useMessages } from "../locale";
/* ---------- Timeline ---------- */
export interface TimelineEvent {
    id: string;
    title: ReactNode;
    /** Date or ISO string; free text is shown as given. */
    time: Date | string;
    actor?: ReactNode;
    detail?: ReactNode;
    icon?: ReactNode;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger";
}
/** Activity, revision, and decision history (audit trail). Newest first. */
export function Timeline({ events, "aria-label": label, className }: {
    events: TimelineEvent[];
    "aria-label"?: string;
    className?: string;
}) {
    const { t } = useMessages();
    return (<ol className={cx("plumb-element-ol", cx("plumb-timeline", className))} aria-label={label ?? t("activity")}>
      {events.map((e) => (<li key={e.id} className={cx("plumb-element-li", "plumb-timeline-item")} data-tone={e.tone ?? "neutral"}>
          <span className={cx("plumb-element-span", "plumb-timeline-dot")} aria-hidden>{styleIcon(e.icon)}</span>
          <div className={cx("plumb-element-div", "plumb-timeline-body")}>
            <div className={cx("plumb-element-div", "plumb-timeline-title")}>{e.title}</div>
            <div className={cx("plumb-element-div", "plumb-timeline-meta")}>
              {e.actor && <>{e.actor} · </>}
              <DateTime value={e.time} format="datetime"/>
            </div>
            {e.detail && <div className={cx("plumb-element-div", "plumb-timeline-detail")}>{e.detail}</div>}
          </div>
        </li>))}
    </ol>);
}
