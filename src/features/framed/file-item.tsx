import { cx } from "../../lib/styles/classes";
import {
CircleAlert,CircleCheck,
FileText,
Hourglass,Loader,
Trash2,TriangleAlert,
X
} from "../../lib/icons";
import { type ReactNode } from "react";
import { Button,IconButton } from "../../lib/actions";
import { Badge } from "../../lib/feedback";
import { useMessages,type MessageKey } from "../../lib/locale";

export interface FileItemProps {
  name: string;
  meta?: string;
  status: "queued" | "uploading" | "reading" | "ready" | "review" | "failed";
  progress?: number;
  icon?: ReactNode;
  tag?: ReactNode;
  /** Why it failed, in plain words. */
  error?: string;
  onRetry?: () => void;
  onRemove?: () => void;
  onCancel?: () => void;
}
export const fileStatus = {
  queued: { tone: "neutral", Icon: Hourglass },
  uploading: { tone: "neutral", Icon: null },
  reading: { tone: "neutral", Icon: Loader },
  ready: { tone: "success", Icon: CircleCheck },
  review: { tone: "warning", Icon: TriangleAlert },
  failed: { tone: "danger", Icon: CircleAlert },
} as const;
/** One file with its status (saved locally, uploading, reading, ready, needs review, failed) and actions. */
export function FileItem({ name, meta, status, progress, icon, tag, error, onRetry, onRemove, onCancel }: FileItemProps) {
  const { t } = useMessages();
  const s = fileStatus[status];
  return (
    <div className={cx("plumb-element-div", "plumb-file")}>
      <span className={cx("plumb-element-span", "plumb-file-icon")} aria-hidden>{icon ?? <FileText />}</span>
      <div className={cx("plumb-element-div", "plumb-file-body")}>
        <div className={cx("plumb-element-div", "plumb-file-name")}>{name} {tag}</div>
        {(status === "failed" && error) ? <div className={cx("plumb-element-div", "plumb-field-error")}>{error}</div> : meta && <div className={cx("plumb-element-div", "plumb-item-description")}>{meta}</div>}
        {progress !== undefined && status === "uploading" && (
          <div className={cx("plumb-element-div", "plumb-progress-track plumb-file-progress")} role="progressbar" aria-label={t("uploadingName", { name })} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className={cx("plumb-element-div", "plumb-progress-fill")} style={{ inlineSize: `${progress}%` }} />
          </div>
        )}
      </div>
      <span role="status" aria-live="polite" className={cx("plumb-element-span")}><Badge tone={s.tone} icon={s.Icon && <s.Icon className={cx("plumb-element-s.Icon", status === "reading" ? "plumb-spin" : undefined)} aria-hidden />}>{t(`file_${status}` as MessageKey)}</Badge></span>
      <span className={cx("plumb-element-span", "plumb-file-actions")}>
        {status === "failed" && onRetry && <Button size="sm" variant="ghost" onPress={onRetry} aria-label={t("retryName", { name })}>{t("retry")}</Button>}
        {status === "uploading" && onCancel && <IconButton size="sm" label={t("cancelUpload", { name })} icon={<X />} onPress={onCancel} />}
        {status !== "uploading" && onRemove && <IconButton size="sm" label={t("removeName", { name })} icon={<Trash2 />} onPress={onRemove} />}
      </span>
    </div>
  );
}
