import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { parseDate, parseTime } from "@internationalized/date";
import { Bold, Eye, Italic, List, Pin } from "lucide-react";
import {
  Calendar, CheckboxGroup, ContextualHelp, DateRangePicker, Grid, Heading, Kbd, Meter, Pagination, Popover, Button,
  Rating, Slider, Spinner, Stack, Text, TimeField, ToggleButton, Toolbar, Dialog,
  FormattedTextField, MultiSelect, OneTimeCodeField, PasswordField, RecurrenceField, type Recurrence,
} from "../../src";

const meta: Meta = { title: "Components/More inputs", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Stack gap={4}><Heading level="subheading" as="h2">{title}</Heading>{children}</Stack>
);

export const ChoicesAndRanges: Story = {
  name: "Choices, ranges, and time",
  render: function Render() {
    const [rating, setRating] = useState<number | null>(null);
    return (
      <Grid layout={2} gap={8} style={{ maxInlineSize: 960 }}>
        <Section title="Checkbox group">
          <CheckboxGroup label="Notify me by" defaultValue={["email"]} description="Digest and mute settings are in Notifications."
            options={[{ value: "email", label: "Email" }, { value: "sms", label: "Text message" }, { value: "push", label: "App notification" }]} />
          <CheckboxGroup label="Trades" orientation="row" options={["Electrical", "Plumbing", "Drywall", "Tile"].map((x) => ({ value: x, label: x }))} />
        </Section>
        <Section title="Slider">
          <Slider label="Contingency" defaultValue={0.08} minValue={0} maxValue={0.25} step={0.01} formatOptions={{ style: "percent" }} description="Shown to the customer at face value." />
          <Slider label="Budget range" defaultValue={[30000, 55000]} minValue={10000} maxValue={100000} step={1000} formatOptions={{ style: "currency", currency: "CAD", maximumFractionDigits: 0 }} />
        </Section>
        <Section title="Time and date ranges">
          <TimeField label="Site visit starts" defaultValue={parseTime("09:30")} />
          <DateRangePicker label="Work window" defaultValue={{ start: parseDate("2026-11-09"), end: parseDate("2026-11-27") }} />
        </Section>
        <Section title="Inline calendar">
          <Calendar aria-label="Visit day" defaultValue={parseDate("2026-11-12")} />
        </Section>
        <Section title="Rating">
          <Rating label="Quality of work" value={rating} onChange={setRating} />
          <Rating label="Average rating" value={4.6} isReadOnly />
          <Rating label="Responsiveness" value={null} isReadOnly />
        </Section>
        <Section title="Meter (a known amount within a limit)">
          <Meter label="Storage used" value={7.2} maxValue={10} formatOptions={{ style: "unit", unit: "gigabyte" }} />
          <Meter label="Lighting allowance spent" value={1840} maxValue={1800} formatOptions={{ style: "currency", currency: "CAD" }} />
        </Section>
      </Grid>
    );
  },
};

export const ToolsAndHelp: Story = {
  name: "Toggles, toolbars, help, pagination",
  render: function Render() {
    const [page, setPage] = useState(4);
    return (
      <Grid layout={2} gap={8} style={{ maxInlineSize: 960 }}>
        <Section title="Toggle button and toolbar">
          <Toolbar aria-label="Text formatting">
            <ToggleButton aria-label="Bold" icon={<Bold />} size="sm" />
            <ToggleButton aria-label="Italic" icon={<Italic />} size="sm" />
            <ToggleButton aria-label="List" icon={<List />} size="sm" />
          </Toolbar>
          <Toolbar aria-label="View">
            <ToggleButton icon={<Eye />} defaultSelected>Show private lines</ToggleButton>
            <ToggleButton icon={<Pin />}>Pin</ToggleButton>
          </Toolbar>
        </Section>
        <Section title="Contextual help and popover">
          <Text>Provisional sum <ContextualHelp title="Provisional sum">An amount for work that can't be priced yet. The final cost replaces it; the customer sees it at face value.</ContextualHelp></Text>
          <Popover trigger={<Button size="sm">Filters</Button>} title="Filter documents">
            <CheckboxGroup label="Type" options={[{ value: "plan", label: "Plans" }, { value: "photo", label: "Photos" }, { value: "quote", label: "Quotes" }]} />
          </Popover>
        </Section>
        <Section title="Async confirm (stays open while working; shows failures inline)">
          <Dialog trigger={<Button variant="danger" size="sm">Archive project</Button>} title="Archive Alder Street kitchen?" confirmLabel="Archive" confirmVariant="danger"
            onConfirm={() => new Promise((_, reject) => setTimeout(() => reject(new Error("The server didn't respond. Nothing was archived.")), 900))}>
            <Text>Archived projects are read-only. You can restore them later.</Text>
          </Dialog>
        </Section>
        <Section title="Pagination, spinner, keys">
          <Pagination page={page} pageCount={12} onPageChange={setPage} aria-label="Rate library pages" />
          <Text>Loading <Spinner size="sm" /> · Open search with <Kbd>⌘K</Kbd></Text>
        </Section>
      </Grid>
    );
  },
};

export const AccountsAndText: Story = {
  name: "Sign-in, multi-select, recurrence, formatted text",
  render: function Render() {
    const [trades, setTrades] = useState<Key[]>(["kitchens", "baths"]);
    const [code, setCode] = useState("");
    const [repeat, setRepeat] = useState<Recurrence | null>({ every: 3, unit: "month" });
    const [notes, setNotes] = useState("Includes **removal** of existing cabinets.\n\n- Protect floors\n- Haul away debris");
    return (
      <Grid layout={2} gap={8} style={{ maxInlineSize: 960 }}>
        <Section title="Sign-in fields">
          <PasswordField label="Password" autoComplete="new-password" description="At least 12 characters." />
          <OneTimeCodeField label="Code from your email" value={code} onChange={setCode} />
        </Section>
        <Section title="Multi-select">
          <MultiSelect label="Trades you offer" value={trades} onChange={setTrades}
            options={[{ id: "kitchens", label: "Kitchens" }, { id: "baths", label: "Bathrooms" }, { id: "basements", label: "Basements" }, { id: "additions", label: "Additions" }, { id: "decks", label: "Decks" }]} />
        </Section>
        <Section title="Recurrence">
          <RecurrenceField label="Replace furnace filter" value={repeat} onChange={setRepeat} description="Reminders go to the household's owners." />
        </Section>
        <Section title="Formatted text">
          <FormattedTextField label="Scope notes" value={notes} onChange={setNotes} preview />
        </Section>
      </Grid>
    );
  },
};
