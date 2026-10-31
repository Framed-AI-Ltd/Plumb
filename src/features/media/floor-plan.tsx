// Spatial and media records: floor plans, before/after photos, voice notes, and measured takeoffs
// (F-H12, F-H15, F-H16, F-H18, F-H19, F-H46, F-C07, F-C17, F-C19, F-H48).
import { Map as MapIcon } from "../../lib/icons";
import { useId,type ReactNode } from "react";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "../../lib/cx";
import { EmptyState } from "../../lib/feedback";
import { SegmentedControl } from "../../lib/fields";
import { useMessages,useNumberFormat } from "../../lib/locale";
import { Unknown } from "../domain";
import { Provenance,type ProvenanceKind } from "../framed";

/* ---------- Floor plan (F-H12, F-H15, F-H16, F-H18, F-H19, F-H46) ---------- */
export interface PlanRoom {
  id: string;
  name: string;
  /** Outline in plan units (e.g. metres), as [x, y] points. */
  polygon: [number, number][];
  /** Area in the plan's square unit; null = not measured. */
  area?: number | null;
  provenance?: ProvenanceKind;
  /** Short status for the room list, e.g. "2 open issues" or "Not scanned". */
  meta?: ReactNode;
}
export interface PlanPin { id: string; label: string; at: [number, number]; roomId?: string }
export interface FloorPlanProps {
  "aria-label": string;
  rooms: PlanRoom[];
  /** Assets, issues, or notes pinned to a location (F-H19). */
  pins?: PlanPin[];
  /** Plan unit for lengths, e.g. "m"; areas use its square. */
  unit?: string;
  selectedId?: string | null;
  onSelect?: (roomId: string) => void;
  onPinAction?: (pin: PlanPin) => void;
  /** Several floors: shown as a level switcher above the plan. Pass the current level's rooms and pins. */
  levels?: { id: string; label: string }[];
  level?: string;
  onLevelChange?: (id: string) => void;
  /** Shown when the level has no mapped rooms yet (e.g. an action to import or draw a plan). */
  emptyState?: ReactNode;
  className?: string;
}
/**
 * A 2D plan of one level. Each room is a button on the drawing and also a row in the list beside it, so everything on
 * the plan is reachable by keyboard and screen reader (F-H46). Unmeasured areas show as Unknown. For 3D or scan
 * viewers, render them in the app and keep this list as their accessible equivalent.
 */
export function FloorPlan({ rooms: allRooms, pins = [], unit = "m", selectedId, onSelect, onPinAction, levels, level, onLevelChange, emptyState, className, ...aria }: FloorPlanProps) {
  const { t } = useMessages();
  const nf = useNumberFormat({ maximumFractionDigits: 1 });
  const titleId = useId();
  // Rooms without a drawable outline can't be placed; they'd make the drawing's bounds NaN.
  const rooms = allRooms.filter((r) => r.polygon.length >= 3 && r.polygon.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y)));
  const pts = rooms.flatMap((r) => r.polygon);
  const [minX, minY] = [Math.min(...pts.map((p) => p[0])), Math.min(...pts.map((p) => p[1]))];
  const [maxX, maxY] = [Math.max(...pts.map((p) => p[0])), Math.max(...pts.map((p) => p[1]))];
  const pad = Math.max(maxX - minX, maxY - minY) * 0.04 || 1;
  const centre = (poly: [number, number][]) => [poly.reduce((a, p) => a + p[0], 0) / poly.length, poly.reduce((a, p) => a + p[1], 0) / poly.length];
  const area = (r: PlanRoom) => (r.area === undefined ? null : r.area === null ? <Unknown>{t("notMeasured")}</Unknown> : <span className={cx("plumb-element-span", "plumb-num")}>{nf.format(r.area)} {unit}²</span>);
  const levelSwitch = levels && levels.length > 1 && (
    <SegmentedControl aria-label={t("level")} size="sm" selectedKey={level ?? levels[0].id} onSelectionChange={(k) => onLevelChange?.(String(k))} options={levels.map((l) => ({ id: l.id, label: l.label }))} />
  );
  // Pins outside any room still need a keyboard and screen-reader route.
  const loosePins = pins.filter((p) => !p.roomId || !allRooms.some((r) => r.id === p.roomId));
  return (
    <div className={cx("plumb-element-div", cx("plumb-plan-wrap", className))}>
    {levelSwitch}
    <div className={cx("plumb-element-div", "plumb-plan")}>
      {rooms.length ? <svg className={cx("plumb-element-svg", "plumb-plan-drawing")} viewBox={`${minX - pad} ${minY - pad} ${maxX - minX + 2 * pad} ${maxY - minY + 2 * pad}`} role="group" aria-labelledby={titleId}>
        <title id={titleId} className={cx("plumb-element-title")}>{aria["aria-label"]}</title>
        {rooms.map((r) => {
          const [cx_, cy] = centre(r.polygon);
          return (
            <g key={r.id} className={cx("plumb-element-g", "plumb-plan-room")} data-selected={selectedId === r.id || undefined} data-unmeasured={r.area === null || undefined}>
              {/* Pointer shortcut; the room list is the keyboard and screen-reader equivalent. */}
              <polygon points={r.polygon.map((p) => p.join(",")).join(" ")} onClick={() => onSelect?.(r.id)} className={cx("plumb-element-polygon")} />
              <text x={cx_} y={cy} textAnchor="middle" dominantBaseline="middle" aria-hidden className={cx("plumb-element-text")}>{r.name}</text>
            </g>
          );
        })}
        {pins.filter((p) => p.at.every(Number.isFinite)).map((p) => (
          <circle key={p.id} className={cx("plumb-element-circle", "plumb-plan-pin")} cx={p.at[0]} cy={p.at[1]} r={pad * 0.6} onClick={() => onPinAction?.(p)}><title className={cx("plumb-element-title")}>{p.label}</title></circle>
        ))}
      </svg> : emptyState ?? <EmptyState icon={<MapIcon />} title={t("noPlanYet")} />}
      <ul className={cx("plumb-element-ul", "plumb-plan-list")} aria-label={t("roomsOnPlan", { plan: aria["aria-label"] })}>
        {allRooms.map((r) => (
          <li key={r.id} className={cx("plumb-element-li", "plumb-plan-item")} data-current={selectedId === r.id || undefined}>
            <AriaButton className={cx("plumb-plan-row plumb-focusable")} aria-current={selectedId === r.id || undefined} onPress={() => onSelect?.(r.id)}>
              <span className={cx("plumb-element-span", "plumb-label")}>{r.name}</span>
              <span className={cx("plumb-element-span", "plumb-plan-row-meta")}>{area(r)}{r.meta && <span className={cx("plumb-element-span", "plumb-item-description")}>{r.meta}</span>}</span>
            </AriaButton>
            {/* Outside the row button: the provenance badge is its own button. */}
            {r.provenance && <span className={cx("plumb-element-span", "plumb-plan-provenance")}><Provenance kind={r.provenance} /></span>}
            {pins.filter((p) => p.roomId === r.id).length > 0 && (
              <ul className={cx("plumb-element-ul", "plumb-plan-pins")}>
                {pins.filter((p) => p.roomId === r.id).map((p) => (
                  <li key={p.id} className={cx("plumb-element-li")}><AriaButton className={cx("plumb-link plumb-focusable")} onPress={() => onPinAction?.(p)}>{p.label}</AriaButton></li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {loosePins.length > 0 && (
          <li className={cx("plumb-element-li")}>
            <span className={cx("plumb-element-span", "plumb-plan-row plumb-plan-row-static")}><span className={cx("plumb-element-span", "plumb-label")}>{t("elsewhereOnPlan")}</span></span>
            <ul className={cx("plumb-element-ul", "plumb-plan-pins")}>
              {loosePins.map((p) => <li key={p.id} className={cx("plumb-element-li")}><AriaButton className={cx("plumb-link plumb-focusable")} onPress={() => onPinAction?.(p)}>{p.label}</AriaButton></li>)}
            </ul>
          </li>
        )}
      </ul>
    </div>
    </div>
  );
}
