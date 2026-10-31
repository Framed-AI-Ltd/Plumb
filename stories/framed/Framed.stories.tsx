import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { Bath, CookingPot, DoorOpen, Home, Image, Layers, Ruler, Sofa, Wrench } from "lucide-react";
import {
  CommandMenu,
  MediaGrid,
  SourceViewer,
  ErrorSummary,
  ImportMapper,
  TextField,
  Select,
  type FormError,
  type FieldFocus,
  LineItemGrid,
  RevisionPicker,
  RevisionDiff,
  FactField,
  AccessManager,
  type LineItemRow,
  type Member,
  ApprovalRequest,
  ChecklistTemplate,
  type Milestone,
  AssistantThread,
  PaymentSchedule,
  Grid,
  ApprovalSnapshot,
  Badge,
  Composer,
  Button,
  Card,
  ChangePreview,
  ContactRow,
  EstimateBreakdown,
  FileDrop,
  FileItem,
  Heading,
  Inline,
  ItemKind,
  OpenItems,
  OptionCompare,
  Provenance,
  QuestionCard,
  ScopeSection,
  SharePreview,
  SourceTag,
  SpaceTree,
  Stack,
  Tag,
  Text,
  toast,
  Accordion,
  type ProvenanceKind,
  type LineItemKind,
  type RateEntry,
} from "../../src";
import { price } from "../workflow/pricing";

const meta: Meta = { title: "Framed", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const Frame = ({ title, feature, children }: { title: string; feature: string; children: React.ReactNode }) => (
  <Stack gap={4} style={{ maxInlineSize: 960 }}>
    <Stack gap={1}>
      <Heading level="heading">{title}</Heading>
      <Text variant="caption" tone="muted">{feature}</Text>
    </Stack>
    {children}
  </Stack>
);

export const ProvenanceAndKinds: Story = {
  name: "Provenance & item kinds",
  render: () => (
    <Frame title="How a fact is known, and what kind of money a line is" feature="F-S07 source-linked facts · F-H17 accuracy display · F-C26 allowances & exclusions">
      <Card>
        <Stack gap={5}>
          <Inline gap={2}>{(["supplied", "inferred", "measured", "verified", "conflict", "unknown"] as ProvenanceKind[]).map((k) => <Provenance key={k} kind={k} />)}</Inline>
          <Inline gap={2}>{(["fixed", "allowance", "provisional", "contingency", "option", "excluded"] as LineItemKind[]).map((k) => <ItemKind key={k} kind={k} />)}</Inline>
          <SourceTag source="Layout v2, p2" date="2026-10-20" verified />
        </Stack>
      </Card>
    </Frame>
  ),
};

export const Intake: Story = {
  name: "Intake: files & open items",
  render: function Render() {
    const [files, setFiles] = useState<string[]>([]);
    return (
      <Frame title="Document intake and what's still missing" feature="F-C06 document & photo intake · F-C10 missing & conflicting inputs · F-C11 customer questions">
        <Grid layout={2}>
          <Card>
            <Stack gap={4}>
              <FileDrop onFiles={(f) => setFiles((x) => [...x, ...f.map((y) => y.name)])} />
              <div>
                <FileItem name="Kitchen layout v2.pdf" meta="2 pages · 20 Oct" status="ready" icon={<Ruler />} tag={<Tag color="lake">Plan</Tag>} />
                <FileItem name="Existing photos (14)" meta="Kitchen · 22 Oct" status="reading" icon={<Image />} tag={<Tag color="clay">Photos</Tag>} />
                <FileItem name="Allowance schedule.xlsx" meta="1 sheet" status="review" />
                <FileItem name="Panel photo.heic" status="uploading" progress={62} icon={<Image />} />
                {files.map((f) => <FileItem key={f} name={f} status="uploading" progress={10} />)}
              </div>
            </Stack>
          </Card>
          <Stack gap={4}>
            <Card>
              <OpenItems
                onAction={(i) => toast({ title: i.kind === "question" ? "Question drafted" : "Marked for site visit", description: i.title })}
                items={[
                  { id: "1", kind: "missing", title: "Ceiling height", nextStep: "Measure at site visit", owner: "Sam", affects: "upper cabinets" },
                  { id: "2", kind: "conflict", title: "Sink position", detail: "Layout v2 shows the window wall; site notes say the island.", nextStep: "Confirm with Alex", owner: "Morgan" },
                  { id: "3", kind: "outdated", title: "Appliance list", detail: "Dated 2024; two models discontinued.", nextStep: "Request current selections" },
                  { id: "4", kind: "question", title: "Keep existing flooring?", nextStep: "Ask Alex", affects: "site protection" },
                ]}
              />
            </Card>
            <QuestionCard question="Should the sink stay on the window wall, as in layout v2, or move to the island?" to="Alex Morgan" recipientName="Alex" status="draft" inList onSend={() => toast({ title: "Question sent to Alex", tone: "success" })} affects={["Plumbing rough-in", "Cabinet layout"]} />
            <QuestionCard question="Keep the existing hardwood flooring?" to="Alex Morgan" status="answered" sentAt="2026-10-22" answer="Yes, keep it. Please protect it during the work." affects={["Site protection"]} />
          </Stack>
        </Grid>
      </Frame>
    );
  },
};

export const Scope: Story = {
  name: "Scope by room & trade",
  render: () => (
    <Frame title="Editable, source-linked scope" feature="F-C13 scope drafting · F-C16 reusable scopes">
      <Accordion defaultExpandedKeys={[]}>
        <ScopeSection title="Kitchen · cabinetry" total={6240} defaultExpanded openQuestions={1}
          inclusions={["Remove and dispose of existing cabinets", "Install 14 Shaker base and wall units per layout v2", "Adjust and align doors and drawers"]}
          exclusions={["Countertop fabrication (by supplier)", "Electrical changes"]}
          assumptions={["Walls are plumb within 6 mm", "Cabinets delivered assembled"]} />
        <ScopeSection title="Kitchen · wall finishes" total={null} openQuestions={2}
          inclusions={["Patch and skim damaged areas", "Prime and paint two coats"]}
          assumptions={["Area to be measured on site"]} />
        <ScopeSection title="Site protection" total={1250} inclusions={["Floor protection to retained hardwood", "Dust barriers at doorways"]} />
      </Accordion>
    </Frame>
  ),
};

export const Estimate: Story = {
  name: "Estimate breakdown",
  render: function Render() {
    const p = price();
    return (
      <Frame title="Totals with visible arithmetic" feature="F-C25 transparent calculations · F-C30 private cost vs client price">
        <Grid layout={2}>
          <Card><Stack gap={3}><Text variant="label">Contractor view</Text><EstimateBreakdown lines={p.breakdown} total={p.total} partial /></Stack></Card>
          <Card><Stack gap={3}><Text variant="label">Customer view</Text><EstimateBreakdown lines={p.breakdown} total={p.total} partial view="customer" /></Stack></Card>
        </Grid>
      </Frame>
    );
  },
};

export const Options: Story = {
  name: "Option comparison",
  render: function Render() {
    const [sel, setSel] = useState("base");
    return (
      <Frame title="Base and upgrade, same scope, explicit differences" feature="F-C28 comparable options · F-H25 compare existing and proposed · F-M17 bid comparison">
        <OptionCompare
          selected={sel}
          onSelect={setSel}
          options={[
            { id: "base", name: "Base", summary: "Painted Shaker, laminate counter", price: 18450 },
            { id: "upgrade", name: "Upgrade", summary: "White oak, quartz counter", price: 24980, badge: <Badge>Most chosen</Badge> },
          ]}
          rows={[
            { label: "Cabinet doors", values: { base: "Painted MDF Shaker", upgrade: "White oak Shaker" } },
            { label: "Countertop", values: { base: "Laminate, 32 mm", upgrade: "Quartz, 30 mm" } },
            { label: "Cabinet install", values: { base: "24 hr", upgrade: "24 hr" } },
            { label: "Hardware allowance", values: { base: "$400", upgrade: "$900" } },
            { label: "Lead time", values: { base: "3 weeks", upgrade: "6 weeks" } },
          ]}
        />
      </Frame>
    );
  },
};

export const Sharing: Story = {
  name: "Share preview & approval",
  render: function Render() {
    const [items, setItems] = useState([
      { id: "p", label: "Proposal P-003", detail: "Scope, options, totals", included: true },
      { id: "s", label: "Finish schedule", detail: "Selected finishes", included: true },
      { id: "ph", label: "Site photos (14)", included: false },
      { id: "r", label: "Rates, overhead & markup", included: false, locked: true },
      { id: "n", label: "Internal notes", included: false, locked: true },
    ]);
    return (
      <Frame title="Exactly what leaves the firm, and what was agreed" feature="F-S11 intentional external actions · F-S17 sharing previews · F-C30 · F-C34 approval snapshots">
        <Grid layout={2}>
          <Card><SharePreview recipient={{ name: "Alex Morgan", role: "Homeowner" }} revision="P-003" items={items} onToggle={(id) => setItems((x) => x.map((i) => (i.id === id ? { ...i, included: !i.included } : i)))} /></Card>
          <Stack gap={4}>
            <ApprovalSnapshot approver="Alex Morgan" role="Homeowner" option="Upgrade" revision="P-002" amount={24980} date="2026-10-18" conditions={["Start no earlier than 10 Nov", "Hardware chosen by 1 Nov"]} />
            <ApprovalSnapshot approver="Alex Morgan" role="Homeowner" option="Base" revision="P-001" amount={18450} date="2026-10-12" affectedBy="Countertop changed in P-002 after this approval." />
          </Stack>
        </Grid>
      </Frame>
    );
  },
};

export const Assistant: Story = {
  name: "Assistant & change preview",
  render: function Render() {
    const [applied, setApplied] = useState(false);
    const [responding, setResponding] = useState(false);
    const [messages, setMessages] = useState([
      { id: "1", from: "person" as const, name: "Morgan Lee", text: "Why is the wall finish line unpriced?" },
      { id: "2", from: "assistant" as const, sources: [{ source: "Site notes p1", date: "2026-10-22", verified: false }], actions: <Button size="sm" variant="soft">Add to site visit list</Button>, text: "The repair area hasn't been measured. Site notes say \"walls may need repair\" without an area, so I left the quantity unknown rather than estimate it." },
    ]);
    return (
      <Frame title="Answers with sources; edits as previews" feature="F-S09 permission-aware assistant · F-S10 reviewed AI drafts & corrections">
        <Grid layout={2}>
          <Card>
            <Stack gap={5}>
              <AssistantThread
                context={{ project: "Alder Street kitchen", sourceCount: 12, hiddenCount: 2 }}
                messages={messages}
                isResponding={responding}
                composer={<Composer isPending={responding} onStop={() => setResponding(false)} onSubmit={(t) => { setMessages((m) => [...m, { id: String(m.length + 1), from: "person", name: "Morgan Lee", text: t }]); setResponding(true); }} />}
              />
            </Stack>
          </Card>
          {applied ? (
            <Card><Text>Applied to working draft S-002. Nothing was sent.</Text></Card>
          ) : (
            <ChangePreview
              title="Split cabinet install by run"
              changes={[
                { label: "Cabinet install", before: "24 hr · 1 line", after: "2 lines · 14 + 10 hr" },
                { label: "Upper cabinets", before: "—", after: "Depends on ceiling height (unknown)" },
              ]}
              onApply={() => { setApplied(true); toast({ title: "Applied to draft", tone: "success" }); }}
              onDiscard={() => setApplied(true)}
            />
          )}
        </Grid>
      </Frame>
    );
  },
};

export const Decisions: Story = {
  name: "Approval request & checklist",
  render: function Render() {
    const [done, setDone] = useState<string | null>(null);
    return (
      <Frame title="The customer's decision, and the firm's reusable checklist" feature="F-C34 approval snapshots · F-C38 customer portal · F-S11 intentional actions · F-C16 reusable checklists">
        <Grid layout={2}>
          {done ? <Card><Text>{done}</Text></Card> : (
            <ApprovalRequest revision="P-003" option="Upgrade" amount={28727} taxBasis="incl" expiresAt="2027-11-23"
              consentText="I approve revision P-003 (Upgrade) as described. Work begins once Cedar & Co. confirms the start date."
              conditions={["Start no earlier than 10 Nov", "Hardware chosen by 1 Nov"]}
              onApprove={(d) => setDone(`Approved by ${d.signerName}.`)} onRequestChanges={(r) => setDone(`Change requested: ${r}`)} />
          )}
          <ChecklistTemplate name="Kitchen site protection" version="3" owner="Cedar & Co." updatedAt="2026-09-14"
            items={[{ id: "1", label: "Floor protection on retained finishes", detail: "Ram board, taped seams" }, { id: "2", label: "Dust barriers at doorways" }, { id: "3", label: "Shut-off valves located and tagged" }]}
            onApplyToProject={() => toast({ title: "Checklist added to Alder Street kitchen", tone: "success" })} onEdit={() => {}} />
        </Grid>
      </Frame>
    );
  },
};

const rateLibrary: RateEntry[] = [
  { id: "carp", label: "Finish carpenter", rate: 85, unit: "hr", region: "Halifax", date: "2026-09-02", source: "Firm rates 2026" },
  { id: "elec", label: "Electrician", rate: 110, unit: "hr", region: "Halifax", date: "2026-03-10", source: "Firm rates 2026" },
  { id: "dw", label: "Drywall patch and finish", rate: 65, unit: "m²", region: "Halifax", date: "2026-08-15" },
  { id: "tile", label: "Tile install, wall", rate: 92, unit: "m²", region: "Halifax", date: "2025-11-01" },
];

export const EstimateGrid: Story = {
  name: "Estimate grid",
  render: function Render() {
    const [rows, setRows] = useState<LineItemRow[]>([
      { id: "1", label: "Site protection & preparation", qty: 1, unit: "lot", rate: 1250, group: "Kitchen · prep" },
      { id: "2", label: "Cabinet installation", qty: 24, unit: "hr", rate: 85, rateId: "carp", group: "Kitchen · carpentry" },
      { id: "3", label: "Finish materials", qty: 1, unit: "lot", rate: 4200, kind: "allowance", group: "Kitchen · carpentry" },
      { id: "4", label: "Wall finish repairs", qty: null, unit: "m²", rate: 65, waste: 0.1, group: "Kitchen · drywall" },
      { id: "5", label: "Under-cabinet lighting", qty: 6, unit: "lin m", rate: 140, kind: "option", group: "Kitchen · carpentry" },
    ]);
    return (
      <Frame title="Edit the estimate like a spreadsheet" feature="F-C13 scope · F-C20 rates · F-C25 calculations · F-C26 allowances">
        <Card padding="none" style={{ padding: 16 }}>
          <LineItemGrid aria-label="Estimate lines" rows={rows} onRowsChange={setRows} units={["lot", "hr", "m²", "lin m", "ea"]} groupBy rates={rateLibrary}
            onAddRow={() => setRows((r) => [...r, { id: String(Date.now()), label: "New line", qty: null, unit: "ea", rate: null, group: "Kitchen · carpentry" }])} />
        </Card>
      </Frame>
    );
  },
};

export const RevisionsAndFacts: Story = {
  name: "Revisions & facts",
  render: function Render() {
    const [sel, setSel] = useState("p3");
    const [base, setBase] = useState("p2");
    const [height, setHeight] = useState<number | null>(2.44);
    return (
      <Frame title="What changed, and how each fact is known" feature="F-S06 revisions · F-C34 approval snapshots · F-M19 addenda · F-S07 facts · F-H10 corrections">
        <Stack gap={5}>
          <Card>
            <Stack gap={5}>
              <RevisionPicker selectedId={sel} onSelect={setSel} baselineId={base} onBaselineChange={setBase} revisions={[
                { id: "p3", label: "P-003", status: "draft", date: "2026-10-24", author: "Morgan Lee" },
                { id: "p2", label: "P-002", status: "approved", date: "2026-10-18", author: "Morgan Lee" },
                { id: "p1", label: "P-001", status: "superseded", date: "2026-10-12", author: "Morgan Lee" },
              ]} />
              <RevisionDiff before={{ label: "P-002" }} after={{ label: "P-003" }} affectsApprovals={["Alex's approval of P-002"]} lines={[
                { id: "c", label: "Countertop", before: { qty: 1, unit: "lot", amount: 2860 }, after: { qty: 1, unit: "lot", amount: 3120 } },
                { id: "w", label: "Wall finish repairs", after: { qty: null, unit: "m²", amount: null } },
                { id: "b", label: "Backsplash tile", before: { qty: 4, unit: "m²", amount: 640 } },
                { id: "s", label: "Site protection", before: { qty: 1, unit: "lot", amount: 1250 }, after: { qty: 1, unit: "lot", amount: 1250 } },
              ]} />
            </Stack>
          </Card>
          <Card>
            <Grid layout={2}>
              <FactField label="Ceiling height" value={height} unit="m" numeric provenance="measured" source={{ source: "Site visit", date: "2026-10-22", verified: false }}
                onChange={(v) => setHeight(v as number | null)} onVerify={() => {}}
                history={[{ value: 2.4, by: "Layout v2", at: "2026-10-20", provenance: "supplied", note: "From the drawing title block" }]} />
              <FactField label="Cabinet run" value={6.1} unit="lin m" numeric provenance="inferred" source={{ source: "Layout v2", date: "2026-10-20" }} onChange={() => {}} />
            </Grid>
          </Card>
        </Stack>
      </Frame>
    );
  },
};

export const Access: Story = {
  name: "Access",
  render: function Render() {
    const [members, setMembers] = useState<Member[]>([
      { id: "1", name: "Morgan Lee", email: "morgan@cedarco.ca", role: "owner" },
      { id: "2", name: "Sam Rivera", email: "sam@cedarco.ca", role: "editor" },
      { id: "3", name: "Alex Morgan", email: "alex@example.com", role: "customer", expiresAt: "2027-02-28" },
      { id: "4", name: "Priya Shah", email: "priya@example.com", role: "viewer", status: "invited" },
    ]);
    return (
      <Frame title="Who can see this project" feature="F-S01 accounts · F-S03 roles · F-C38 customer portal · F-H35 delegated access">
        <Card>
          <AccessManager members={members} lockedIds={["1"]} defaultInviteRole="viewer"
            roles={[{ id: "owner", label: "Owner" }, { id: "editor", label: "Team · can edit" }, { id: "viewer", label: "Team · view only" }, { id: "customer", label: "Customer portal" }]}
            onChangeRole={(id, role) => setMembers((m) => m.map((x) => (x.id === id ? { ...x, role } : x)))}
            onRevoke={(id) => { setMembers((m) => m.filter((x) => x.id !== id)); toast({ title: "Access removed", tone: "success" }); }}
            onInvite={({ email, role }) => setMembers((m) => [...m, { id: email, name: email, email, role, status: "invited" }])} />
        </Card>
      </Frame>
    );
  },
};

const svg = (bg: string, fg: string, label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="${bg}"/><rect x="40" y="170" width="320" height="90" fill="${fg}" opacity=".5"/><rect x="60" y="60" width="120" height="110" fill="${fg}" opacity=".35"/><text x="20" y="34" font-family="sans-serif" font-size="18" fill="#3a332b">${label}</text></svg>`)}`;
const page = (n: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 780"><rect width="600" height="780" fill="#fff"/><text x="40" y="60" font-family="sans-serif" font-size="22" fill="#222">Site notes — 22 Oct · page ${n}</text>${[0,1,2,3,4,5,6,7].map((i) => `<rect x="40" y="${100 + i * 40}" width="${380 + (i % 3) * 60}" height="10" fill="#d8d3cc"/>`).join("")}<text x="40" y="470" font-family="sans-serif" font-size="16" fill="#444">Ceiling ~ 2.4 m? (check)</text><text x="40" y="510" font-family="sans-serif" font-size="16" fill="#444">Walls: repair needed, area TBD</text></svg>`)}`;

export const Discovery: Story = {
  name: "Search, photos & sources",
  render: function Render() {
    const [q, setQ] = useState("");
    const [fact, setFact] = useState("ceiling");
    const all = [
      { id: "d1", kind: "document" as const, title: "Site notes — 22 Oct.pdf", snippet: "Walls: repair needed, area TBD", source: { source: "Upload", date: "2026-10-22" } },
      { id: "s1", kind: "scope" as const, title: "Wall finish repairs", snippet: "Patch and skim damaged areas", revision: "S-002", visibility: "private" as const },
      { id: "q1", kind: "decision" as const, title: "Keep existing hardwood flooring", snippet: "Alex: yes, protect it", source: { source: "Customer answer", date: "2026-10-22", verified: true } },
    ];
    return (
      <Frame title="Find anything, see the photo, open the exact source" feature="F-S13 search · F-C06 photos · F-S07 source-linked facts">
        <Stack gap={5}>
          <CommandMenu query={q} onQueryChange={setQ} results={all.filter((r) => r.title.toLowerCase().includes(q.toLowerCase()) || (r.snippet ?? "").toLowerCase().includes(q.toLowerCase()))} hiddenCount={2} onSelect={(r) => toast({ title: `Opened ${r.title}` })} />
          <Card>
            <MediaGrid aria-label="Kitchen photos" items={[
              { id: "p1", src: svg("#e8dfd3", "#a08a6c", "North wall"), alt: "North wall, existing cabinets", room: "Kitchen", takenAt: "2026-10-22", source: "Sam's phone" },
              { id: "p2", src: svg("#dfe5e8", "#7d8f9a", "Sink"), alt: "Sink and window", room: "Kitchen", takenAt: "2026-10-22", source: "Sam's phone" },
              { id: "p3", src: svg("#e4e8df", "#8a9a7d", "Panel"), alt: "Electrical panel", room: "Utility", takenAt: "2026-10-22", source: "Sam's phone" },
              { id: "p4", src: svg("#ece3e1", "#9a7d7d", "Damage"), alt: "Wall damage behind fridge", room: "Kitchen", takenAt: "2026-10-22", source: "Sam's phone" },
            ]} />
          </Card>
          <Card>
            <Grid layout={2}>
              <SourceViewer title="Site notes — 22 Oct.pdf" pages={[page(1), page(2)]} date="2026-10-22" activeFactId={fact} onFactSelect={setFact}
                highlights={[{ factId: "ceiling", page: 1, label: "Ceiling height", rect: [0.06, 0.575, 0.42, 0.04] }, { factId: "walls", page: 1, label: "Wall repairs", rect: [0.06, 0.627, 0.5, 0.04] }]} />
              <Stack gap={3}>
                <Text variant="label">Facts from this document</Text>
                <Button variant={fact === "ceiling" ? "soft" : "ghost"} onPress={() => setFact("ceiling")}>Ceiling height · about 2.4 m (unverified)</Button>
                <Button variant={fact === "walls" ? "soft" : "ghost"} onPress={() => setFact("walls")}>Wall repairs · area unknown</Button>
              </Stack>
            </Grid>
          </Card>
        </Stack>
      </Frame>
    );
  },
};

export const FormsAndImport: Story = {
  name: "Errors & import",
  render: function Render() {
    const nameRef = useRef<FieldFocus>(null);
    const tradeRef = useRef<FieldFocus>(null);
    const [errors, setErrors] = useState<FormError[]>([]);
    const [mapping, setMapping] = useState<Record<string, string>>({ a: "name", b: "", c: "rate" });
    return (
      <Frame title="Send people to the problem; bring in a rate library" feature="F-S15 accessible forms · F-C01 business profile · F-C20 rate library · F-S17 import">
        <Grid layout={2}>
          <Card>
            <form className="plumb-stack" style={{ gap: 16 }} onSubmit={(e) => { e.preventDefault(); setErrors([{ id: "name", message: "Enter your business name", inputRef: nameRef }, { id: "trade", message: "Choose at least one trade", inputRef: tradeRef }]); }}>
              <ErrorSummary errors={errors} />
              <TextField label="Business name" inputRef={nameRef} errorMessage={errors.some((x) => x.id === "name") ? "Enter your business name" : undefined} />
              <Select label="Main trade" inputRef={tradeRef} options={[{ id: "gc", label: "General contracting" }, { id: "kb", label: "Kitchens & baths" }]} errorMessage={errors.some((x) => x.id === "trade") ? "Choose at least one trade" : undefined} />
              <div><Button type="submit" variant="primary">Save profile</Button></div>
            </form>
          </Card>
          <Card>
            <ImportMapper rowCount={148} mapping={mapping} onMappingChange={setMapping}
              columns={[{ id: "a", header: "Item", sample: ["Drywall 1/2\"", "Joint compound", "Labour - finisher"] }, { id: "b", header: "Unit", sample: ["sheet", "pail", "hr"] }, { id: "c", header: "Cost", sample: ["14.20", "22.50", "65"] }]}
              targets={[{ id: "name", label: "Item name", required: true }, { id: "unit", label: "Unit", required: true }, { id: "rate", label: "Rate", required: true, unit: "CAD" }]}
              rowIssues={[{ row: 17, target: "rate", message: "Cost is blank" }, { row: 64, target: "unit", message: "\"bx\" isn't a known unit" }]} onImport={() => toast({ title: "146 rates imported", tone: "success" })} />
          </Card>
        </Grid>
      </Frame>
    );
  },
};

export const Payments: Story = {
  name: "Payment schedule",
  render: function Render() {
    const [ms, setMs] = useState<Milestone[]>([
      { id: "m1", label: "Deposit on acceptance", percent: 0.3 },
      { id: "m2", label: "Cabinets installed", percent: 0.4 },
      { id: "m3", label: "Completion", percent: 0.2 },
    ]);
    return (
      <Frame title="Deposit and progress payments that add up" feature="F-C29 branded proposal assembly · payment milestones">
        <Card><PaymentSchedule milestones={ms} total={9474.85} onChange={setMs} /></Card>
      </Frame>
    );
  },
};

export const SpacesAndContacts: Story = {
  name: "Spaces & contacts",
  render: () => (
    <Frame title="Property structure and the people on the job" feature="F-S05 property & space structure · F-H02 partial coverage · F-C03 contacts">
      <Grid layout={2} gap={7}>
        <Card padding="sm">
          <SpaceTree aria-label="1428 Alder Street" defaultExpandedKeys={["home", "main"]} selectedKey="kitchen" onSelect={() => {}}
            nodes={[{ id: "home", name: "1428 Alder Street", icon: <Home />, children: [
              { id: "main", name: "Main floor", icon: <Layers />, children: [
                { id: "kitchen", name: "Kitchen", icon: <CookingPot />, meta: "9 records" },
                { id: "living", name: "Living room", icon: <Sofa />, meta: "3 records" },
                { id: "hall", name: "Hallway", icon: <DoorOpen />, meta: <Provenance kind="unknown" /> },
              ] },
              { id: "upper", name: "Upper floor", icon: <Layers />, children: [{ id: "bath", name: "Main bathroom", icon: <Bath />, meta: "6 records" }] },
              { id: "systems", name: "Systems", icon: <Wrench />, meta: "4 assets" },
            ] }]}
          />
        </Card>
        <Card>
          <ContactRow name="Alex Morgan" role="Homeowner" email="alex@example.com" phone="+15555550100" access="portal" />
          <ContactRow name="Sam Rivera" role="Site lead" company="Cedar & Co." phone="+15555550101" access="private" />
          <ContactRow name="Priya Shah" role="Countertop supplier" company="Stone & Quartz Co." email="priya@example.com" />
        </Card>
      </Grid>
    </Frame>
  ),
};
