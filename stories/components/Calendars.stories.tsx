import type { Meta, StoryObj } from "@storybook/react-vite";
import { parseDate } from "@internationalized/date";
import { Calendar, DatePicker, DateRangePicker, Grid, Heading, RangeCalendar, Stack, Text } from "../../src";

const meta: Meta = { title: "Components/Calendars", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;
const window = { start: parseDate("2026-11-09"), end: parseDate("2026-11-27") };

export const DateWindows: Story = {
  name: "Date and range pickers",
  render: () => <Stack gap={5} style={{ maxInlineSize: 560 }}>
    <Heading level="heading">Plan a work window</Heading>
    <Text tone="muted">Open the calendar to choose the first and last day. Dates can also be entered with the keyboard.</Text>
    <DateRangePicker label="Work window" defaultValue={window} description="First and last day on site." />
    <DateRangePicker label="Not yet scheduled" />
    <DatePicker label="Site visit" defaultValue={parseDate("2026-11-12")} />
  </Stack>,
};
export const Selection: Story = {
  name: "Single day and continuous range",
  render: () => <Grid layout={2} style={{ maxInlineSize: 680 }}>
    <Stack gap={3}><Heading level="subheading">Work window</Heading><RangeCalendar aria-label="Work window" defaultValue={window} /></Stack>
    <Stack gap={3}><Heading level="subheading">Site visit</Heading><Calendar aria-label="Site visit" defaultValue={parseDate("2026-11-12")} isDateUnavailable={(date) => date.day === 16} /></Stack>
  </Grid>,
};
export const States: Story = {
  name: "Range field states",
  render: () => <Stack gap={5} style={{ maxInlineSize: 560 }}>
    <DateRangePicker label="One-day work" defaultValue={{ start: window.start, end: window.start }} />
    <DateRangePicker label="Invalid window" defaultValue={window} errorMessage="Choose dates after the project starts." />
    <DateRangePicker label="Approved window" defaultValue={window} isReadOnly description="Part of the approved programme." />
    <DateRangePicker label="Unavailable window" defaultValue={window} isDisabled />
  </Stack>,
};
