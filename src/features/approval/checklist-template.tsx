import { cx } from "../../lib/styles/classes";
// Customer decisions and reusable checklists (F-C34, F-C38, F-S11, F-M22, F-C16, F-C01).
import { ClipboardList } from "../../lib/icons";
import { Button } from "../../lib/actions";
import { DateTime,useMessages } from "../../lib/locale";
import { VisibilityTag } from "../domain";

export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
}
export interface ChecklistTemplateProps {
  name: string;
  version: string;
  owner: string;
  items: ChecklistItem[];
  updatedAt?: Date | string;
  /** Firm-private by default (principle 11). */
  visibility?: "private" | "shared";
  onApplyToProject?: () => void;
  onEdit?: () => void;
}
/** A firm's reusable checklist or work package, versioned and owned (F-C16, F-C01). */
export function ChecklistTemplate({ name, version, owner, items, updatedAt, visibility = "private", onApplyToProject, onEdit }: ChecklistTemplateProps) {
  const { t, rich } = useMessages();
  return (
    <section className={cx("plumb-element-section", "plumb-checklist")} aria-label={t("checklistName", { name })}>
      <div className={cx("plumb-element-div", "plumb-checklist-head")}>
        <ClipboardList aria-hidden />
        <div className={cx("plumb-element-div", "plumb-checklist-title")}>
          <span className={cx("plumb-element-span", "plumb-heading")} data-level="subheading">{name}</span>
          <span className={cx("plumb-element-span", "plumb-item-description")}>{t("versionN", { version })} · {owner}{updatedAt && <> · {rich("updatedOn", { date: <DateTime value={updatedAt} format="short" /> })}</>}</span>
        </div>
        <VisibilityTag kind={visibility} />
      </div>
      <ol className={cx("plumb-element-ol", "plumb-checklist-items")}>
        {items.map((i) => (
          <li key={i.id} className={cx("plumb-element-li")}><span className={cx("plumb-element-span", "plumb-label")}>{i.label}</span>{i.detail && <span className={cx("plumb-element-span", "plumb-item-description")}>{i.detail}</span>}</li>
        ))}
      </ol>
      {(onApplyToProject || onEdit) && (
        <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>
          {onApplyToProject && <Button size="sm" variant="secondary" onPress={onApplyToProject}>{t("applyToProject")}</Button>}
          {onEdit && <Button size="sm" variant="ghost" onPress={onEdit}>{t("editTemplate")}</Button>}
        </div>
      )}
    </section>
  );
}
