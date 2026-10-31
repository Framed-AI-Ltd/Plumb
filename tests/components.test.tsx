// Safety and maths in newer components: formatted text never becomes markup, takeoff values are exact.
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { FormattedText, LocaleProvider, takeoffValue } from "../src";

const html = (md: string) => renderToStaticMarkup(<LocaleProvider><FormattedText>{md}</FormattedText></LocaleProvider>);

describe("FormattedText", () => {
  it("renders bold, italic, lists, and safe links", () => {
    const out = html("**Bold** and *it*\n\n- one\n- two\n\n1. a\n2. b\n\n[site](https://example.com) [mail](mailto:a@b.co)").replace(/ class="[^"]*"/g, "");
    expect(out).toContain("<strong>Bold</strong>");
    expect(out).toContain("<em>it</em>");
    expect(out).toContain("<ul><li>one</li><li>two</li></ul>");
    expect(out).toContain("<ol><li>a</li><li>b</li></ol>");
    expect(out).toContain('href="https://example.com"');
    expect(out).toContain('href="mailto:a@b.co"');
  });
  it.each([
    "[x](javascript:alert(1))",
    "[x](JaVaScRiPt:alert(1))",
    "[x](data:text/html,<script>alert(1)</script>)",
    "[x](vbscript:msgbox(1))",
    "[x](//evil.example)",
  ])("never links unsafe URLs: %s", (md) => {
    const out = html(md);
    expect(out).not.toMatch(/<a\b/);
    expect(out).not.toMatch(/href=/i);
  });
  it("escapes raw HTML instead of rendering it", () => {
    const out = html('<script>alert(1)</script> <img src=x onerror="alert(1)">');
    expect(out).not.toMatch(/<script|<img/i);
    expect(out).toContain("&lt;script&gt;");
  });
});

describe("takeoffValue", () => {
  const len = { id: "l", label: "", kind: "length" as const, points: [[0, 0], [0.5, 0]] as [number, number][] };
  it("scales lengths by the confirmed page width", () => {
    expect(takeoffValue(len, 12, 0.75)).toBeCloseTo(6, 10);
  });
  it("uses the page's true proportions for vertical distances", () => {
    expect(takeoffValue({ ...len, points: [[0, 0], [0, 1]] }, 10, 0.5)).toBeCloseTo(5, 10);
  });
  it("computes areas with the shoelace formula", () => {
    // Half the page wide and the full page tall, on a 10 m wide page that is half as tall as it is wide: 5 m × 5 m.
    const sq = { id: "a", label: "", kind: "area" as const, points: [[0, 0], [0.5, 0], [0.5, 1], [0, 1]] as [number, number][] };
    expect(takeoffValue(sq, 10, 0.5)).toBeCloseTo(5 * 5, 10);
  });
  it("stays unknown without a confirmed scale, but counts don't need one", () => {
    expect(takeoffValue(len, null, 1)).toBeNull();
    expect(takeoffValue({ id: "c", label: "", kind: "count", points: [[0, 0], [1, 1], [0.5, 0.5]] }, null, 1)).toBe(3);
  });
  it("prefers a typed value", () => {
    expect(takeoffValue({ ...len, value: 7.25 }, null, 1)).toBe(7.25);
  });
});
