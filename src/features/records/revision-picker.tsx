import { cx } from "../../lib/styles/classes";
// Revisions, facts, and access (F-S01, F-S03, F-S04, F-S06, F-S07, F-C05, F-C34, F-C38, F-H10, F-H35, F-M19).
import { Badge } from "../../lib/feedback";
import { Select } from "../../lib/fields";
import { DateTime,useMessages,type MessageKey } from "../../lib/locale";

/* ---------- Revisions ---------- */
export interface RevisionInfo {
  id: string;
  label: string;
  status: "draft" | "issued" | "superseded" | "approved";
  date: Date | string;
  author: string;
}
export const statusTone = { draft: "neutral", issued: "accent", superseded: "neutral", approved: "success" } as const;
export interface RevisionPickerProps {
  revisions: RevisionInfo[];
  selectedId: string;
  onSelect: (id: string) => void;
  /** The revision others are compared against (e.g. the approved baseline). */
  baselineId?: string;
  onBaselineChange?: (id: string) => void;
}
/** Choose which revision to view and which to compare against (F-S06). */
export function RevisionPicker({ revisions, selectedId, onSelect, baselineId, onBaselineChange }: RevisionPickerProps) {
  const { t } = useMessages();
  const status = (s: RevisionInfo["status"]) => t(`revision_${s}` as MessageKey);
  const options = revisions.map((r) => ({ id: r.id, label: `${r.label} · ${status(r.status)}`, description: r.author }));
  const current = revisions.find((r) => r.id === selectedId);
  return (
    <div className={cx("plumb-element-div", "plumb-revision-picker")}>
      <Select label={t("revision")} size="sm" options={options} selectedKey={selectedId} onSelectionChange={(k) => onSelect(String(k))} />
      {onBaselineChange && (
        <Select label={t("compareWith")} size="sm" options={options.filter((o) => o.id !== selectedId)} selectedKey={baselineId ?? null} onSelectionChange={(k) => onBaselineChange(String(k))} placeholder={t("noComparison")} />
      )}
      {current && (
        <div className={cx("plumb-element-div", "plumb-revision-meta")}>
          <Badge tone={statusTone[current.status]}>{status(current.status)}</Badge>
          <span className={cx("plumb-element-span", "plumb-item-description")}><DateTime value={current.date} /> · {current.author}</span>
        </div>
      )}
    </div>
  );
}
