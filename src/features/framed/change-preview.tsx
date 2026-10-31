import { cx } from "../../lib/styles/classes";
import {
Sparkles
} from "../../lib/icons";
import { type ReactNode } from "react";
import { Button } from "../../lib/actions";
import { Badge } from "../../lib/feedback";
import { useMessages } from "../../lib/locale";

export interface ChangePreviewProps {
  title: ReactNode;
  changes: { label: string; before: ReactNode; after: ReactNode }[];
  onApply?: () => void;
  onDiscard?: () => void;
}
/** Exactly what an AI edit or import will change, before it is applied. */
export function ChangePreview({ title, changes, onApply, onDiscard }: ChangePreviewProps) {
  const { t } = useMessages();
  return (
    <section className={cx("plumb-element-section", "plumb-change")} aria-label={t("changePreview")}>
      <div className={cx("plumb-element-div", "plumb-draft-head")}>
        <span className={cx("plumb-element-span", "plumb-heading")} data-level="subheading">{title}</span>
        <Badge tone="accent" variant="dashed" icon={<Sparkles aria-hidden />}>{t("previewNotApplied")}</Badge>
      </div>
      <div className={cx("plumb-element-div", "plumb-change-rows")} role="table" aria-label={t("changes_label")}>
        <div role="row" className={cx("plumb-element-div", "plumb-change-row plumb-change-header")}>
          <span role="columnheader" className={cx("plumb-element-span")}>{t("field")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("now")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("after")}</span>
        </div>
        {changes.map((c) => (
          <div role="row" key={c.label} className={cx("plumb-element-div", "plumb-change-row")}>
            <span role="rowheader" className={cx("plumb-element-span")}>{c.label}</span>
            <span role="cell" className={cx("plumb-element-span", "plumb-change-before")}>{c.before}</span>
            <span role="cell" className={cx("plumb-element-span", "plumb-change-after")}>{c.after}</span>
          </div>
        ))}
      </div>
      {(onApply || onDiscard) && (
        <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>
          {onApply && <Button variant="primary" onPress={onApply}>{t("applyToDraft")}</Button>}
          {onDiscard && <Button variant="ghost" onPress={onDiscard}>{t("discard")}</Button>}
        </div>
      )}
    </section>
  );
}
