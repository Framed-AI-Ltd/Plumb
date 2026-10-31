import { cx } from "../../lib/styles/classes";
// Revisions, facts, and access (F-S01, F-S03, F-S04, F-S06, F-S07, F-C05, F-C34, F-C38, F-H10, F-H35, F-M19).
import { History,Pencil } from "../../lib/icons";
import { useRef,useState,type ReactNode } from "react";
import { Button,IconButton } from "../../lib/actions";
import { Callout } from "../../lib/feedback";
import { NumberField,TextField } from "../../lib/fields";
import { DateTime,useMessages,useNumberFormat } from "../../lib/locale";
import { SourceTag,Unknown,type SourceTagProps } from "../domain";
import { Provenance,settled,type ProvenanceKind } from "../framed";
import { qtyFmt } from "./helpers";

/* ---------- Facts with history ---------- */
export interface FactRevision { value: string | number | null; by: string; at: Date | string; note?: string; provenance: ProvenanceKind }
export interface FactFieldProps {
  label: string;
  value: string | number | null;
  unit?: string;
  provenance: ProvenanceKind;
  source?: SourceTagProps;
  /** Earlier values, newest first. The original evidence is never overwritten (F-H10). */
  history?: FactRevision[];
  numeric?: boolean;
  /** Save a correction with its reason. Return a promise to keep the form open (and the text) if saving fails. */
  onChange?: (value: string | number | null, note: string) => unknown;
  onVerify?: () => void;
}
/** A single fact: its value, how it's known, where it came from, and every correction. */
export function FactField({ label, value, unit, provenance, source, history = [], numeric, onChange, onVerify }: FactFieldProps) {
  const { t, plural } = useMessages();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [draft, setDraft] = useState<string | number | null>(value);
  const [note, setNote] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const editRef = useRef<HTMLButtonElement>(null);
  const nf = useNumberFormat(qtyFmt);
  const fmtValue = (v: string | number | null) => (typeof v === "number" ? nf.format(v) : v);
  const display: ReactNode = value === null ? <Unknown /> : <>{fmtValue(value)}{unit && <span className={cx("plumb-element-span", "plumb-quantity-unit")}>{unit}</span>}</>;
  // The form unmounts on save or cancel; focus goes back to the pencil so keyboard users keep their place.
  const close = () => { setEditing(false); setNote(""); requestAnimationFrame(() => editRef.current?.focus()); };
  return (
    <div className={cx("plumb-element-div", "plumb-fact")}>
      <div className={cx("plumb-element-div", "plumb-fact-head")}>
        <span className={cx("plumb-element-span", "plumb-label")}>{label}</span>
        <Provenance kind={provenance} />
      </div>
      {editing ? (
        <form className={cx("plumb-element-form", "plumb-stack")} data-gap="3" onSubmit={async (e) => {
          e.preventDefault();
          if (saving) return;
          setSaving(true); setSaveFailed(false);
          const ok = await settled(() => onChange?.(draft, note));
          setSaving(false); setSaveFailed(!ok);
          if (ok) close();
        }}>
          {saveFailed && <Callout tone="danger" live title={t("failed")}>{t("tryAgain")}</Callout>}
          {numeric
            ? <NumberField label={t("correctedLabel", { label })} unit={unit} value={typeof draft === "number" ? draft : NaN} onChange={(v) => setDraft(Number.isNaN(v) ? null : v)} isDisabled={saving} autoFocus />
            : <TextField label={t("correctedLabel", { label })} value={String(draft ?? "")} onChange={setDraft} isDisabled={saving} autoFocus />}
          <TextField label={t("whyChanged")} value={note} onChange={setNote} isDisabled={saving} isRequired description={t("whyChangedHelp")} />
          <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>
            <Button type="submit" size="sm" variant="primary" isDisabled={!note.trim()} isPending={saving}>{t("saveCorrection")}</Button>
            <Button size="sm" variant="ghost" isDisabled={saving} onPress={() => { setDraft(value); close(); }}>{t("cancel")}</Button>
          </div>
        </form>
      ) : (
        <div className={cx("plumb-element-div", "plumb-fact-value")}>
          <span className={cx("plumb-element-span", "plumb-num")}>{display}</span>
          {onChange && <IconButton ref={editRef} size="sm" label={t("correctLabel", { label })} icon={<Pencil />} onPress={() => { setDraft(value); setSaveFailed(false); setEditing(true); }} />}
          {onVerify && provenance !== "verified" && <Button size="sm" variant="ghost" onPress={onVerify}>{t("markVerified")}</Button>}
        </div>
      )}
      {source && <SourceTag {...source} />}
      {history.length > 0 && (
        <div className={cx("plumb-element-div")}>
          <Button size="sm" variant="ghost" icon={<History />} aria-expanded={showHistory} onPress={() => setShowHistory(!showHistory)}>{plural(showHistory ? "hideHistory" : "showHistory", history.length)}</Button>
          {showHistory && (
            <ol className={cx("plumb-element-ol", "plumb-fact-history")}>
              {history.map((h, i) => (
                <li key={i} className={cx("plumb-element-li")}><span className={cx("plumb-element-span", "plumb-num")}>{h.value === null ? <Unknown /> : fmtValue(h.value)}{unit && h.value !== null ? ` ${unit}` : ""}</span> · <Provenance kind={h.provenance} /> · {h.by} · <DateTime value={h.at} />{h.note && <span className={cx("plumb-element-span", "plumb-item-description")}>{h.note}</span>}</li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
