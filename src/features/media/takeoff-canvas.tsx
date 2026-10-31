// Spatial and media records: floor plans, before/after photos, voice notes, and measured takeoffs
// (F-H12, F-H15, F-H16, F-H18, F-H19, F-H46, F-C07, F-C17, F-C19, F-H48).
import { Hash,MousePointer2,Ruler,Scaling,Spline,Trash2 } from "../../lib/icons";
import { useState } from "react";
import { Button,IconButton } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { Badge,Callout } from "../../lib/feedback";
import { NumberField,SegmentedControl,Select,TextField } from "../../lib/fields";
import { useMessages,useNumberFormat } from "../../lib/locale";
import { Unknown } from "../domain";
import { dist } from "./helpers";
import { takeoffValue } from "./takeoff-value";
import type { TakeoffMeasurement } from "./types";

export interface TakeoffCanvasProps {
  /** The page or drawing image. */
  src: string;
  alt: string;
  /** Real length of the page's full width, from a confirmed scale (e.g. 12.4 for 12.4 m). Null = not calibrated. */
  pageWidth: number | null;
  /** Page height divided by width, so area maths uses the true proportions. */
  aspectRatio: number;
  unit?: string;
  measurements: TakeoffMeasurement[];
  onChange: (measurements: TakeoffMeasurement[]) => void;
  /**
   * Calibrate from the drawing: the person draws along a dimension they know and types its real length; this
   * receives the resulting page width. Without it, the scale must be supplied by the app.
   */
  onScaleChange?: (pageWidth: number) => void;
  className?: string;
}
/**
 * Measure lengths, areas, and counts on a scale-confirmed drawing (F-C19). Click to add points; double-click or
 * "Finish" completes the shape. Every measurement is listed with its value, and values can be typed instead of drawn, so the
 * takeoff works without a pointer. Without a confirmed scale, lengths and areas stay Unknown.
 */
export function TakeoffCanvas({ src, alt, pageWidth, aspectRatio, unit = "m", measurements, onChange, onScaleChange, className }: TakeoffCanvasProps) {
  const { t } = useMessages();
  const nf = useNumberFormat({ maximumFractionDigits: 2 });
  const [tool, setTool] = useState<"select" | "length" | "area" | "count" | "scale">("select");
  const [draft, setDraft] = useState<[number, number][]>([]);
  const [knownLength, setKnownLength] = useState(NaN);
  // Scale: a two-point line plus its real length gives the real width of the whole page.
  const scaleLine = tool === "scale" && draft.length >= 2 ? dist(draft[0], draft[draft.length - 1], aspectRatio) : 0;
  const applyScale = () => {
    if (!scaleLine || !(knownLength > 0)) return;
    onScaleChange?.(knownLength / scaleLine);
    setDraft([]); setKnownLength(NaN); setTool("select");
  };
  const finish = () => {
    if (tool === "scale") return applyScale();
    if (tool === "select" || !draft.length || (tool === "length" && draft.length < 2) || (tool === "area" && draft.length < 3)) return;
    const n = measurements.filter((m) => m.kind === tool).length + 1;
    onChange([...measurements, { id: crypto.randomUUID(), label: t(`takeoff_${tool}N`, { n }), kind: tool, points: draft }]);
    setDraft([]);
  };
  const unitFor = (k: TakeoffMeasurement["kind"]) => (k === "area" ? `${unit}²` : k === "length" ? unit : "");
  return (
    <div className={cx("plumb-element-div", cx("plumb-takeoff", className))}>
      <div className={cx("plumb-element-div", "plumb-takeoff-bar")}>
        <SegmentedControl aria-label={t("measureTool")} size="sm" selectedKey={tool} onSelectionChange={(k) => { setTool(k as typeof tool); setDraft([]); }}
          options={[{ id: "select", label: t("takeoff_select"), icon: <MousePointer2 aria-hidden /> }, { id: "length", label: t("takeoff_length"), icon: <Ruler aria-hidden /> }, { id: "area", label: t("takeoff_area"), icon: <Spline aria-hidden /> }, { id: "count", label: t("takeoff_count"), icon: <Hash aria-hidden /> },
            ...(onScaleChange ? [{ id: "scale", label: t("takeoff_scale"), icon: <Scaling aria-hidden /> }] : [])]} />
        {tool !== "scale" && draft.length > 0 && <Button size="sm" variant="primary" onPress={finish}>{t("finishShape")}</Button>}
        {pageWidth === null && <Badge tone="warning">{t("scaleNotConfirmed")}</Badge>}
      </div>
      {tool === "scale" && (
        <Callout tone="info" title={t("setScaleTitle")}>
          <div className={cx("plumb-element-div", "plumb-takeoff-scale")}>
            <span className={cx("plumb-element-span")}>{draft.length < 2 ? t("setScaleHelp") : t("setScaleLength")}</span>
            <NumberField label={t("realLength")} size="sm" hideStepper unit={unit} minValue={0} value={knownLength} onChange={setKnownLength} isDisabled={draft.length < 2} />
            <Button size="sm" variant="primary" isDisabled={!scaleLine || !(knownLength > 0)} onPress={applyScale}>{t("setScale")}</Button>
          </div>
        </Callout>
      )}
      {/* Pointer drawing; the measurement list below is the keyboard and screen-reader equivalent. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className={cx("plumb-element-div", "plumb-takeoff-stage")} data-tool={tool} style={{ aspectRatio: `1 / ${aspectRatio}` }}
        // The clicks of a double-click (detail > 1) finish the shape instead of adding points.
        onClick={(e) => {
          if (tool === "select" || e.detail > 1) return;
          const r = e.currentTarget.getBoundingClientRect();
          const p: [number, number] = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
          // A scale line has exactly two ends; a third click starts it again.
          setDraft((d) => (tool === "scale" && d.length >= 2 ? [p] : [...d, p]));
        }}
        onDoubleClick={finish}>
        <img src={src} alt={alt} draggable={false} className={cx("plumb-element-img")} />
        <svg viewBox={`0 0 1 ${aspectRatio}`} preserveAspectRatio="none" aria-hidden className={cx("plumb-element-svg")}>
          {[...measurements, { id: "draft", label: "", kind: tool === "select" || tool === "scale" ? "length" : tool, points: draft } as TakeoffMeasurement].map((m) => {
            const pts = m.points.map(([x, y]) => `${x},${y * aspectRatio}`).join(" ");
            return (
              <g key={m.id} className={cx("plumb-element-g", "plumb-takeoff-shape")} data-kind={m.kind} data-draft={m.id === "draft" || undefined}>
                {m.kind === "area" ? <polygon points={pts} className={cx("plumb-element-polygon")} /> : m.kind === "length" ? <polyline points={pts} className={cx("plumb-element-polyline")} /> : null}
                {m.points.map(([x, y], i) => <circle key={i} cx={x} cy={y * aspectRatio} r={0.006} className={cx("plumb-element-circle")} />)}
              </g>
            );
          })}
        </svg>
      </div>
      <ul className={cx("plumb-element-ul", "plumb-takeoff-list")} aria-label={t("measurements")}>
        {measurements.map((m) => {
          const v = takeoffValue(m, pageWidth, aspectRatio);
          return (
            <li key={m.id} className={cx("plumb-element-li")}>
              <span className={cx("plumb-element-span", "plumb-label")}>{m.label}</span>
              <span className={cx("plumb-element-span", "plumb-num")}>{v === null ? <Unknown>{t("needsScale")}</Unknown> : `${nf.format(v)} ${unitFor(m.kind)}`}</span>
              {m.value !== undefined && <Badge>{t("typedIn")}</Badge>}
              <IconButton size="sm" label={t("removeName", { name: m.label })} icon={<Trash2 />} onPress={() => onChange(measurements.filter((x) => x.id !== m.id))} />
            </li>
          );
        })}
        {!measurements.length && <li className={cx("plumb-element-li", "plumb-item-description")}>{t("noMeasurements")}</li>}
      </ul>
      <TypedMeasurement unit={unit} onAdd={(m) => onChange([...measurements, m])} />
    </div>
  );
}
/** Adds a measured value without drawing (keyboard users, or a tape-measured dimension). */
export function TypedMeasurement({ unit, onAdd }: { unit: string; onAdd: (m: TakeoffMeasurement) => void }) {
  const { t } = useMessages();
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState<TakeoffMeasurement["kind"]>("length");
  const [value, setValue] = useState(NaN);
  const ok = label.trim() && !Number.isNaN(value);
  return (
    <form className={cx("plumb-element-form", "plumb-takeoff-typed")} onSubmit={(e) => { e.preventDefault(); if (!ok) return; onAdd({ id: crypto.randomUUID(), label: label.trim(), kind, points: [], value }); setLabel(""); setValue(NaN); }}>
      <TextField label={t("measurementName")} size="sm" value={label} onChange={setLabel} />
      <Select label={t("kind")} size="sm" selectedKey={kind} onSelectionChange={(k) => setKind(k as TakeoffMeasurement["kind"])}
        options={[{ id: "length", label: t("takeoff_length") }, { id: "area", label: t("takeoff_area") }, { id: "count", label: t("takeoff_count") }]} />
      <NumberField label={t("value")} size="sm" hideStepper unit={kind === "area" ? `${unit}²` : kind === "length" ? unit : undefined} value={value} onChange={setValue} minValue={0} />
      <Button type="submit" size="sm" isDisabled={!ok}>{t("addMeasurement")}</Button>
    </form>
  );
}
