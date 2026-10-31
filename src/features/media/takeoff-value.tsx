// Spatial and media records: floor plans, before/after photos, voice notes, and measured takeoffs
// (F-H12, F-H15, F-H16, F-H18, F-H19, F-H46, F-C07, F-C17, F-C19, F-H48).
import { dist } from "./helpers";
import type { TakeoffMeasurement } from "./types";

/** Compute a measurement's value in real units; null when the scale isn't known. */
export function takeoffValue(m: TakeoffMeasurement, pageWidth: number | null, aspectRatio: number): number | null {
  if (m.value !== undefined) return m.value;
  if (m.kind === "count") return m.points.length;
  if (pageWidth === null) return null;
  if (m.kind === "length") return m.points.slice(1).reduce((a, p, i) => a + dist(m.points[i], p, aspectRatio), 0) * pageWidth;
  const shoelace = Math.abs(m.points.reduce((a, p, i) => { const q = m.points[(i + 1) % m.points.length]; return a + p[0] * q[1] * aspectRatio - q[0] * p[1] * aspectRatio; }, 0)) / 2;
  return shoelace * pageWidth * pageWidth;
}
