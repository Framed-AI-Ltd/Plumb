import { cx } from "../../lib/styles/classes";
// Finding, viewing, and bringing in information (F-S07, F-S13, F-S15, F-S17, F-C06, F-C20, F-H03, F-H12).
import {
CircleAlert
} from "../../lib/icons";
import { useState } from "react";
import { Button } from "../../lib/actions";
import { Checkbox,Select } from "../../lib/fields";
import { useCurrency,useMessages } from "../../lib/locale";

/* ---------- Import mapper (F-S17, F-C20, F-H12) ---------- */
export interface ImportTarget {
  id: string;
  label: string;
  required?: boolean;
  /** The unit Framed stores, e.g. "m²". */
  unit?: string;
  /** Units the file may use for this field; when set, each mapped column asks which one the file uses. */
  units?: string[];
}
export interface ImportMapperProps {
  columns: { id: string; header: string; sample: string[] }[];
  targets: ImportTarget[];
  /** column id → target id ("" = skip). */
  mapping: Record<string, string>;
  onMappingChange: (mapping: Record<string, string>) => void;
  /** column id → the unit the file uses for that column. */
  sourceUnits?: Record<string, string>;
  onSourceUnitsChange?: (units: Record<string, string>) => void;
  /** Currency of amounts in the file; a mismatch with the workspace currency blocks the import. */
  fileCurrency?: string;
  rowIssues?: { row: number; target: string; message: string }[];
  rowCount: number;
  onImport?: () => void;
  isPending?: boolean;
}
/** Map a spreadsheet's columns to Framed fields, see sample values, unit conversions, and row problems, then import. */
export function ImportMapper({ columns, targets, mapping, onMappingChange, sourceUnits = {}, onSourceUnitsChange, fileCurrency, rowIssues = [], rowCount, onImport, isPending }: ImportMapperProps) {
  const { t, plural } = useMessages();
  const currency = useCurrency();
  // Confirmation covers exactly the conversions shown; any change to them asks again.
  const [confirmedSig, setConfirmedSig] = useState<string | null>(null);
  const used = Object.values(mapping).filter(Boolean);
  const missing = targets.filter((x) => x.required && !used.includes(x.id));
  const dupes = targets.filter((x) => used.filter((u) => u === x.id).length > 1);
  const options = [{ id: "", label: t("dontImport") }, ...targets.map((x) => ({ id: x.id, label: x.label + (x.required ? " *" : ""), description: x.unit ? t("unitIs", { unit: x.unit }) : undefined }))];
  const targetOf = (colId: string) => targets.find((x) => x.id === mapping[colId]);
  // Columns whose file unit differs from the stored unit are converted; the person must confirm the basis.
  const conversions = columns.flatMap((c) => {
    const target = targetOf(c.id);
    const from = sourceUnits[c.id];
    return target?.unit && from && from !== target.unit ? [{ column: c.header, from, to: target.unit }] : [];
  });
  const sig = JSON.stringify(conversions);
  const confirmed = confirmedSig === sig;
  const unitMissing = columns.filter((c) => targetOf(c.id)?.units?.length && !sourceUnits[c.id]);
  const currencyMismatch = !!fileCurrency && fileCurrency !== currency;
  const ready = !missing.length && !dupes.length && !unitMissing.length && !currencyMismatch && (!conversions.length || confirmed);
  const importable = rowCount - new Set(rowIssues.map((r) => r.row)).size;
  return (
    <section className={cx("plumb-element-section", "plumb-import")} aria-label={t("mapColumns")}>
      <div className={cx("plumb-element-div", "plumb-import-table")} role="table" aria-label={t("columnMapping")}>
        <div role="row" className={cx("plumb-element-div", "plumb-import-row plumb-change-header")}><span role="columnheader" className={cx("plumb-element-span")}>{t("columnInFile")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("sampleValues")}</span><span role="columnheader" className={cx("plumb-element-span")}>{t("importAs")}</span></div>
        {columns.map((c) => {
          const target = targetOf(c.id);
          return (
            <div role="row" key={c.id} className={cx("plumb-element-div", "plumb-import-row")}>
              <span role="rowheader" className={cx("plumb-element-span", "plumb-label")}>{c.header}</span>
              <span role="cell" className={cx("plumb-element-span", "plumb-item-description")}>{c.sample.slice(0, 3).join(" · ")}</span>
              <span role="cell" className={cx("plumb-element-span", "plumb-import-target")}>
                <Select label="" aria-label={t("importColumnAs", { column: c.header })} size="sm" options={options} selectedKey={mapping[c.id] ?? ""} onSelectionChange={(k) => {
                  onMappingChange({ ...mapping, [c.id]: String(k) });
                  // A column's file unit belongs to its old target.
                  if (sourceUnits[c.id] !== undefined && String(k) !== mapping[c.id]) { const { [c.id]: _drop, ...rest } = sourceUnits; onSourceUnitsChange?.(rest); }
                }} />
                {target?.units?.length ? (
                  <Select label="" aria-label={t("unitInFile", { column: c.header })} size="sm" placeholder={t("fileUnit")}
                    options={target.units.map((u) => ({ id: u, label: u }))} selectedKey={sourceUnits[c.id] ?? null}
                    onSelectionChange={(k) => onSourceUnitsChange?.({ ...sourceUnits, [c.id]: String(k) })} />
                ) : null}
              </span>
            </div>
          );
        })}
      </div>
      {(missing.length || dupes.length || rowIssues.length || unitMissing.length || currencyMismatch) ? (
        <div className={cx("plumb-element-div", "plumb-import-issues")} role="status">
          <CircleAlert aria-hidden />
          <ul className={cx("plumb-element-ul")}>
            {missing.map((x) => <li key={`m${x.id}`} className={cx("plumb-element-li")}>{t("chooseColumnFor", { label: x.label })}</li>)}
            {dupes.map((x) => <li key={`d${x.id}`} className={cx("plumb-element-li")}>{t("mappedTwice", { label: x.label })}</li>)}
            {unitMissing.map((c) => <li key={`u${c.id}`} className={cx("plumb-element-li")}>{t("chooseFileUnit", { column: c.header })}</li>)}
            {currencyMismatch && <li className={cx("plumb-element-li")}>{t("currencyMismatch", { file: fileCurrency!, currency })}</li>}
            {rowIssues.slice(0, 5).map((r) => <li key={`r${r.row}${r.target}`} className={cx("plumb-element-li")}>{t("rowIssue", { row: r.row, message: r.message })}</li>)}
            {rowIssues.length > 5 && <li className={cx("plumb-element-li")}>{plural("moreRows", rowIssues.length - 5)}</li>}
          </ul>
        </div>
      ) : null}
      {conversions.length > 0 && (
        <div className={cx("plumb-element-div", "plumb-import-conversions")}>
          <ul className={cx("plumb-element-ul")}>{conversions.map((c) => <li key={c.column} className={cx("plumb-element-li")}>{t("conversion", c)}</li>)}</ul>
          <Checkbox isSelected={confirmed} onChange={(v) => setConfirmedSig(v ? sig : null)}>{t("confirmConversion")}</Checkbox>
        </div>
      )}
      <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>
        <Button variant="primary" isDisabled={!ready} isPending={isPending} onPress={onImport}>{t("importRows", { n: importable, total: rowCount })}</Button>
        {rowIssues.length > 0 && <span className={cx("plumb-element-span", "plumb-item-description")}>{t("rowsSkipped")}</span>}
      </div>
    </section>
  );
}
