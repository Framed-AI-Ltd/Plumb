import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { CalendarClock, Camera, FileText, FolderPlus, Lock, Plus, SearchX, Send, Wallet } from "lucide-react";
import {
  AccessManager, ApprovalRequest, Avatar, Badge, Button, Callout, Card, CardHeader, CheckboxGroup, CommentThread, Container, DescriptionList,
  EmptyState, ErrorSummary, FileDrop, FileItem, FilterChips, Grid, Heading, Inline, Journey, LifecycleTag, Link, Meter, Money, OpenItems,
  PageHeader, Pagination, ProposalDocument, ProposalStatusBadge, ProviderCard, PublicShell, RadioGroup, SearchField, Select, SourceViewer,
  SplitView, Stack, StatCard, SyncStatus, SideNav, NavList, PasswordField, EventCalendar, LineItemGrid, AssistantThread, Composer,
  SelectionCard, Board, InvoiceDocument, TakeoffCanvas, type BoardCard, type TakeoffMeasurement, PaymentSchedule, FloorPlan, VisibilityTag, SourceTag, Unknown, BidLeveling, type LineItemRow, Table, TaskList, Text, TextArea, TextField, Timeline, FactField, Slider,
  type FieldFocus, type FormError,
} from "../../src";
import { WorkspaceFrame } from "./frame";

const meta: Meta = {
  title: "Layouts/Page templates",
  parameters: { layout: "fullscreen", docs: { description: { component: "Complete pages built only from Plumb components. Start new screens from the closest template." } } },
};
export default meta;
type Story = StoryObj;

/* ---------- Data ---------- */
interface ProjectRow { id: string; name: string; client: string; stage: "intake" | "estimate" | "proposal" | "approved"; value: number | null; updated: string }
const projects: ProjectRow[] = [
  { id: "1", name: "Alder Street kitchen", client: "Alex Kim", stage: "proposal", value: 31580, updated: "2026-10-28" },
  { id: "2", name: "Birch Lane bath", client: "Priya Shah", stage: "estimate", value: null, updated: "2026-10-27" },
  { id: "3", name: "Cove Road deck", client: "Sam Ortiz", stage: "approved", value: 18400, updated: "2026-10-21" },
  { id: "4", name: "Dune Way basement", client: "Jo Tremblay", stage: "intake", value: null, updated: "2026-10-19" },
];
const stageLabel = { intake: "Intake", estimate: "Estimating", proposal: "Proposal sent", approved: "Approved" };
const pagePng = (n: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="850" height="1100"><rect width="100%" height="100%" fill="#fbfaf7"/><text x="60" y="90" font-family="sans-serif" font-size="28" fill="#555">Site notes · page ${n}</text>${Array.from({ length: 18 }, (_, i) => `<rect x="60" y="${140 + i * 48}" width="${500 + ((i * 97) % 230)}" height="12" rx="6" fill="#e4e0d8"/>`).join("")}</svg>`)}`;

/* 1 ---------- List page ---------- */
export const ListPage: Story = {
  name: "List page (projects)",
  render: function Render() {
    const [page, setPage] = useState(1);
    return (
      <WorkspaceFrame page="projects" crumbs={[{ label: "Projects" }]}>
        <PageHeader title="Projects" description="Every project your firm is pricing or running." actions={<Button variant="primary" icon={<Plus />}>New project</Button>} />
        <Inline justify="between" gap={4}>
          <FilterChips label="Stage" items={[{ id: "intake", label: "Intake", count: 1 }, { id: "estimate", label: "Estimating", count: 1 }, { id: "proposal", label: "Proposal sent", count: 1 }, { id: "approved", label: "Approved", count: 1 }]} />
          <SearchField aria-label="Search projects" placeholder="Search projects" size="sm" />
        </Inline>
        <Card padding="none">
          <Table<ProjectRow> aria-label="Projects" rows={projects} onRowAction={() => {}} columns={[
            { id: "name", label: "Project", isRowHeader: true, sortValue: (r) => r.name, render: (r) => <Stack gap={0}><Text as="span" variant="label">{r.name}</Text><Text as="span" variant="caption" tone="muted">{r.client}</Text></Stack> },
            { id: "stage", label: "Stage", render: (r) => <Badge tone={r.stage === "approved" ? "success" : r.stage === "proposal" ? "accent" : "neutral"}>{stageLabel[r.stage]}</Badge> },
            { id: "value", label: "Value (CAD)", align: "end", sortValue: (r) => r.value, render: (r) => <Money amount={r.value} unknownLabel="Not priced yet" /> },
            { id: "updated", label: "Updated", sortValue: (r) => r.updated, render: (r) => r.updated },
          ]} />
        </Card>
        <Pagination page={page} pageCount={3} onPageChange={setPage} aria-label="Project pages" />
      </WorkspaceFrame>
    );
  },
};

/* 2 ---------- Record with a side rail ---------- */
export const RecordWithRail: Story = {
  name: "Record with side rail (project overview)",
  render: () => (
    <WorkspaceFrame page="projects" crumbs={[{ label: "Projects", href: "#" }, { label: "Alder Street kitchen" }]}>
      <PageHeader eyebrow="Kitchen renovation" title="Alder Street kitchen" meta={<><LifecycleTag state="proposed" /><ProposalStatusBadge status="viewed" at="2026-10-25" /></>}
        actions={<Button variant="primary" icon={<Send />}>Send follow-up</Button>} />
      <Journey steps={[{ id: "intake", label: "Intake" }, { id: "estimate", label: "Scope & estimate" }, { id: "proposal", label: "Proposal" }, { id: "record", label: "Property record" }]} current="proposal" />
      <Grid layout="stats">
        <StatCard label="Price incl. tax" value={<Money amount={36317} size="lg" />} icon={<Wallet />} />
        <StatCard label="Open questions" value="2" hint="1 waiting on customer" />
        <StatCard label="Valid until" value="Nov 23" icon={<CalendarClock />} />
        <StatCard label="Documents" value="9" icon={<FileText />} />
      </Grid>
      <Grid layout="rail">
        <Stack gap={5}>
          <Card><Stack gap={4}><CardHeader><Heading level="subheading">Open items</Heading></CardHeader>
            <OpenItems items={[{ id: "1", title: "Window wall height", kind: "conflict", detail: "Plan says 2.44 m, site visit 2.38 m.", nextStep: "Confirm on site", owner: "Morgan" }, { id: "2", title: "Keep the window trim?", kind: "question", nextStep: "Ask Alex", owner: "Morgan" }]} onAction={() => {}} />
          </Stack></Card>
          <Card><Stack gap={4}><Heading level="subheading">Activity</Heading>
            <Timeline events={[{ id: "1", title: "Alex viewed P-002", time: "2026-10-25T18:20:00Z" }, { id: "2", title: "P-002 issued", actor: "Morgan Lee", time: "2026-10-24T15:00:00Z", tone: "accent" }]} />
          </Stack></Card>
        </Stack>
        <Stack gap={5}>
          <Card padding="sm"><DescriptionList items={[{ label: "Customer", value: "Alex Kim" }, { label: "Address", value: "14 Alder Street, Halifax" }, { label: "Revision", value: "P-002" }]} /></Card>
          <Card padding="sm"><Stack gap={3}><Heading level="subheading">Tasks</Heading>
            <TaskList aria-label="Tasks" tasks={[{ id: "1", title: "Confirm window wall", done: false, due: "2026-10-31", assignee: "Morgan Lee" }, { id: "2", title: "Upload layout v3", done: true }]} onToggle={() => {}} />
          </Stack></Card>
        </Stack>
      </Grid>
    </WorkspaceFrame>
  ),
};

/* 3 ---------- Settings ---------- */
export const Settings: Story = {
  name: "Settings (section nav + forms)",
  render: function Render() {
    const nameRef = useRef<FieldFocus>(null);
    const [errors, setErrors] = useState<FormError[]>([]);
    const [name, setName] = useState("");
    return (
      <WorkspaceFrame page="settings" crumbs={[{ label: "Settings" }]}>
        <PageHeader title="Firm settings" />
        <Grid layout="sidebar">
          <SideNav aria-label="Settings sections" current="profile" sections={[{ items: [
            { id: "profile", label: "Firm profile", href: "#" }, { id: "estimating", label: "Estimating defaults", href: "#" }, { id: "taxes", label: "Taxes", href: "#" },
            { id: "people", label: "People & access", href: "#" }, { id: "billing", label: "Billing & plan", href: "#" }, { id: "notifications", label: "Notifications", href: "#" },
          ] }]} />
          <Stack gap={5}>
            <ErrorSummary errors={errors} />
            <Card><form onSubmit={(e) => { e.preventDefault(); setErrors(name.trim() ? [] : [{ id: "name", message: "Enter the firm's legal name", inputRef: nameRef }]); }}>
              <Stack gap={5}>
                <Heading level="subheading" as="h2">Firm profile</Heading>
                <Grid layout={2}>
                  <TextField label="Legal name" value={name} onChange={setName} inputRef={nameRef} errorMessage={errors.length ? "Enter the firm's legal name" : undefined} />
                  <TextField label="Business number" optional />
                  <Select label="Default currency" defaultSelectedKey="CAD" options={[{ id: "CAD", label: "Canadian dollar (CAD)" }, { id: "USD", label: "US dollar (USD)" }]} />
                  <Select label="Language for customers" defaultSelectedKey="en" options={[{ id: "en", label: "English" }, { id: "fr", label: "Français" }]} />
                </Grid>
                <Slider label="Default contingency" defaultValue={0.05} minValue={0} maxValue={0.2} step={0.01} formatOptions={{ style: "percent" }} />
                <RadioGroup label="Show line amounts to customers" defaultValue="lines" options={[{ value: "lines", label: "Every line" }, { value: "sections", label: "Section totals only" }]} />
                <Inline gap={3}><Button type="submit" variant="primary">Save changes</Button><Button variant="ghost">Cancel</Button></Inline>
              </Stack>
            </form></Card>
            <Card><Stack gap={4}><Heading level="subheading" as="h2">Plan usage</Heading>
              <Meter label="Active projects" value={12} maxValue={15} valueLabel="12 of 15" />
              <Meter label="Document storage" value={9.6} maxValue={10} formatOptions={{ style: "unit", unit: "gigabyte" }} />
            </Stack></Card>
          </Stack>
        </Grid>
      </WorkspaceFrame>
    );
  },
};

/* 4 ---------- Split view ---------- */
export const SplitInbox: Story = {
  name: "List and detail (questions inbox)",
  render: function Render() {
    const [open, setOpen] = useState<string | null>("rfi-12");
    const rfis = [{ id: "rfi-12", title: "Cabinet depth at window wall", project: "Alder Street kitchen" }, { id: "rfi-11", title: "Tub drain location", project: "Birch Lane bath" }];
    return (
      <WorkspaceFrame page="inbox" crumbs={[{ label: "Questions & RFIs" }]}>
        <PageHeader title="Questions & RFIs" />
        <SplitView showDetail={!!open} onBack={() => setOpen(null)} listLabel="Questions" detailLabel="Selected question"
          list={<Card padding="sm"><NavList aria-label="Questions" selectedKey={open} onSelectionChange={setOpen}
            items={rfis.map((r) => ({ id: r.id, label: r.title, description: r.project }))} /></Card>}
          detail={<CommentThread title="RFI-012 · Cabinet depth at window wall" assignee="Sam Ortiz" due="2026-10-24"
            comments={[{ id: "1", author: "Morgan Lee", body: "Window wall is 2.38 m. Does the pantry still fit?", at: "2026-10-23T14:10:00Z" }]} onPost={() => {}} onResolve={() => {}} />} />
      </WorkspaceFrame>
    );
  },
};

/* 5 ---------- Empty and first-run ---------- */
export const FirstRun: Story = {
  name: "First run (empty workspace)",
  render: () => (
    <WorkspaceFrame page="projects" crumbs={[{ label: "Projects" }]}>
      <PageHeader title="Projects" />
      <EmptyState icon={<FolderPlus />} title="Start your first project" action={<Inline gap={3}><Button variant="primary" icon={<Plus />}>New project</Button><Button variant="ghost">Import from a spreadsheet</Button></Inline>}>
        Bring in plans, photos, and notes. Framed lists what's missing before you price anything.
      </EmptyState>
    </WorkspaceFrame>
  ),
};

/* 6 ---------- Document review ---------- */
export const DocumentReview: Story = {
  name: "Document review (source + facts)",
  render: function Render() {
    const [fact, setFact] = useState("height");
    return (
      <WorkspaceFrame page="projects" crumbs={[{ label: "Projects", href: "#" }, { label: "Alder Street kitchen", href: "#" }, { label: "Site notes" }]}>
        <PageHeader title="Site notes — 22 Oct" description="Check each extracted fact against the page before it's used for pricing." />
        <Grid layout="rail">
          <SourceViewer title="Site notes — 22 Oct.pdf" pages={[pagePng(1), pagePng(2)]} activeFactId={fact} onFactSelect={setFact}
            highlights={[{ factId: "height", page: 1, label: "Ceiling height", rect: [0.07, 0.12, 0.6, 0.03] }, { factId: "run", page: 1, label: "Cabinet run", rect: [0.07, 0.21, 0.5, 0.03] }]} />
          <Stack gap={4}>
            <FactField label="Ceiling height" value={2.38} unit="m" numeric provenance="measured" source={{ source: "Site notes", date: "2026-10-22" }} onChange={() => {}} onVerify={() => {}} />
            <FactField label="Cabinet run" value={6.1} unit="lin m" numeric provenance="inferred" source={{ source: "Site notes", date: "2026-10-22" }} onChange={() => {}} />
          </Stack>
        </Grid>
      </WorkspaceFrame>
    );
  },
};

/* 7 ---------- Step-by-step ---------- */
export const Wizard: Story = {
  name: "Step-by-step task (new project)",
  render: () => (
    <WorkspaceFrame page="projects" crumbs={[{ label: "Projects", href: "#" }, { label: "New project" }]}>
      <Container width="text">
        <Stack gap={6}>
          <PageHeader title="New project" description="Step 2 of 3 · You can change all of this later." />
          <Journey aria-label="New project steps" steps={[{ id: "client", label: "Customer" }, { id: "property", label: "Property" }, { id: "documents", label: "Documents" }]} current="property" />
          <Card><Stack gap={5}>
            <TextField label="Street address" autoComplete="street-address" />
            <Grid layout={2}><TextField label="City" autoComplete="address-level2" /><TextField label="Postal code" autoComplete="postal-code" /></Grid>
            <CheckboxGroup label="Rooms in scope" orientation="row" options={["Kitchen", "Bath", "Basement", "Exterior"].map((x) => ({ value: x, label: x }))} />
          </Stack></Card>
          <Inline justify="between"><Button variant="ghost">Back</Button><Button variant="primary">Continue</Button></Inline>
        </Stack>
      </Container>
    </WorkspaceFrame>
  ),
};

/* 8 ---------- Public: sign in ---------- */
export const SignIn: Story = {
  name: "Public · sign in",
  render: () => (
    <PublicShell width="narrow" brand="framed" footer="Framed · Privacy · Terms">
      <Card><form onSubmit={(e) => e.preventDefault()}><Stack gap={5}>
        <Heading level="title">Sign in</Heading>
        <TextField label="Email" type="email" autoComplete="email" />
        <PasswordField label="Password" />
        <Button variant="primary" type="submit">Sign in</Button>
        <Inline justify="between"><Link href="#">Forgot password?</Link><Link href="#" variant="quiet">Create an account</Link></Inline>
      </Stack></form></Card>
    </PublicShell>
  ),
};

/* 9 ---------- Public: customer proposal ---------- */
export const CustomerProposal: Story = {
  name: "Public · customer proposal and approval",
  render: () => (
    <PublicShell brand={<><Avatar name="Cedar Co" /> Cedar & Co. Renovations</>} actions={<Button size="sm" variant="ghost">Ask a question</Button>} footer="Shared with Alex Kim through Framed. Only what Cedar & Co. chose to share is shown.">
      <ProposalDocument headingLevel={1} firm="Cedar & Co." revision="P-002" recipient="Alex Kim" issuedOn="2026-10-24" validUntil="2026-11-23" title="Kitchen renovation" total={31580}
        taxes={[{ label: "HST 15%", rate: 0.15, amount: 4737 }]}
        lines={[{ id: "1", label: "Site protection & preparation", qty: 1, unit: "lot", amount: 1450 }, { id: "2", label: "Cabinets supply & install", qty: 6.1, unit: "lin m", amount: 25930 }, { id: "3", label: "Finish materials", qty: 1, unit: "lot", amount: 4200, kind: "allowance" }]}
        milestones={[{ id: "a", label: "Deposit", percent: 0.3 }, { id: "b", label: "Cabinets installed", percent: 0.5 }, { id: "c", label: "Completion", percent: 0.2 }]} />
      <ApprovalRequest revision="P-002" option="Base kitchen" amount={36317} taxBasis="incl" consentText="I approve revision P-002 and its payment schedule." expiresAt="2026-11-23" onApprove={() => {}} onRequestChanges={() => {}} />
    </PublicShell>
  ),
};

/* 10 ---------- Public: marketplace search ---------- */
export const MarketplaceSearch: Story = {
  name: "Public · find a professional",
  render: () => (
    <PublicShell width="wide" brand="framed" actions={<Button size="sm" variant="secondary">Sign in</Button>}>
      <PageHeader title="Kitchen contractors near Halifax" description="Ordered by fit with your request. Sponsored results are labelled." />
      <Grid layout="sidebar">
        <Stack gap={5}>
          <CheckboxGroup label="Trades" options={["Kitchens", "Baths", "Additions"].map((x) => ({ value: x, label: x }))} />
          <Select label="Start date" options={[{ id: "any", label: "Any time" }, { id: "q1", label: "January–March" }]} defaultSelectedKey="any" />
        </Stack>
        <Grid layout="cards">
          <ProviderCard headingLevel={2} name="Cedar & Co. Renovations" summary="General contractor · Halifax" trades={["Kitchens", "Baths"]} rating={{ value: 4.7, count: 23 }} verified={[{ label: "Liability insurance", checkedOn: "2026-10-01" }]} matchReason="Does kitchens within 20 km." actions={<Button size="sm" variant="secondary">Invite to quote</Button>} />
          <ProviderCard headingLevel={2} name="Harbour Kitchens" summary="Kitchen specialist · Bedford" trades={["Kitchens"]} rating={{ value: 4.4, count: 9 }} matchReason="Kitchen specialist with January availability." actions={<Button size="sm" variant="secondary">Invite to quote</Button>} />
          <ProviderCard headingLevel={2} name="Northshore Builders" summary="General contractor · Dartmouth" sponsored rating={{ value: null, count: 0 }} actions={<Button size="sm" variant="secondary">Invite to quote</Button>} />
        </Grid>
      </Grid>
    </PublicShell>
  ),
};

/* 11 ---------- Field capture on a phone ---------- */
export const FieldCapture: Story = {
  name: "Mobile · site visit capture",
  globals: { viewport: { value: "mobile1", isRotated: false } },
  render: () => (
    <WorkspaceFrame page="projects" crumbs={[{ label: "Alder Street kitchen", href: "#" }, { label: "Site visit" }]} sync={<SyncStatus state="offline" pending={1} />}>
      <PageHeader eyebrow="Alder Street kitchen" title="Site visit" />
      <Callout tone="info" title="You're offline">Photos and notes are saved on this phone and upload when you're back online.</Callout>
      <Grid layout={2}>
        <Stack gap={4}>
          <Heading level="subheading" as="h2">Photos and notes</Heading>
          <FileDrop onFiles={() => {}} accept={["image/*"]} hint="Photos of walls, labels, and problem areas." />
          <Stack gap={2}>
            <FileItem name="IMG_4120.jpg" status="queued" meta="Kitchen · waiting for a connection" icon={<Camera />} />
            <FileItem name="IMG_4121.jpg" status="ready" meta="Window wall" icon={<Camera />} />
          </Stack>
        </Stack>
        <Card padding="sm"><Stack gap={3}>
          <Heading level="subheading" as="h2">Measurements</Heading>
          <Text variant="caption" tone="muted">1 left to check in the kitchen</Text>
          <TaskList aria-label="Measurements to take" tasks={[{ id: "1", title: "Window wall height", done: false, where: "Kitchen" }, { id: "2", title: "Ceiling height at range hood", done: true, where: "Kitchen" }]} onToggle={() => {}} />
        </Stack></Card>
      </Grid>
    </WorkspaceFrame>
  ),
};

/* 12 ---------- People and access ---------- */
export const PeopleAndAccess: Story = {
  name: "Admin · people and access",
  render: () => (
    <WorkspaceFrame page="people" crumbs={[{ label: "People" }]}>
      <PageHeader title="People" description="Who can see your firm's projects, and in which role." />
      <Card><AccessManager defaultInviteRole="viewer"
        roles={[{ id: "owner", label: "Owner" }, { id: "estimator", label: "Estimator" }, { id: "viewer", label: "Viewer" }]}
        members={[{ id: "1", name: "Morgan Lee", email: "morgan@cedar.co", role: "owner" }, { id: "2", name: "Sam Ortiz", email: "sam@cedar.co", role: "estimator" }]}
        lockedIds={["1"]} onInvite={() => {}} onChangeRole={() => {}} onRevoke={() => {}} /></Card>
    </WorkspaceFrame>
  ),
};

/* 13 ---------- Dashboard ---------- */
export const Dashboard: Story = {
  name: "Dashboard (Today)",
  render: () => (
    <WorkspaceFrame page="dashboard" crumbs={[{ label: "Today" }]}>
      <PageHeader title="Good morning, Morgan" description="What needs you today across 12 projects." />
      <Grid layout="stats">
        <StatCard label="Waiting on you" value="5" hint="2 overdue" />
        <StatCard label="Proposals out" value="3" hint="1 expires Friday" />
        <StatCard label="Pipeline" value={<Money amount={128400} size="lg" />} hint="Before tax" />
        <StatCard label="Visits this week" value="4" icon={<CalendarClock />} />
      </Grid>
      <Grid layout="rail">
        <Card><Stack gap={4}><Heading level="subheading" as="h2">Needs your decision</Heading>
          <OpenItems items={[
            { id: "1", title: "Alder Street: window wall height conflicts", kind: "conflict", nextStep: "Confirm on site", owner: "Morgan" },
            { id: "2", title: "Birch Lane: supplier quote can't be read", kind: "missing", nextStep: "Ask for an unlocked file", owner: "Sam" },
            { id: "3", title: "Cove Road: deck permit", kind: "blocked", nextStep: "Waiting on the city", affects: "start date" },
          ]} onAction={() => {}} />
        </Stack></Card>
        <Card><Stack gap={4}><Heading level="subheading" as="h2">This week</Heading>
          <EventCalendar aria-label="This week" month="2026-11-01" view="agenda" events={[
            { id: "1", title: "Site visit · Dune Way", start: "2026-11-03T14:00:00Z", confirmed: true },
            { id: "2", title: "Inspection · Cove Road", start: "2026-11-05", confirmed: false },
          ]} onEventAction={() => {}} />
        </Stack></Card>
      </Grid>
    </WorkspaceFrame>
  ),
};

/* 14 ---------- Estimate editor with the assistant ---------- */
export const EstimateEditor: Story = {
  name: "Estimate editor with assistant panel",
  render: function Render() {
    const [rows, setRows] = useState<LineItemRow[]>([
      { id: "1", label: "Site protection", qty: 1, unit: "lot", rate: 1250, group: "Prep" },
      { id: "2", label: "Cabinet installation", qty: 24, unit: "hr", rate: 85, group: "Carpentry" },
      { id: "3", label: "Wall finish repairs", qty: null, unit: "m²", rate: 65, group: "Drywall" },
    ]);
    return (
      <WorkspaceFrame page="projects" crumbs={[{ label: "Projects", href: "#" }, { label: "Alder Street kitchen", href: "#" }, { label: "Estimate" }]}
        aside={<AssistantThread context={{ project: "Alder Street kitchen", sourceCount: 9 }} messages={[{ id: "1", from: "assistant", text: "Wall finish repairs has no quantity. The site notes give 14 m² for the window wall; want me to draft it?", sources: [{ source: "Site notes", date: "2026-10-22" }] }]} composer={<Composer />} />}>
        <PageHeader title="Estimate" meta={<LifecycleTag state="proposed">Working draft</LifecycleTag>} actions={<Button variant="primary">Review proposal</Button>} />
        <Card padding="sm"><LineItemGrid aria-label="Estimate lines" rows={rows} onRowsChange={setRows} units={["lot", "hr", "m²", "ea"]} groupBy /></Card>
      </WorkspaceFrame>
    );
  },
};

/* 15 ---------- Customer portal ---------- */
export const CustomerPortal: Story = {
  name: "Public · customer portal",
  render: () => (
    <PublicShell brand={<><Avatar name="Cedar Co" /> Cedar & Co. Renovations</>} actions={<Avatar name="Alex Kim" />} footer="You're seeing what Cedar & Co. shared with you.">
      <PageHeader eyebrow="14 Alder Street" title="Your kitchen renovation" meta={<ProposalStatusBadge status="accepted" />} />
      <Journey aria-label="Project progress" steps={[{ id: "a", label: "Proposal" }, { id: "b", label: "Selections" }, { id: "c", label: "Work" }, { id: "d", label: "Handover" }]} current="b" />
      <Grid layout="rail">
        <Stack gap={5}>
          <Callout tone="warning" title="2 decisions needed by Nov 15">Choose your faucet and backsplash tile so materials can be ordered.</Callout>
          <Stack gap={5}>
            <SelectionCard item="Kitchen faucet" status="proposed" allowance={450} neededBy="2026-11-15" choice={{ name: "Moen Align pull-down", spec: "Matte black", price: 529 }} actions={<Button size="sm" variant="primary">Approve</Button>} />
            <SelectionCard item="Backsplash tile" status="open" allowance={1200} neededBy="2026-11-15" choice={null} actions={<Button size="sm">See options</Button>} />
          </Stack>
        </Stack>
        <Stack gap={5}>
          <Card padding="sm"><Stack gap={3}><Heading level="subheading" as="h2">Payments</Heading>
            <PaymentSchedule readOnly total={36317} milestones={[{ id: "a", label: "Deposit", percent: 0.3 }, { id: "b", label: "Cabinets installed", percent: 0.5 }, { id: "c", label: "Completion", percent: 0.2 }]} />
          </Stack></Card>
          <Card padding="sm"><Stack gap={3}><Heading level="subheading" as="h2">Questions for you</Heading>
            <Text>Keep or replace the window trim?</Text>
            <TextArea label="Your answer" description="Your reply will be shared with Cedar & Co." />
            <Inline><Button variant="primary" size="sm">Send answer</Button></Inline>
          </Stack></Card>
        </Stack>
      </Grid>
    </PublicShell>
  ),
};

/* 16 ---------- Homeowner property home ---------- */
export const PropertyHome: Story = {
  name: "Homeowner · property home",
  render: function Render() {
    const [room, setRoom] = useState<string | null>("kitchen");
    return (
      <WorkspaceFrame page="dashboard" crumbs={[{ label: "14 Alder Street" }]}>
        <PageHeader title="14 Alder Street" description="Your home's rooms, equipment, and care." meta={<VisibilityTag kind="private" />} />
        <Card><FloorPlan aria-label="Main floor" selectedId={room} onSelect={setRoom} rooms={[
          { id: "kitchen", name: "Kitchen", polygon: [[0, 0], [4.2, 0], [4.2, 3.6], [0, 3.6]], area: 15.1, provenance: "measured", meta: "Renovated 2026" },
          { id: "living", name: "Living", polygon: [[4.2, 0], [9, 0], [9, 4.8], [4.2, 4.8]], area: 23, provenance: "supplied" },
          { id: "hall", name: "Hall", polygon: [[0, 3.6], [4.2, 3.6], [4.2, 4.8], [0, 4.8]], area: null, meta: "Not scanned" },
        ]} pins={[{ id: "p1", label: "Dishwasher · warranty to 2028", at: [3.6, 0.6], roomId: "kitchen" }]} onPinAction={() => {}} /></Card>
        <Grid layout={2}>
          <Card><Stack gap={3}><Heading level="subheading" as="h2">Care calendar</Heading>
            <EventCalendar aria-label="Care tasks" month="2026-11-01" view="agenda" onEventAction={() => {}} events={[
              { id: "1", title: "Replace furnace filter", start: "2026-11-01", confirmed: true, overdue: true },
              { id: "2", title: "Clean range hood filter", start: "2026-11-20", confirmed: true },
            ]} />
          </Stack></Card>
          <Card><Stack gap={3}><Heading level="subheading" as="h2">Equipment</Heading>
            <DescriptionList items={[{ label: "Dishwasher", value: "Bosch 500 · installed 2026-11-20", meta: <SourceTag source="Cedar & Co. handover" verified /> }, { label: "Furnace", value: <Unknown reason="Model label not photographed yet">Model unknown</Unknown> }]} />
          </Stack></Card>
        </Grid>
      </WorkspaceFrame>
    );
  },
};

/* 17 ---------- Marketplace request and bids ---------- */
export const RequestAndBids: Story = {
  name: "Homeowner · request and compare bids",
  render: () => (
    <PublicShell width="wide" brand="framed" actions={<Avatar name="Alex Kim" />}>
      <PageHeader title="Kitchen renovation request" description="Two contractors replied. Compare what each one covers before choosing." meta={<Badge>Closes Nov 30</Badge>} />
      <BidLeveling bids={[{ id: "a", name: "Cedar & Co.", total: 31580, expires: "2026-11-23" }, { id: "b", name: "Harbour Kitchens", total: 28900 }]}
        items={[
          { id: "1", label: "Cabinets supply & install", coverage: { a: "included", b: "included" } },
          { id: "2", label: "Electrical for lighting", coverage: { a: "included", b: "excluded" }, note: { b: "Separate electrician" } },
          { id: "3", label: "Finish materials", coverage: { a: "allowance", b: "unclear" }, note: { a: "$4,200 allowance" } },
          { id: "4", label: "Disposal", coverage: { a: "included", b: "missing" } },
        ]} onSelect={() => {}} />
      <Callout tone="info" title="The lowest price isn't always the same scope">Ask Harbour Kitchens about electrical and disposal before deciding.</Callout>
    </PublicShell>
  ),
};

/* 18 ---------- Notification preferences ---------- */
export const NotificationPreferences: Story = {
  name: "Settings · notification preferences",
  render: () => (
    <WorkspaceFrame page="settings" crumbs={[{ label: "Settings", href: "#" }, { label: "Notifications" }]}>
      <PageHeader title="Notifications" />
      <Container width="text">
        <Card><Stack gap={5}>
          <CheckboxGroup label="Send me" defaultValue={["approvals", "comments"]} options={[
            { value: "assignments", label: "Assignments", description: "When a task or question is given to you" },
            { value: "approvals", label: "Approvals and declines" },
            { value: "comments", label: "Replies and mentions" },
            { value: "deadlines", label: "Deadlines", description: "Expiring proposals, decisions due, overdue care tasks" },
          ]} />
          <RadioGroup label="How often" defaultValue="digest" options={[{ value: "now", label: "As they happen" }, { value: "digest", label: "Daily digest at 8 a.m." }]} />
          <CheckboxGroup label="Where" orientation="row" defaultValue={["email", "app"]} options={[{ value: "email", label: "Email" }, { value: "app", label: "In Framed" }, { value: "sms", label: "Text message" }]} />
          <Inline gap={3}><Button variant="primary">Save</Button></Inline>
        </Stack></Card>
      </Container>
    </WorkspaceFrame>
  ),
};

/* 19 ---------- Error pages ---------- */
export const ErrorPages: Story = {
  name: "Errors · not found, no access, failure",
  render: () => (
    <PublicShell width="medium" brand="framed">
      <Stack gap={6}>
        <EmptyState icon={<SearchX />} title="We can't find that page" action={<Button variant="primary">Go to Today</Button>}>The link may be old, or the page was moved. Nothing has changed in your projects.</EmptyState>
        <EmptyState icon={<Lock />} title="You don't have access to this project" action={<Button>Ask the owner for access</Button>}>Morgan Lee manages who can see Alder Street kitchen.</EmptyState>
        <Callout tone="danger" title="Framed couldn't load this page" actions={<Button size="sm">Try again</Button>}>Your work is saved. If this keeps happening, tell us the code PLB-503.</Callout>
      </Stack>
    </PublicShell>
  ),
};

/* 20 ---------- Pipeline board ---------- */
export const Pipeline: Story = {
  name: "Board · lead pipeline",
  render: function Render() {
    const [cards, setCards] = useState<BoardCard[]>([
      { id: "1", column: "new", title: "Dune Way basement", meta: "Jo Tremblay · $40–60k" },
      { id: "2", column: "new", title: "Spruce Ave porch", meta: "Referral" },
      { id: "3", column: "qualifying", title: "Elm Court bath", meta: "Site visit Nov 3" },
      { id: "4", column: "bidding", title: "Alder Street kitchen", meta: "P-002 viewed" },
    ]);
    return (
      <WorkspaceFrame page="projects" crumbs={[{ label: "Leads" }]}>
        <PageHeader title="Leads" description="Move a lead with the arrows button, or drag it." actions={<Button variant="primary" icon={<Plus />}>New lead</Button>} />
        <Board aria-label="Leads by stage" headingLevel={2} columns={[{ id: "new", label: "New" }, { id: "qualifying", label: "Qualifying" }, { id: "bidding", label: "Bidding" }, { id: "won", label: "Won" }, { id: "lost", label: "Not pursued" }]}
          cards={cards} onMove={(id, col) => setCards((cs) => cs.map((c) => (c.id === id ? { ...c, column: col } : c)))} onOpen={() => {}} />
      </WorkspaceFrame>
    );
  },
};

/* 21 ---------- Calendar page ---------- */
export const CalendarPage: Story = {
  name: "Calendar · work and inspections",
  render: function Render() {
    const [month, setMonth] = useState("2026-11-01");
    const [view, setView] = useState<"month" | "agenda">("month");
    return (
      <WorkspaceFrame page="dashboard" crumbs={[{ label: "Calendar" }]}>
        <PageHeader title="Calendar" description="Visits, inspections, and deliveries across your projects." />
        <EventCalendar aria-label="All projects" headingLevel={2} month={month} onMonthChange={setMonth} view={view} onViewChange={setView} onEventAction={() => {}} events={[
          { id: "1", title: "Site visit · Dune Way", start: "2026-11-03", confirmed: true },
          { id: "2", title: "Inspection · Cove Road", start: "2026-11-05" },
          { id: "3", title: "Cabinet delivery · Alder St", start: "2026-11-19", confirmed: true },
          { id: "4", title: "Final walk-through · Alder St", start: "2026-12-02", confirmed: true },
        ]} />
      </WorkspaceFrame>
    );
  },
};

/* 22 ---------- Invoice ---------- */
export const InvoicePage: Story = {
  name: "Public · invoice",
  render: () => (
    <PublicShell brand={<><Avatar name="Cedar Co" /> Cedar & Co. Renovations</>} footer="Questions about this invoice? Reply to the email it came with.">
      <InvoiceDocument headingLevel={1} firm="Cedar & Co. Renovations" number="INV-1042" recipient="Alex Kim" issuedOn="2026-11-25" dueOn="2026-12-09" status="sent"
        letterhead={{ address: "22 Quinpool Rd, Halifax NS", registration: "HST 81234 5678" }}
        lines={[{ id: "1", label: "Cabinets installed", basis: "Milestone 2 of 3 · 50%", amount: 15790 }]} taxes={[{ label: "HST 15%", amount: 2368.5 }]}
        footer={<Button variant="primary">Pay $18,158.50</Button>} />
    </PublicShell>
  ),
};

/* 23 ---------- Plan and takeoff workspace (canvas) ---------- */
export const PlanWorkspace: Story = {
  name: "Canvas · plan and takeoff",
  render: function Render() {
    const [pageWidth, setPageWidth] = useState<number | null>(null);
    const [measurements, setMeasurements] = useState<TakeoffMeasurement[]>([]);
    const page = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700"><rect width="100%" height="100%" fill="#fbfaf7"/><g fill="none" stroke="#555" stroke-width="6"><rect x="80" y="80" width="520" height="420"/><rect x="600" y="80" width="320" height="560"/></g><text x="300" y="60" font-family="sans-serif" font-size="22" fill="#777">6.10 m</text></svg>')}`;
    return (
      <WorkspaceFrame page="projects" crumbs={[{ label: "Alder Street kitchen", href: "#" }, { label: "Takeoff" }]}>
        <PageHeader title="Takeoff · Layout v2" description="Set the scale from a known dimension, then measure." meta={pageWidth === null ? <Badge tone="warning">Scale not set</Badge> : <Badge tone="success">Scale set</Badge>} />
        <Card padding="sm"><TakeoffCanvas src={page} alt="Layout v2, page 1" pageWidth={pageWidth} onScaleChange={setPageWidth} aspectRatio={0.7} measurements={measurements} onChange={setMeasurements} /></Card>
      </WorkspaceFrame>
    );
  },
};
