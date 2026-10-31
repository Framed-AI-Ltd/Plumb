import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Home as HomeIcon } from "lucide-react";
import {
  BidLeveling, BudgetVariance, Button, Card, Inline, CommentThread, Grid, Heading, NotificationsPopover, ProposalStatusBadge, ProviderCard,
  RatePicker, ReviewCard, Schedule, ScopeItemEditor, SelectionCard, SourceTag, Stack, SyncStatus, TaskList, TaskProgress, Text,
  Board, EventCalendar, Timesheet, MoneyRange, ProposalDocument, IconTile, type TimeEntry, FloorPlan, ImageCompare, InvoiceDocument, TakeoffCanvas, VoiceNote, type BoardCard, type TakeoffMeasurement,
  type Notification, type RateEntry, type ScopeItem, type Task, type ThreadComment,
} from "../../src";

const meta: Meta = { title: "Framed/Delivery and marketplace", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const Frame = ({ title, feature, children }: { title: string; feature: string; children: React.ReactNode }) => (
  <Stack gap={4} style={{ maxInlineSize: 1040 }}>
    <Stack gap={1}>
      <Heading level="heading">{title}</Heading>
      <Text variant="caption" tone="muted">{feature}</Text>
    </Stack>
    {children}
  </Stack>
);

const rates: RateEntry[] = [
  { id: "carp", label: "Finish carpenter", rate: 85, unit: "hr", region: "Halifax", date: "2026-09-02", source: "Firm rates 2026" },
  { id: "elec", label: "Electrician", rate: 110, unit: "hr", region: "Halifax", date: "2026-03-10", source: "Firm rates 2026" },
  { id: "dw", label: "Drywall patch and finish", rate: 65, unit: "m²", region: "Halifax", date: "2026-08-15" },
  { id: "tile", label: "Tile install, wall", rate: 92, unit: "m²", region: "Halifax", date: "2025-11-01" },
];

export const ScopeAndRates: Story = {
  name: "Scope editor and rate library",
  render: function Render() {
    const [items, setItems] = useState<ScopeItem[]>([
      { id: "a", kind: "inclusion", text: "Remove existing upper and lower cabinets; protect floors", source: { source: "Site visit", date: "2026-10-22", verified: true }, provenance: "measured" },
      { id: "b", kind: "inclusion", text: "Supply and install 6.1 lin m of shaker cabinets", source: { source: "Layout v2", date: "2026-10-20" }, provenance: "inferred" },
      { id: "c", kind: "exclusion", text: "Appliance supply and hook-up" },
      { id: "d", kind: "assumption", text: "Existing wiring to code; no panel upgrade", draft: true, source: { source: "Assistant draft" } },
      { id: "e", kind: "question", text: "Keep or replace the window trim?" },
    ]);
    const [rateId, setRateId] = useState<string | null>("dw");
    return (
      <Frame title="Edit the scope and price from the rate library" feature="F-C13 scope · F-C16 templates · F-C20 rate library · F-C27 stale rates">
        <Card>
          <ScopeItemEditor aria-label="Kitchen scope" items={items} onItemsChange={setItems}
            templates={[{ id: "demo", name: "Kitchen demolition package", items: [{ kind: "inclusion", text: "Disconnect and cap plumbing" }, { kind: "inclusion", text: "Haul away debris" }, { kind: "exclusion", text: "Hazardous material abatement" }] }]} />
        </Card>
        <Card>
          <Grid layout={2}>
            <RatePicker label="Rate for wall finish repairs (m²)" rates={rates} selectedId={rateId} onSelect={(r) => setRateId(r.id)} forUnit="m²" />
            <RatePicker label="Rate for tile backsplash (m²)" rates={rates} selectedId="tile" onSelect={() => {}} forUnit="m²" />
          </Grid>
        </Card>
      </Frame>
    );
  },
};

export const Collaboration: Story = {
  name: "Threads, tasks, assistant tasks, notifications",
  render: function Render() {
    const [comments, setComments] = useState<ThreadComment[]>([
      { id: "1", author: "Morgan Lee", body: "Window wall is 2.38 m, not 2.44 m. Does the tall pantry still fit?", at: "2026-10-23T14:10:00Z", visibility: "private" },
      { id: "2", author: "Framed assistant", fromAssistant: true, body: "Layout v2 shows the pantry at 610 mm. With 2.38 m it fits with 45 mm to spare (Site notes, p.1).", at: "2026-10-23T14:12:00Z" },
    ]);
    const [tasks, setTasks] = useState<Task[]>([
      { id: "t1", title: "Confirm cabinet depth at window wall", done: false, assignee: "Morgan Lee", due: "2026-10-20", where: "Kitchen" },
      { id: "t2", title: "Order shaker doors", done: false, blockedBy: "Customer hasn't chosen the finish", where: "Kitchen" },
      { id: "t3", title: "Patch ceiling crack", done: true, where: "Kitchen", evidence: 2 },
    ]);
    const notifications: Notification[] = [
      { id: "n1", kind: "approval", title: "Alex approved P-002", at: "2026-10-28T16:40:00Z", context: "Alder Street kitchen" },
      { id: "n2", kind: "comment", title: "Sam replied to RFI-012", at: "2026-10-28T11:05:00Z", context: "Alder Street kitchen" },
      { id: "n3", kind: "deadline", title: "Proposal P-003 expires Friday", at: "2026-10-27T09:00:00Z", read: true, context: "Birch Lane bath" },
    ];
    return (
      <Frame title="Work together without leaking private notes" feature="F-C39 threads · F-C41 tasks · F-C42 blockers · F-C59 punch list · F-S12 assistant tasks · F-S14 notifications">
        <Grid layout="rail">
          <CommentThread title="RFI-012 · Cabinet depth at window wall" status="open" assignee="Sam Ortiz" due="2026-10-24" comments={comments}
            links={<SourceTag source="Site notes — 22 Oct.pdf" date="2026-10-22" />}
            onPost={(text, visibility) => setComments((c) => [...c, { id: String(c.length + 1), author: "Morgan Lee", body: text, visibility, at: new Date().toISOString() }])}
            onResolve={() => {}} />
          <Stack gap={5}>
            <Card><Stack gap={3}><Heading level="subheading">Punch list</Heading>
              <TaskList aria-label="Punch list" tasks={tasks} collapseDone onToggle={(id, done) => setTasks((ts) => ts.map((x) => (x.id === id ? { ...x, done } : x)))} />
            </Stack></Card>
            <TaskProgress title="Reading 4 documents" onRetry={() => {}} steps={[
              { id: "1", label: "Site notes — 22 Oct.pdf", status: "done", detail: "12 facts found" },
              { id: "2", label: "Layout v2.pdf", status: "done", detail: "Cabinet run and openings" },
              { id: "3", label: "Supplier quote.xlsx", status: "failed", detail: "The file is password protected." },
              { id: "4", label: "Photos (9)", status: "running" },
            ]} />
            <Stack gap={2} align="start">
              <Text variant="caption" tone="muted">Notifications (top bar)</Text>
              <NotificationsPopover items={notifications} onOpen={() => {}} onMarkAllRead={() => {}} settings={<Button size="sm" variant="ghost">Notification settings</Button>} />
            </Stack>
          </Stack>
        </Grid>
      </Frame>
    );
  },
};

export const Delivery: Story = {
  name: "Schedule, selections, bids, budget",
  render: () => (
    <Frame title="Deliver the work" feature="F-C24 bid levelling · F-C33 proposal status · F-C35 selections · F-C43 schedule · F-C51 budget · F-S16 offline">
      <Card>
        <Stack gap={4}>
          <Inline gap={2}>
            <ProposalStatusBadge status="draft" /><ProposalStatusBadge status="issued" at="2026-10-24" /><ProposalStatusBadge status="viewed" at="2026-10-25" />
            <ProposalStatusBadge status="questioned" /><ProposalStatusBadge status="accepted" /><ProposalStatusBadge status="declined" /><ProposalStatusBadge status="expired" /><ProposalStatusBadge status="superseded" />
          </Inline>
          <Schedule aria-label="Kitchen schedule" today="2026-11-12" items={[
            { id: "demo", label: "Demolition", start: "2026-11-09", end: "2026-11-10", status: "done", group: "Carpentry" },
            { id: "elec", label: "Electrical rough-in", start: "2026-11-11", end: "2026-11-13", status: "confirmed", group: "Electrical", dependsOn: ["demo"] },
            { id: "dw", label: "Drywall repair", start: "2026-11-14", end: "2026-11-18", status: "at-risk", group: "Drywall", dependsOn: ["elec"] },
            { id: "cab", label: "Cabinet install", start: "2026-11-19", end: "2026-11-25", status: "planned", group: "Carpentry", dependsOn: ["dw"] },
          ]} />
        </Stack>
      </Card>
      <Grid layout={2}>
        <SelectionCard item="Kitchen faucet" room="Kitchen" status="proposed" allowance={450} neededBy="2026-11-15"
          choice={{ name: "Moen Align pull-down", spec: "Matte black · 7565BL", price: 529 }} actions={<Button size="sm" variant="secondary">Review</Button>} />
        <SelectionCard item="Backsplash tile" room="Kitchen" status="open" allowance={1200} neededBy="2026-10-20" choice={null} />
      </Grid>
      <BidLeveling bids={[{ id: "a", name: "Brightline Electric", total: 6400, expires: "2026-11-30" }, { id: "b", name: "Harbour Power", total: 5850 }]}
        items={[
          { id: "1", label: "Under-cabinet lighting circuit", coverage: { a: "included", b: "included" } },
          { id: "2", label: "Permit and inspection", coverage: { a: "included", b: "excluded" }, note: { b: "Customer to obtain" } },
          { id: "3", label: "Fixtures", coverage: { a: "allowance", b: "unclear" }, note: { a: "$600 allowance" } },
          { id: "4", label: "Drywall patch after rough-in", coverage: { a: "missing", b: "missing" } },
        ]} />
      <Card>
        <BudgetVariance lines={[
          { id: "1", label: "01 · Demolition", budget: 1250, committed: 1250, actual: 1180 },
          { id: "2", label: "06 · Carpentry", budget: 9840, committed: 10200, actual: 6100 },
          { id: "3", label: "09 · Finishes", budget: 4200, committed: null, actual: null },
          { id: "4", label: "26 · Electrical", budget: 5850, committed: 5850, actual: 6320 },
        ]} />
      </Card>
      <Stack gap={2}>
        <SyncStatus state="synced" lastSynced="2026-10-29T15:02:00Z" />
        <SyncStatus state="offline" pending={3} />
        <SyncStatus state="conflict" onResolve={() => {}} />
      </Stack>
    </Frame>
  ),
};

export const Marketplace: Story = {
  name: "Providers and reviews",
  render: () => (
    <Frame title="Find and judge professionals on evidence" feature="F-M04 portfolio · F-M06 explainable matching · F-M27 verified reviews · F-M28 sponsored separation">
      <Grid layout="cards">
        <ProviderCard name="Cedar & Co. Renovations" summary="General contractor · Halifax" trades={["Kitchens", "Baths"]} rating={{ value: 4.7, count: 23 }}
          verified={[{ label: "Business licence", checkedOn: "2026-09-01" }, { label: "Liability insurance", checkedOn: "2026-10-01" }]}
          matchReason="Does kitchens within 20 km and is taking projects starting in January." actions={<Button size="sm" variant="secondary">View profile</Button>} />
        <ProviderCard name="Northshore Builders" summary="General contractor · Dartmouth" sponsored trades={["Additions"]} rating={{ value: null, count: 0 }}
          matchReason="Paid placement for kitchen searches in your area." actions={<Button size="sm" variant="secondary">View profile</Button>} />
      </Grid>
      <ReviewCard author="Alex Kim" rating={5} at="2026-08-14" job="Kitchen renovation, 2026"
        body="Clear proposal, no surprises. When the wall turned out to be out of plumb they showed us photos and the options before doing anything."
        response={{ by: "Cedar & Co.", at: "2026-08-16", body: "Thank you, Alex. Enjoy the new kitchen." }} />
    </Frame>
  ),
};

const planPage = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700"><rect width="100%" height="100%" fill="#fbfaf7"/><g fill="none" stroke="#555" stroke-width="6"><rect x="80" y="80" width="520" height="420"/><rect x="600" y="80" width="320" height="560"/><line x1="80" y1="300" x2="600" y2="300"/></g><text x="90" y="680" font-family="sans-serif" font-size="22" fill="#777">Scale 1:50 · confirmed</text></svg>')}`;
const photo = (hue: number, label: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="hsl(${hue} 20% 80%)"/><text x="40" y="80" font-family="sans-serif" font-size="40" fill="#333">${label}</text></svg>`)}`;

export const SpaceAndMedia: Story = {
  name: "Floor plan, before/after, voice notes, takeoff",
  render: function Render() {
    const [room, setRoom] = useState<string | null>("kitchen");
    const [level, setLevel] = useState("main");
    const [pageWidth, setPageWidth] = useState<number | null>(12.5);
    const [measurements, setMeasurements] = useState<TakeoffMeasurement[]>([
      { id: "1", label: "Kitchen wall run", kind: "length", points: [[0.08, 0.43], [0.6, 0.43]] },
      { id: "2", label: "Living floor", kind: "area", points: [[0.6, 0.114], [0.92, 0.114], [0.92, 0.914], [0.6, 0.914]] },
    ]);
    return (
      <Frame title="Places, photos, sound, and measurements" feature="F-H12/F-H15 plans · F-H19 pins · F-H46 accessible list · F-C17/F-H48 before/after · F-C07 voice notes · F-C19 takeoff">
        <Card><FloorPlan aria-label="Main floor" levels={[{ id: "main", label: "Main floor" }, { id: "base", label: "Basement" }]} level={level} onLevelChange={setLevel} selectedId={room} onSelect={setRoom} pins={level === "base" ? [] : [{ id: "p", label: "Dishwasher", at: [3.6, 0.6], roomId: "kitchen" }]} rooms={level === "base" ? [] : [
          { id: "kitchen", name: "Kitchen", polygon: [[0, 0], [4.2, 0], [4.2, 3.6], [0, 3.6]], area: 15.1, provenance: "measured" },
          { id: "living", name: "Living", polygon: [[4.2, 0], [9, 0], [9, 4.8], [4.2, 4.8]], area: 23, provenance: "supplied" },
          { id: "hall", name: "Hall", polygon: [[0, 3.6], [4.2, 3.6], [4.2, 4.8], [0, 4.8]], area: null, meta: "Not scanned" },
        ]} /></Card>
        <Grid layout={2}>
          <ImageCompare before={{ src: photo(30, "Before · Oct 22"), alt: "Kitchen before demolition" }} after={{ src: photo(210, "After · Dec 4"), alt: "Kitchen with new cabinets" }} />
          <Card><VoiceNote consentText="Everyone in the room has agreed to this note being recorded and kept with the project." onRecord={() => {}}
            transcript="Window wall measures two point three eight metres. Outlet behind the fridge needs moving." /></Card>
        </Grid>
        <Card><TakeoffCanvas src={planPage} alt="Main floor plan, page 1" pageWidth={pageWidth} onScaleChange={setPageWidth} aspectRatio={0.7} measurements={measurements} onChange={setMeasurements} /></Card>
      </Frame>
    );
  },
};

export const CalendarBoardInvoice: Story = {
  name: "Calendar, board, invoice",
  render: function Render() {
    const [month, setMonth] = useState("2026-11-01");
    const [view, setView] = useState<"month" | "agenda">("month");
    const [cards, setCards] = useState<BoardCard[]>([
      { id: "1", column: "new", title: "Dune Way basement", meta: "Jo Tremblay · $40–60k" },
      { id: "2", column: "qualifying", title: "Elm Court bath", meta: "Site visit Nov 3" },
      { id: "3", column: "bidding", title: "Alder Street kitchen", meta: "P-002 sent" },
    ]);
    return (
      <Frame title="Time, pipeline, and billing" feature="F-H30/F-C43 calendar · F-C04 lead pipeline · F-C50 invoices">
        <EventCalendar aria-label="Care and work calendar" month={month} onMonthChange={setMonth} view={view} onViewChange={setView} onEventAction={() => {}} events={[
          { id: "1", title: "Furnace filter", start: "2026-11-01", confirmed: true, overdue: true },
          { id: "2", title: "Site visit · Dune Way", start: "2026-11-03T14:00:00Z", confirmed: true },
          { id: "3", title: "Inspection · Cove Road", start: "2026-11-05" },
          { id: "4", title: "Cabinet delivery", start: "2026-11-19", confirmed: true },
        ]} />
        <Board aria-label="Leads" columns={[{ id: "new", label: "New" }, { id: "qualifying", label: "Qualifying" }, { id: "bidding", label: "Bidding" }, { id: "won", label: "Won" }]}
          cards={cards} onMove={(id, col) => setCards((cs) => cs.map((c) => (c.id === id ? { ...c, column: col } : c)))} onOpen={() => {}} />
        <InvoiceDocument firm="Cedar & Co." number="INV-1042" recipient="Alex Kim" issuedOn="2026-11-25" dueOn="2026-12-09" status="partly-paid"
          lines={[{ id: "1", label: "Cabinets installed", basis: "Milestone 2 of 3 · 50%", amount: 15790 }, { id: "2", label: "Extra outlet", basis: "Change order CO-02", amount: 180 }]}
          taxes={[{ label: "HST 15%", amount: 2395.5 }]} payments={[{ id: "p", label: "Payment received", amount: 5000, on: "2026-11-28" }]} />
      </Frame>
    );
  },
};

export const TimeBudgetInspections: Story = {
  name: "Timesheet, budget range, inspections, letterhead",
  render: function Render() {
    const [entries, setEntries] = useState<TimeEntry[]>([
      { id: "1", person: "Sam Ortiz", date: "2026-11-09", hours: 8, costCode: "06 · Carpentry", rate: 42 },
      { id: "2", person: "Jo Tremblay", date: "2026-11-09", hours: 6.5, costCode: "06 · Carpentry", rate: 38, approved: true },
      { id: "3", person: "Sam Ortiz", date: "2026-11-10", hours: null, costCode: "09 · Finishes", rate: 42 },
    ]);
    return (
      <Frame title="Time, budgets, inspections, and branded documents" feature="F-C54 crew time · F-H26 indicative budget · F-C61 inspections · F-C29 branded proposal">
        <Card><Timesheet aria-label="Crew time, week of Nov 9" entries={entries} onChange={setEntries} costCodes={["01 · Demolition", "06 · Carpentry", "09 · Finishes"]} /></Card>
        <Grid layout={2}>
          <Card><MoneyRange low={28000} high={41000} drivers={[{ label: "Cabinets", share: 0.45 }, { label: "Counters", share: 0.25 }, { label: "Electrical", share: 0.15 }]} basis="Your measurements · prices from Oct 2026 · no site visit yet" /></Card>
          <Card><TaskList aria-label="Inspections" tasks={[
            { id: "a", title: "Electrical rough-in", done: false, inspection: "booked", due: "2026-11-14" },
            { id: "b", title: "Plumbing rough-in", done: false, inspection: "reinspect", blockedBy: "Vent pipe height" },
            { id: "c", title: "Framing", done: true, inspection: "passed" },
          ]} onToggle={() => {}} /></Card>
        </Grid>
        <ProposalDocument firm="Cedar & Co. Renovations" revision="P-002" recipient="Alex Kim" title="Kitchen renovation" total={1450}
          letterhead={{ logo: <IconTile icon={<HomeIcon />} />, address: "22 Quinpool Rd, Halifax NS", registration: "HST 81234 5678", contact: "hello@cedar.co" }}
          lines={[{ id: "1", label: "Site protection & preparation", qty: 1, unit: "lot", amount: 1450 }]} />
      </Frame>
    );
  },
};
