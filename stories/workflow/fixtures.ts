import type { CategoryColor } from "../../src";

export interface LineItem {
  id: string;
  name: string;
  note: string;
  trade: { label: string; color: CategoryColor };
  qty: number | null;
  unit: string;
  rate: number;
  source: { source: string; date: string; verified: boolean };
}
export const lineItems: LineItem[] = [
  { id: "prep", name: "Site protection & preparation", note: "Retained floor and adjacent spaces", trade: { label: "Prep", color: "honey" }, qty: 1, unit: "lot", rate: 1250, source: { source: "Site notes p1", date: "2026-10-22", verified: true } },
  { id: "cab", name: "Cabinet installation", note: "Per supplied layout", trade: { label: "Carpentry", color: "clay" }, qty: 24, unit: "hr", rate: 85, source: { source: "Layout v2", date: "2026-10-20", verified: true } },
  { id: "fin", name: "Finish materials", note: "Customer selection pending", trade: { label: "Materials", color: "spruce" }, qty: 1, unit: "lot", rate: 4200, source: { source: "Schedule", date: "2026-10-21", verified: false } },
  { id: "wall", name: "Wall finish repairs", note: "Site measurement required", trade: { label: "Drywall", color: "lake" }, qty: null, unit: "m²", rate: 65, source: { source: "Site notes p1", date: "2026-10-22", verified: false } },
];
export const documents = [
  { id: "d1", name: "Site notes — 22 Oct.pdf", kind: "Notes", color: "honey", pages: 3, status: "processed" },
  { id: "d2", name: "Kitchen layout v2.pdf", kind: "Plan", color: "lake", pages: 2, status: "processed" },
  { id: "d3", name: "Existing kitchen photos", kind: "Photos", color: "clay", pages: 14, status: "processed" },
  { id: "d4", name: "Allowance schedule.xlsx", kind: "Schedule", color: "sage", pages: 1, status: "review" },
  { id: "d5", name: "Electrical panel photo.jpg", kind: "Photo", color: "clay", pages: 1, status: "processing" },
] as const;
export const rooms = [
  { id: "kitchen", name: "Kitchen", color: "clay", records: 9, note: "Refresh in progress" },
  { id: "bath", name: "Main bathroom", color: "lake", records: 6, note: "Last updated 2024" },
  { id: "utility", name: "Utility & plumbing", color: "sage", records: 4, note: "Valves replaced Sep" },
  { id: "exterior", name: "Exterior", color: "honey", records: 3, note: "Roof inspected 2025" },
] as const;
export const homeRecords = [
  { id: "h1", item: "Kitchen cabinets", room: "Kitchen", detail: "Painted MDF, 1998", state: "current", source: "Site visit" },
  { id: "h2", item: "Kitchen cabinets", room: "Kitchen", detail: "Shaker, white oak — P-003", state: "proposed", source: "Proposal P-003" },
  { id: "h3", item: "Countertop", room: "Kitchen", detail: "Quartz, 30 mm — P-002", state: "approved", source: "Approved P-002" },
  { id: "h4", item: "Under-sink shut-off valves", room: "Utility & plumbing", detail: "Replaced, ¼-turn", state: "completed", source: "Job log" },
  { id: "h5", item: "Ceiling height", room: "Kitchen", detail: "", state: "current", source: "Requested for site visit" },
] as const;
