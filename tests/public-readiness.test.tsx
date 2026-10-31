import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { EstimateBreakdown, FormattedText, LocaleProvider } from "../src";

const lines = [{ label: "Known work", amount: 100 }, { label: "Unpriced work", amount: null }];
const renderEstimate = (view: "contractor" | "customer", extra = {}) => renderToStaticMarkup(
  <LocaleProvider locale="en-CA" currency="CAD"><EstimateBreakdown lines={lines} total={100} view={view} {...extra} /></LocaleProvider>,
);

describe("partial estimate totals", () => {
  for (const view of ["contractor", "customer"] as const) {
    it(`derives partial status in the ${view} view even when the optional flag is omitted or false`, () => {
      for (const props of [{}, { partial: false }]) {
        const html = renderEstimate(view, props);
        expect(html).toContain("Not priced");
        expect(html).toContain("partial");
        expect(html).toContain("$100.00");
      }
    });
  }
  it("does not treat unpriced options or exclusions as an incomplete base price", () => {
    const html = renderEstimate("customer", { lines: [lines[0], { ...lines[1], kind: "option" }, { label: "Excluded", amount: null, kind: "excluded" }] });
    expect(html).not.toContain("partial");
  });
  it("retains an explicitly partial total even when the shown lines are priced", () => {
    expect(renderEstimate("customer", { lines: [lines[0]], partial: true })).toContain("partial");
  });
});

describe("formatted text", () => {
  it("preserves safe formatting, links, line breaks and lists", () => {
    const html = renderToStaticMarkup(<FormattedText>{"**Bold** and *italic* with [site](https://example.test)\nnext line\n\n- First\n- Second"}</FormattedText>);
    expect(html).toContain(">Bold</strong>");
    expect(html).toContain(">italic</em>");
    expect(html).toContain('href="https://example.test"');
    expect(html).toContain("<br");
    expect(html).toContain("<ul");
    expect((html.match(/<li/g) ?? []).length).toBe(2);
  });
  it("keeps unsafe protocols and raw HTML as text", () => {
    const html = renderToStaticMarkup(<FormattedText>{'[bad](javascript:alert(1)) <img src=x onerror=alert(1)>'}</FormattedText>);
    expect(html).not.toContain("<a ");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img");
  });
  it("renders adversarial unmatched links within a generous bounded budget without losing text", () => {
    for (const input of ["[".repeat(60000), "[".repeat(60000) + "](https://" + "x".repeat(30000) + " )"]) {
      const start = performance.now();
      const html = renderToStaticMarkup(<FormattedText>{input}</FormattedText>);
      expect(performance.now() - start).toBeLessThan(3000);
      expect(html).toContain(input);
    }
  });
});
