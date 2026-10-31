import { useState } from "react";
import { createRoot } from "react-dom/client";
import { parseDate } from "@internationalized/date";
import { Calendar, DatePicker, DateRangePicker, LocaleProvider, RangeCalendar, Stack, ThemeProvider } from "../../src";
import "../../src/styles/index.css";
import "../../src/styles/fonts.css";

const parameters = new URLSearchParams(location.search);
function Fixture() {
  const [range, setRange] = useState({ start: parseDate("2026-11-09"), end: parseDate("2026-11-27") });
  return <LocaleProvider locale={parameters.get("locale") ?? "en-CA"}>
    <ThemeProvider theme={parameters.get("theme") === "dark" ? "dark" : "light"}>
      <main style={{ padding: 20, maxWidth: 560 }} dir={parameters.get("dir") === "rtl" ? "rtl" : "ltr"}>
        <Stack gap={6}>
          <DateRangePicker label="Work window" value={range} onChange={(value) => { if (value) setRange(value); }} description="Choose the first and last day of work." />
          <output data-testid="range">{range.start.toString()} / {range.end.toString()}</output>
          <DatePicker label="Site visit" defaultValue={parseDate("2026-11-12")} />
          <DateRangePicker label="Unplanned window" />
          <DateRangePicker label="Unavailable window" isDisabled defaultValue={range} />
          <RangeCalendar aria-label="Inline work window" defaultValue={range} />
          <Calendar aria-label="Inline visit" defaultValue={parseDate("2026-11-12")} />
        </Stack>
      </main>
    </ThemeProvider>
  </LocaleProvider>;
}
createRoot(document.getElementById("root")!).render(<Fixture />);
