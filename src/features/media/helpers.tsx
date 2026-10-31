// Spatial and media records: floor plans, before/after photos, voice notes, and measured takeoffs
// (F-H12, F-H15, F-H16, F-H18, F-H19, F-H46, F-C07, F-C17, F-C19, F-H48).

export const dist = (a: [number, number], b: [number, number], ar: number) => Math.hypot(a[0] - b[0], (a[1] - b[1]) * ar);
