import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  ListChecks,
  Percent,
  Bath,
  Calculator,
  Camera,
  CircleCheck,
  ClipboardList,
  Eye,
  FileText,
  House,
  Loader,
  MessageCircleQuestion,
  NotebookPen,
  Plus,
  Ruler,
  Send,
  Sheet,
  Trees,
  Upload,
  Wrench,
} from "lucide-react";
import {
  ProposalDocument,
  Grid,
  AvatarGroup,
  Badge,
  Button,
  Callout,
  Card,
  CardHeader,
  Checkbox,
  Dialog,
  DraftSuggestion,
  Heading,
  IconTile,
  Inline,
  LifecycleTag,
  Money,
  NumberField,
  PageHeader,
  ProgressBar,
  SegmentedControl,
  SourceTag,
  Stack,
  StatCard,
  Table,
  Tabs,
  Tag,
  Text,
  TextArea,
  VisibilityTag,
  type LifecycleState,
  ApprovalSnapshot,
  DescriptionList,
  EstimateBreakdown,
  FileDrop,
  ItemKind,
  OpenItems,
  Provenance,
  SharePreview,
  SpaceTree,
  Timeline,
} from "../../src";
import { Bath as BathIcon, CookingPot, Layers, Pencil, Sofa } from "lucide-react";
import { documents, homeRecords, lineItems, rooms } from "./fixtures";
import { Workspace } from "./Workspace";
import { price } from "./pricing";

const meta: Meta = { title: "Workflow", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const docIcons = { Notes: <NotebookPen />, Plan: <Ruler />, Photos: <Camera />, Photo: <Camera />, Schedule: <Sheet /> };

export const Intake: Story = {
  name: "1 · Project intake",
  render: () => (
    <Workspace step="intake" crumb="Intake">
      <PageHeader
        title="Alder Street kitchen"
        description="1428 Alder Street · kitchen refresh for Alex Morgan"
        meta={<><Tag color="clay">Carpentry</Tag><Tag color="lake">Plumbing touch-ups</Tag><Tag color="honey">Lighting</Tag><AvatarGroup names={["Morgan Lee", "Sam Rivera", "Alex Morgan"]} /></>}
        actions={<Button variant="primary" icon={<Upload />}>Add documents</Button>}
      />
      <Grid layout="stats">
        <StatCard label="Documents" value="5" hint="4 processed" icon={<FileText />} />
        <StatCard label="Facts found" value="12" hint="each with its source" icon={<ListChecks />} />
        <StatCard label="To confirm" value="2" hint="ceiling height, wall area" icon={<MessageCircleQuestion />} />
        <StatCard label="Photos" value="14" hint="existing kitchen" icon={<Camera />} />
      </Grid>
      <Grid layout="rail">
        <Stack gap={5}>
        <Card padding="none">
          <div style={{ padding: "20px var(--card-inset) 12px" }}>
            <CardHeader>
              <Heading level="subheading">Project documents</Heading>
            </CardHeader>
          </div>
          <Table
            aria-label="Project documents"
            rows={[...documents]}
            columns={[
              { id: "name", label: "Document", isRowHeader: true, render: (d) => <Inline gap={3}><IconTile icon={docIcons[d.kind]} color="gray" size="sm" /><Text variant="label" as="span">{d.name}</Text></Inline> },
              { id: "kind", label: "Type", render: (d) => <Text as="span" tone="muted">{d.kind}</Text> },
              { id: "pages", label: "Pages", align: "end", render: (d) => <Text as="span" numeric>{d.pages}</Text> },
              {
                id: "status", label: "Status", render: (d) =>
                  d.status === "processed" ? <Badge tone="success" icon={<CircleCheck />}>Facts extracted</Badge>
                  : d.status === "review" ? <Badge tone="warning">Needs review</Badge>
                  : <Badge icon={<Loader />}>Reading…</Badge>,
              },
            ]}
          />
        </Card>
          <Card>
            <Stack gap={4}>
              <Heading level="subheading">Facts found</Heading>
              <DescriptionList columns={3} items={[
                { label: "Kitchen floor area", value: "14.2 m²", meta: <Inline gap={2}><Provenance kind="measured" /><SourceTag source="Layout v2" date="2026-10-20" verified /></Inline> },
                { label: "Cabinet run", value: "6.1 lin m", meta: <Inline gap={2}><Provenance kind="inferred" /><SourceTag source="Layout v2" date="2026-10-20" /></Inline> },
                { label: "Ceiling height", value: <Text as="span" tone="muted">Not measured</Text>, meta: <Inline gap={2}><Provenance kind="unknown" /><SourceTag source="Site notes p1" date="2026-10-22" /></Inline> },
              ]} />
            </Stack>
          </Card>
        </Stack>
        <Stack gap={5}>
          <Card>
            <Stack gap={4}>
              <FileDrop onFiles={() => {}} />
              <ProgressBar label="Reading documents" value={4} maxValue={5} valueLabel="4 of 5" />
            </Stack>
          </Card>
          <Card>
            <Stack gap={4}>
              <Heading level="subheading">Before scoping</Heading>
              <OpenItems items={[
                { id: "1", kind: "missing", title: "Ceiling height", nextStep: "Measure at site visit", owner: "Sam" },
                { id: "2", kind: "conflict", title: "Sink position", detail: "Layout v2 and site notes disagree.", nextStep: "Ask Alex", owner: "Morgan" },
              ]} />
            </Stack>
          </Card>
        </Stack>
      </Grid>
    </Workspace>
  ),
};

function EstimateScreen() {
  const [items, setItems] = useState(lineItems);
  const priced = items.filter((i) => i.qty !== null);
  const subtotal = priced.reduce((s, i) => s + (i.qty ?? 0) * i.rate, 0);
  const p = price(items);
  const unpriced = items.length - priced.length;
  return (
    <Workspace step="estimate" crumb="Scope & estimate">
      <PageHeader
        title="Scope & estimate"
        description="A clear basis for the work, with open questions kept in view."
        meta={<><LifecycleTag state="proposed">Working draft S-002</LifecycleTag><VisibilityTag kind="private" /><Text variant="caption" tone="muted">Updated 23 Oct 2026</Text></>}
        actions={<><Button icon={<Eye />}>Preview as customer</Button><Button variant="primary" icon={<Send />} isDisabled={unpriced > 0}>Prepare proposal</Button></>}
        actionHint={unpriced > 0 ? "Measure the wall area to prepare a proposal" : undefined}
      />
      <Grid layout="stats">
        <StatCard label="Cost subtotal" value={<Money amount={subtotal} />} hint={unpriced ? `${unpriced} item not priced yet · price in Working` : "All items priced · price in Working"} icon={<Calculator />} />
        <StatCard label="Line items" value={`${priced.length} / ${items.length}`} hint="priced" icon={<ClipboardList />} />
        <StatCard label="Open questions" value="2" hint="before this becomes a quote" icon={<MessageCircleQuestion />} />
        <StatCard label="Margin" value={`${(p.margin * 100).toFixed(1)}%`} hint="after overhead & markup · contractor only" icon={<Percent />} />
      </Grid>
      <Grid layout="rail">
        <Stack gap={5}>
          <Tabs
            aria-label="Estimate sections"
            tabs={[
              {
                id: "estimate", label: "Estimate", content: (
                  <Card padding="none">
                    <Table
                      aria-label="Working estimate"
                      rows={items}
                      columns={[
                        { id: "name", label: "Work item", isRowHeader: true, sortValue: (i) => i.name, render: (i) => <Stack gap={2}><Text variant="label" as="span">{i.name}</Text><Inline gap={3}><Tag color={i.trade.color}>{i.trade.label}</Tag>{i.id === "fin" && <ItemKind kind="allowance" inline />}<SourceTag {...i.source} /></Inline></Stack> },
                        {
                          id: "qty", label: "Quantity", align: "end", width: 160, render: (i) => (
                            <NumberField aria-label={`${i.name} quantity`} label="" variant="inline" unit={i.unit} description="" value={i.qty ?? NaN} placeholder="Measure"
                              onChange={(v) => setItems((all) => all.map((x) => (x.id === i.id ? { ...x, qty: Number.isNaN(v) ? null : v } : x)))} />
                          ),
                        },
                        { id: "rate", label: "Rate", align: "end", sortValue: (i) => i.rate, render: (i) => <Money amount={i.rate} /> },
                        { id: "amount", label: "Amount (CAD)", align: "end", sortValue: (i) => (i.qty === null ? null : i.qty * i.rate), render: (i) => <Money amount={i.qty === null ? null : i.qty * i.rate} /> },
                      ]}
                    />
                    <div style={{ padding: "20px var(--card-inset)", background: "var(--fill-layout)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                      <Stack gap={1}>
                        <Text variant="label">Cost subtotal{unpriced ? " · partial" : ""}</Text>
                        <Text variant="caption" tone="muted">{unpriced ? `${unpriced} item unpriced · excluded` : "All items priced"} · before overhead, markup, and tax</Text>
                      </Stack>
                      <span style={{ fontSize: "1rem" }}><Money amount={subtotal} emphasis="strong" /></span>
                    </div>
                  </Card>
                ),
              },
              { id: "scope", label: "Scope of work", content: <Card><Text>Protect retained finishes, install cabinetry per layout v2, and complete agreed finish work.</Text></Card> },
              { id: "decisions", label: "Decisions", badge: <Badge tone="warning">2</Badge>, content: <Card><Text>Finish selection and ceiling height are open.</Text></Card> },
            ]}
          />
          {unpriced > 0 && (
            <Callout tone="warning" title="Almost there — one quantity to measure">
              Wall finish area is unknown. Enter the measured area to complete the estimate; until then the total stays partial.
            </Callout>
          )}
        </Stack>
        {/* Rail starts level with the table card, below the tab row it annotates. */}
        <Stack gap={5} style={{ marginBlockStart: "var(--tab-row-offset)" }}>
          <DraftSuggestion
            title="Clarify wall repairs"
            source={{ source: "Site notes p1", date: "2026-10-22", verified: false }}
            original="Wall finishes may need repair."
            suggestion="Confirm the extent of wall repairs at the site visit. Keep the quantity unresolved until measured."
          />
          <Card>
            <Stack gap={4}>
              <Inline justify="between"><Heading level="subheading">Working</Heading><VisibilityTag kind="private" /></Inline>
              <EstimateBreakdown partial={unpriced > 0} total={p.total} lines={p.breakdown} />
            </Stack>
          </Card>
        </Stack>
      </Grid>
    </Workspace>
  );
}
export const Estimate: Story = { name: "2 · Scope & estimate", render: () => <EstimateScreen /> };

function ProposalScreen() {
  const p = price();
  const [view, setView] = useState<string>("contractor");
  const customer = view === "customer";
  return (
    <Workspace step="proposal" crumb="Proposal P-003">
      <PageHeader
        title="Review before you issue"
        description="See exactly what Alex will receive. Issuing is final for this revision."
        actionHint="2 items to resolve before issuing"
        meta={<><Badge tone="warning">Not ready to issue</Badge><Text variant="caption" tone="muted">Revision P-003 · from estimate S-002</Text></>}
        actions={
          <Dialog
            trigger={<Button variant="primary" icon={<Send />} isDisabled>Issue P-003…</Button>}
            title="Issue proposal P-003?"
            footer={(close) => <><Button variant="ghost" onPress={close}>Not yet</Button><Button variant="primary" onPress={close}>Issue to Alex Morgan</Button></>}
          >
            <SharePreview recipient={{ name: "Alex Morgan", role: "Homeowner" }} revision="P-003" items={[
              { id: "p", label: "Proposal P-003", detail: "Scope, options, totals", included: true },
              { id: "s", label: "Finish schedule", included: true },
              { id: "r", label: "Rates, overhead & markup", included: false, locked: true },
              { id: "n", label: "Internal notes", included: false, locked: true },
            ]} />
            <Checkbox defaultSelected>I reviewed scope, exclusions, and totals</Checkbox>
          </Dialog>
        }
      />
      <Inline justify="between">
        <SegmentedControl
          aria-label="Proposal view"
          selectedKey={view}
          onSelectionChange={(k) => setView(String(k))}
          options={[{ id: "contractor", label: "Contractor view" }, { id: "customer", label: "Customer preview", icon: <Eye /> }]}
        />
        {customer && <VisibilityTag kind="shared" />}
      </Inline>
      <Grid layout="rail">
        <ProposalDocument
          firm="Cedar & Co."
          revision="P-003"
          recipient="Alex Morgan"
          issuedOn="2026-10-24"
          validUntil="2026-11-23"
          title="Alder Street kitchen refresh"
          partial
          total={p.total}
          lines={[
            ...p.customer.map((i) => ({ id: i.id, label: i.name, qty: i.qty, unit: i.unit, amount: i.amount, trade: i.trade.label, kind: i.allowance ? ("allowance" as const) : undefined })),
            { id: "wall", label: "Wall finish repairs", qty: null, unit: "m²", amount: null, trade: "Drywall" },
          ]}
          milestones={[
            { id: "m1", label: "Deposit on acceptance", percent: 0.3 },
            { id: "m2", label: "Cabinets installed", percent: 0.4 },
            { id: "m3", label: "Completion", percent: 0.3 },
          ]}
          issueBlockers={["Wall finish area isn't measured yet.", "Alex's approval of P-002 is out of date (countertop changed)."]}
          exclusions="Structural work, electrical panel, and plumbing relocation. Wall repairs are priced after measurement."
        />
        <Stack gap={5}>
          {customer ? (
            <Card>
              <Stack gap={4}>
                <Heading level="subheading">What Alex can do</Heading>
                <TextArea label="Questions or requested changes" optional placeholder="Ask about scope, timing, or selections" />
                <Inline gap={3}><Button>Request changes</Button><Button variant="primary">Approve P-003</Button></Inline>
                <Text variant="caption" tone="muted">Approval applies to this revision only.</Text>
              </Stack>
            </Card>
          ) : (
            <Card variant="subtle">
              <Stack gap={4}>
                <Inline justify="between"><Heading level="subheading">Just for Cedar & Co.</Heading><VisibilityTag kind="private" /></Inline>
                <Inline justify="between"><Text as="span" tone="muted">Cost</Text><Money amount={p.cost} /></Inline>
                <Inline justify="between"><Text as="span" tone="muted">Overhead + markup</Text><Money amount={p.overhead + p.markup} /></Inline>
                <Inline justify="between"><Text as="span" tone="muted">Margin</Text><Text as="span" numeric>{(p.margin * 100).toFixed(1)}%</Text></Inline>
                <Inline justify="between"><Text as="span" tone="muted">Internal notes</Text><Text as="span">2</Text></Inline>
                <Text variant="caption" tone="muted">Excluded from the customer payload.</Text>
              </Stack>
            </Card>
          )}
          <ApprovalSnapshot approver="Alex" role="Homeowner" option="quartz counter" revision="P-002" amount={2860} date="2026-10-18" affectedBy="P-003 changes the countertop edge profile." />
          <Card>
            <Stack gap={4}>
              <Heading level="subheading">History</Heading>
              <Timeline aria-label="Proposal history" events={[
                { id: "3", title: "P-003 ready to issue", time: "2026-10-24", actor: "Morgan Lee", icon: <FileText />, tone: "accent" },
                { id: "2", title: "Alex asked to change the countertop", time: "2026-10-21", actor: "Alex Morgan", icon: <Pencil /> },
                { id: "1", title: "P-002 issued", time: "2026-10-18", actor: "Morgan Lee", icon: <Send /> },
              ]} />
            </Stack>
          </Card>
        </Stack>
      </Grid>
    </Workspace>
  );
}
export const Proposal: Story = { name: "3 · Proposal review", render: () => <ProposalScreen /> };

const roomIcons = { kitchen: <House />, bath: <Bath />, utility: <Wrench />, exterior: <Trees /> };
export const PropertyRecord: Story = {
  name: "4 · Property record",
  render: () => (
    <Workspace step="property" crumb="Property record">
      <PageHeader
        title="1428 Alder Street"
        description="What the home has now, what is proposed, what is approved, and what is confirmed done — kept separate."
        actions={<Button icon={<Plus />}>Add record</Button>}
      />
      <Grid layout="stats">
        {rooms.map((r) => (
          <Card key={r.id} padding="sm">
            <Stack gap={4}>
              <IconTile icon={roomIcons[r.id]} color="gray" size="md" />
              <Stack gap={1}>
                <Heading level="subheading" as="h2">{r.name}</Heading>
                <Text variant="caption" tone="muted">{r.records} records · {r.note}</Text>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Grid>
      <Grid layout="sidebar">
      <Card padding="sm">
        <SpaceTree aria-label="Spaces" defaultExpandedKeys={["all", "main", "upper"]} selectedKey="all" onSelect={() => {}} nodes={[{ id: "all", name: "All rooms", icon: <House />, meta: "22", children: [
          { id: "main", name: "Main floor", icon: <Layers />, children: [
            { id: "kitchen", name: "Kitchen", icon: <CookingPot />, meta: "9" },
            { id: "living", name: "Living room", icon: <Sofa />, meta: "3" },
          ] },
          { id: "upper", name: "Upper floor", icon: <Layers />, children: [{ id: "bath", name: "Main bathroom", icon: <BathIcon />, meta: "6" }] },
          { id: "systems", name: "Systems", icon: <Wrench />, meta: "4" },
        ] }]} />
      </Card>
      <Card padding="none">
        <div style={{ padding: "16px var(--card-inset) 4px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Text variant="caption" tone="muted">Key</Text>
          {(["current", "proposed", "approved", "completed"] as LifecycleState[]).map((s) => <LifecycleTag key={s} state={s} />)}
        </div>
        <Table
          aria-label="Property record"
          rows={[...homeRecords]}
          columns={[
            { id: "item", label: "Element", isRowHeader: true, render: (r) => <Text variant="label" as="span">{r.item}</Text> },
            { id: "room", label: "Room", render: (r) => <Text as="span" tone="muted">{r.room}</Text> },
            { id: "detail", label: "Detail", render: (r) => (r.detail ? <Text as="span">{r.detail}</Text> : <Inline gap={2}><Text as="span" tone="muted">Not measured</Text><Provenance kind="unknown" /></Inline>) },
            { id: "state", label: "State", render: (r) => <LifecycleTag state={r.state} /> },
            { id: "source", label: "Source", render: (r) => <Text as="span" variant="caption" tone="muted">{r.source}</Text> },
          ]}
        />
      </Card>
      </Grid>
      <Callout tone="info" title="Approved is not completed">The quartz countertop is approved in P-002. It moves to Completed once the job log confirms installation.</Callout>
    </Workspace>
  ),
};
