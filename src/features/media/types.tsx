// Spatial and media records: floor plans, before/after photos, voice notes, and measured takeoffs
// (F-H12, F-H15, F-H16, F-H18, F-H19, F-H46, F-C07, F-C17, F-C19, F-H48).

/* ---------- Measured takeoff (F-C19) ---------- */
export interface TakeoffMeasurement {
  id: string;
  label: string;
  kind: "length" | "area" | "count";
  /** Points in page fractions (0–1); empty for a value typed in by hand. */
  points: [number, number][];
  /** For hand-entered values, or to override the drawn value. */
  value?: number;
}
