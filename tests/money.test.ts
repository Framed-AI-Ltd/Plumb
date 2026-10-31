// The money and truth rules: totals, schedules, customer views, and revision deltas.
import { describe, expect, it } from "vitest";
import {
  allocateMilestones, customerBreakdown, lineAmount, lineChange, priceDelta, proposalBlockers, proposalTotals, scheduleGap,
  type BreakdownLine, type ProposalLine,
} from "../src";

describe("allocateMilestones", () => {
  it("splits in whole cents and gives the remainder to the last milestone", () => {
    const amounts = allocateMilestones([{ id: "a", label: "", percent: 1 / 3 }, { id: "b", label: "", percent: 1 / 3 }, { id: "c", label: "", percent: 1 / 3 }], 100);
    expect(amounts).toEqual([33.33, 33.33, 33.34]);
    expect(amounts.reduce((a, b) => a + b, 0)).toBeCloseTo(100, 10);
  });
  it("mixes fixed amounts and shares", () => {
    expect(allocateMilestones([{ id: "a", label: "", amount: 1000 }, { id: "b", label: "", percent: 0.9 }], 10000)).toEqual([1000, 9000]);
  });
  it("never invents money when the shares don't reach 100 %", () => {
    const ms = [{ id: "a", label: "", percent: 0.3 }, { id: "b", label: "", percent: 0.5 }];
    expect(allocateMilestones(ms, 1000)).toEqual([300, 500]);
    expect(scheduleGap(ms, 1000)).toBe(200);
  });
  it("doesn't lose a cent to floating-point error on common shares", () => {
    for (const pct of [0.29, 0.57, 0.58, 0.41]) {
      expect(allocateMilestones([{ id: "a", label: "", percent: pct }], 1000)).toEqual([Math.round(pct * 100000) / 100]);
      expect(scheduleGap([{ id: "a", label: "", percent: pct }, { id: "b", label: "", percent: Math.round((1 - pct) * 100) / 100 }], 1000)).toBe(0);
    }
  });
  it("reports an over-allocated schedule as a negative gap", () => {
    expect(scheduleGap([{ id: "a", label: "", amount: 600 }, { id: "b", label: "", amount: 600 }], 1000)).toBe(-200);
  });
});

const lines: ProposalLine[] = [
  { id: "1", label: "Prep", qty: 1, unit: "lot", amount: 1000 },
  { id: "2", label: "Lighting", qty: 6, unit: "lin m", amount: 840, kind: "option" },
  { id: "3", label: "Appliances", qty: null, unit: "lot", amount: null, kind: "excluded" },
  { id: "4", label: "Wall repair", qty: null, unit: "m²", amount: null },
];

describe("proposalTotals and proposalBlockers", () => {
  it("keeps options and exclusions out of the price and marks unpriced lines as partial", () => {
    const t = proposalTotals({ lines, total: 1000 });
    expect(t.sum).toBe(1000);
    expect(t.partial).toBe(true);
    expect(t.inPrice.map((l) => l.id)).toEqual(["1", "4"]);
  });
  it("checks the schedule against the tax-inclusive total", () => {
    const p = { lines, total: 1000, taxes: [{ label: "HST", amount: 150 }], milestones: [{ id: "a", label: "", amount: 1150 }] };
    expect(proposalTotals(p).grand).toBe(1150);
    expect(proposalBlockers(p)).toEqual([]);
    expect(proposalBlockers({ ...p, milestones: [{ id: "a", label: "", amount: 1000 }] })).toEqual([{ code: "schedule" }]);
  });
  it("blocks when the lines don't add up to the stated total, and keeps custom reasons", () => {
    expect(proposalBlockers({ lines, total: 1200, issueBlockers: ["Customer email missing"] })).toEqual([{ code: "linesTotal" }, { code: "custom", message: "Customer email missing" }]);
  });
});

describe("customerBreakdown", () => {
  const contractor: BreakdownLine[] = [
    { label: "Cabinets", amount: 8000 },
    { label: "Prep", amount: 2000 },
    { label: "Finish allowance", amount: 4000, kind: "allowance" },
    { label: "Overhead", amount: 1000, private: true },
    { label: "Markup", amount: 1000, private: true },
  ];
  it("folds private lines into fixed lines and keeps allowances at face value", () => {
    const { rows, problems } = customerBreakdown(contractor, 16000);
    expect(problems).toEqual([]);
    expect(rows.some((r) => r.private)).toBe(false);
    expect(rows.find((r) => r.label === "Finish allowance")?.amount).toBe(4000);
    expect(rows.reduce((a, r) => a + (r.amount ?? 0), 0)).toBe(16000);
    expect(rows.find((r) => r.label === "Cabinets")?.amount).toBe(9600);
  });
  it("never shows the working to customers", () => {
    const { rows } = customerBreakdown([{ label: "Labour", amount: 100, formula: "1 hr × $100" }], 100);
    expect(rows[0].formula).toBeUndefined();
  });
  it("reports totals that don't match the lines instead of hiding the difference", () => {
    expect(customerBreakdown(contractor, 15000).problems.map((p) => p.key)).toContain("problemLinesTotal");
  });
  it("refuses private allowances and priced exclusions", () => {
    const keys = customerBreakdown([{ label: "A", amount: 10, kind: "allowance", private: true }, { label: "X", amount: 5, kind: "excluded" }], 10).problems.map((p) => p.key);
    expect(keys).toEqual(expect.arrayContaining(["problemPrivateFaceValue", "problemExcludedAmount"]));
  });
  it("rounds so the visible rows always sum to the total", () => {
    const { rows } = customerBreakdown([{ label: "A", amount: 100 }, { label: "B", amount: 100 }, { label: "C", amount: 100 }, { label: "Markup", amount: 100, private: true }], 400);
    expect(rows.reduce((a, r) => a + (r.amount ?? 0), 0)).toBeCloseTo(400, 10);
  });
});

describe("revisions", () => {
  it("never counts an unpriced side as zero", () => {
    expect(priceDelta([{ id: "1", label: "", before: { qty: null, unit: "m²", amount: null }, after: { qty: 10, unit: "m²", amount: 500 } }])).toEqual({ delta: 0, partial: true });
  });
  it("leaves options and exclusions out of the price change", () => {
    expect(priceDelta([
      { id: "1", label: "", after: { qty: 1, unit: "lot", amount: 300, kind: "option" } },
      { id: "2", label: "", before: { qty: 1, unit: "lot", amount: 100 }, after: { qty: 2, unit: "lot", amount: 200 } },
    ])).toEqual({ delta: 100, partial: false });
  });
  it("classifies line changes", () => {
    const side = { qty: 1, unit: "ea", amount: 1 };
    expect(lineChange({ id: "", label: "", after: side })).toBe("added");
    expect(lineChange({ id: "", label: "", before: side })).toBe("removed");
    expect(lineChange({ id: "", label: "", before: side, after: { ...side } })).toBe("unchanged");
    expect(lineChange({ id: "", label: "", before: side, after: { ...side, kind: "allowance" } })).toBe("changed");
  });
});

describe("lineAmount", () => {
  it("is unknown when quantity or rate is unknown", () => {
    expect(lineAmount({ id: "", label: "", qty: null, unit: "m²", rate: 10 })).toBeNull();
    expect(lineAmount({ id: "", label: "", qty: 2, unit: "m²", rate: null })).toBeNull();
  });
  it("includes waste and rounds to cents", () => {
    expect(lineAmount({ id: "", label: "", qty: 10, unit: "m²", rate: 65, waste: 0.1 })).toBe(715);
    expect(lineAmount({ id: "", label: "", qty: 0.333, unit: "hr", rate: 85 })).toBe(28.31);
  });
});


describe("one-cent validation", () => {
  it.each([[100.01, 100.02], [100.02, 100.01], [0.29, 0.30]])("blocks lines totaling %s against %s", (sum, total) => {
    expect(proposalBlockers({ lines: [{ id: "a", label: "Work", qty: 1, unit: "lot", amount: sum }], total })).toEqual([{ code: "linesTotal" }]);
    const checked = customerBreakdown([{ label: "Work", amount: sum }], total);
    expect(checked.problems.map((p) => p.key)).toContain("problemLinesTotal");
    expect(checked.rows[0].amount).toBe(sum);
  });
  it("accepts an exact cent total despite binary addition drift", () => {
    const priced = [{ label: "A", amount: 0.1 }, { label: "B", amount: 0.2 }];
    expect(customerBreakdown(priced, 0.3).problems).toEqual([]);
  });
});
