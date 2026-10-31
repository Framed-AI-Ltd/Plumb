import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { FloorPlan } from "../src/patterns/media";

const mapped = { id: "kitchen", name: "Mapped kitchen", polygon: [[0, 0], [4, 0], [4, 4]] as [number, number][] };
const unmapped = { id: "bedroom", name: "Unmapped bedroom", polygon: [], area: null };

describe("FloorPlan equivalent room and asset list", () => {
  it("keeps unmapped rooms and their asset actions alongside drawable rooms", () => {
    const out = renderToStaticMarkup(<FloorPlan aria-label="Home" rooms={[mapped, unmapped]} pins={[{ id: "boiler", label: "Boiler details", at: [NaN, 0], roomId: "bedroom" }]} />);
    expect(out).toContain("Mapped kitchen");
    expect(out).toContain("Unmapped bedroom");
    expect(out).toContain("Boiler details");
    expect(out).toContain("Not measured");
    expect(out).not.toContain('cx="NaN"');
  });

  it("shows room and loose asset actions even when no drawing is available", () => {
    const out = renderToStaticMarkup(<FloorPlan aria-label="Home" rooms={[unmapped]} pins={[{ id: "meter", label: "Meter details", at: [0, 0] }]} />);
    expect(out).toContain("No plan for this level yet");
    expect(out).toContain("Unmapped bedroom");
    expect(out).toContain("Meter details");
    expect(out).not.toContain('class="plumb-plan-drawing"');
  });

  it("does not use nonfinite polygons in drawing bounds", () => {
    const out = renderToStaticMarkup(<FloorPlan aria-label="Home" rooms={[mapped, { ...unmapped, polygon: [[0, 0], [Infinity, 0], [0, 3]] }]} />);
    expect(out).toContain("Unmapped bedroom");
    expect(out).toContain("viewBox=");
    expect(out).not.toMatch(/(?:viewBox|points)="[^"]*(?:Infinity|NaN)/);
  });
});
