// Server-rendered checks of what people actually see: unknowns, private boundaries, locales, and dates.
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import { DateTime, EstimateBreakdown, FileItem, LocaleProvider, Money, Quantity, Rating, useMessages } from "../src";

const html = (node: ReactNode, locale = "en-CA") => renderToStaticMarkup(<LocaleProvider locale={locale} currency="CAD">{node}</LocaleProvider>);
const text = (node: ReactNode, locale?: string) => html(node, locale).replace(/<[^>]+>/g, "");

describe("unknowns stay unknown", () => {
  it("renders a null amount as Not priced, never $0", () => {
    expect(text(<Money amount={null} />)).toBe("Not priced");
    expect(text(<Quantity value={null} unit="m²" />)).toBe("Unknown m²");
  });
  it("shows an unrated rating as not rated, not zero stars", () => {
    expect(html(<Rating label="Quality" value={null} isReadOnly />)).toContain('aria-label="Quality: not rated"');
  });
});

describe("private stays private", () => {
  const lines = [{ label: "Cabinets", amount: 9000 }, { label: "Secret markup", amount: 1000, private: true, formula: "10%" }];
  it("contractor view shows private lines", () => {
    expect(text(<EstimateBreakdown lines={lines} total={10000} />)).toContain("Secret markup");
  });
  it("customer view never contains private labels or working, even when the totals are wrong", () => {
    for (const total of [10000, 12345]) {
      const out = html(<EstimateBreakdown lines={lines} total={total} view="customer" />);
      expect(out).not.toContain("Secret markup");
      expect(out).not.toContain("10%");
    }
  });
});

describe("locales", () => {
  it("formats money for the locale", () => {
    const expected = new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", currencyDisplay: "narrowSymbol" }).format(1234.5);
    expect(text(<Money amount={1234.5} />, "fr-CA")).toBe(expected);
    expect(expected).toMatch(/^1\s234,50\s\$$/);
  });
  it("translates component text and plurals", () => {
    function Probe() { const { t, plural } = useMessages(); return <>{t("notPriced")}|{plural("filesAdded", 2)}</>; }
    expect(text(<Probe />, "fr-CA")).toBe("Non chiffré|2 fichiers ajoutés.");
    expect(text(<Probe />, "de-DE")).toBe("Not priced|2 files added.");
  });
  it("lets apps override a message", () => {
    function Probe() { return <>{useMessages().t("notPriced")}</>; }
    expect(renderToStaticMarkup(<LocaleProvider messages={{ notPriced: "TBD" }}><Probe /></LocaleProvider>)).toBe("TBD");
  });
});

describe("dates", () => {
  it("treats date-only strings as calendar days in every time zone", () => {
    expect(html(<DateTime value="2026-01-01" />).replace(/ class="[^"]*"/g, "")).toBe('<time dateTime="2026-01-01">Jan 1, 2026</time>');
  });
});


it("distinguishes a locally saved file from an active upload", () => {
  const out = html(<FileItem name="Kitchen photo.jpg" status="queued" progress={40} />);
  expect(out).toContain("Saved on this device");
  expect(out).not.toContain("Uploading");
  expect(out).not.toContain('role="progressbar"');
});
