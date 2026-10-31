import type { Meta, StoryObj } from "@storybook/react-vite";
import { parseDate } from "@internationalized/date";
import { Archive, Bath, Calculator, Camera, Copy, FileText, Hammer, House, Inbox, Lightbulb, MoreHorizontal, Pencil, Plus, Send, Trash2, Wrench } from "lucide-react";
import {
  LifecycleTag,
  Grid,
  ComboBox,
  DatePicker,
  Provenance,
  toast,
  FilterChips,
  Accordion,
  Disclosure,
  Drawer,
  DescriptionList,
  Timeline,
  Avatar,
  AvatarGroup,
  IconTile,
  StatCard,
  Tag,
  type CategoryColor,
  Badge,
  Breadcrumbs,
  Button,
  Callout,
  Card,
  Checkbox,
  Dialog,
  EmptyState,
  Heading,
  IconButton,
  Inline,
  Link,
  Menu,
  NumberField,
  ProgressBar,
  RadioGroup,
  SearchField,
  SegmentedControl,
  Select,
  Skeleton,
  Stack,
  Switch,
  Tabs,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "../../src";

const meta: Meta = { title: "Components", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card>
    <Stack gap={5}>
      <Heading level="subheading">{title}</Heading>
      {children}
    </Stack>
  </Card>
);

export const Actions: Story = {
  render: () => (
    <Section title="Buttons & links">
      <Inline gap={3}>
        <Button variant="primary" icon={<Send />}>Issue proposal</Button>
        <Button>Save draft</Button>
        <Button variant="soft" icon={<Plus />}>Add item</Button>
        <Button variant="ghost">Cancel</Button>
        <Button variant="danger" icon={<Trash2 />}>Delete</Button>
        <Button isDisabled>Disabled</Button>
      </Inline>
      <Inline gap={3}>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="lg">Large · touch</Button>
        <Tooltip content="Duplicate line item"><IconButton label="Duplicate" icon={<Copy />} /></Tooltip>
        <IconButton label="Edit" icon={<Pencil />} variant="secondary" />
        <Link href="#">View source document</Link>
        <Link href="#" variant="quiet">Quiet link</Link>
      </Inline>
    </Section>
  ),
};

export const Fields: Story = {
  render: () => (
    <Section title="Fields">
      <Grid layout={3} gap={7}>
        <TextField label="Project name" defaultValue="Alder Street kitchen" />
        <TextField label="Site contact" optional placeholder="Name or phone" description="Shown to your crew only." />
        <TextField label="Permit number" prefix="BP-" isInvalid errorMessage="Enter the 6-digit number from the city notice." defaultValue="20" />
        <NumberField label="Wall finish area" unit="m²" placeholder="Not measured" labelAside={<Provenance kind="unknown" />} description="Leave empty until measured on site." />
        <NumberField label="Labour rate" hideStepper defaultValue={85} formatOptions={{ style: "currency", currency: "CAD", currencyDisplay: "narrowSymbol" }} labelAside={<Provenance kind="supplied" />} />
        <NumberField label="Cabinet install" unit="hr" defaultValue={24} labelAside={<Provenance kind="inferred" />} />
        <Select
          label="Trade"
          defaultSelectedKey="carpentry"
          options={[
            { id: "carpentry", label: "Finish carpentry" },
            { id: "drywall", label: "Drywall & paint" },
            { id: "electrical", label: "Electrical", description: "Licensed sub required" },
          ]}
        />
        <ComboBox
          label="Supplier"
          placeholder="Search suppliers"
          options={[
            { id: "kd", label: "Kitchen Depot", description: "Cabinets · 3 quotes" },
            { id: "sq", label: "Stone & Quartz Co.", description: "Countertops" },
            { id: "lb", label: "Lakeside Building Supply", description: "Drywall, lumber" },
          ]}
        />
        <DatePicker label="Site visit" defaultValue={parseDate("2026-10-22")} labelAside={<Provenance kind="verified" />} />
        <SearchField label="Find line item" placeholder="Search items" />
        <TextField label="Read-only" value="Imported from Layout v2" isReadOnly />
        <TextField label="Disabled" defaultValue="Locked after issue" isDisabled />
      </Grid>
      <TextArea label="Scope notes" defaultValue="Protect retained finishes. Install cabinetry per supplied layout." />
      <RadioGroup
        label="Pricing basis"
        variant="cards"
        defaultValue="fixed"
        options={[
          { value: "fixed", label: "Fixed price", description: "One total for agreed scope" },
          { value: "tm", label: "Time & materials", description: "Billed against actual hours and receipts" },
          { value: "cost-plus", label: "Cost plus", description: "Costs with an agreed fee" },
        ]}
      />
      <Inline gap={8} align="start">
        <Stack gap={3}>
          <Checkbox defaultSelected>Include assumptions in proposal</Checkbox>
          <Checkbox isIndeterminate>Some rooms selected</Checkbox>
          <Checkbox description="They'll get a read-only copy">Send copy to site lead</Checkbox>
        </Stack>
        <Stack gap={3}>
          <Switch defaultSelected>Show unpriced items</Switch>
          <Switch>Compact rows</Switch>
        </Stack>
        <Stack gap={2}>
          <Text variant="label">View</Text>
          <SegmentedControl aria-label="View" defaultSelectedKey="contractor" options={[{ id: "contractor", label: "Contractor" }, { id: "customer", label: "Customer preview" }]} />
        </Stack>
      </Inline>
    </Section>
  ),
};

export const Feedback: Story = {
  render: () => (
    <Section title="Feedback">
      <Inline gap={2}>
        <Badge>Neutral</Badge>
        <Badge tone="accent">Selected</Badge>
        <LifecycleTag state="approved" />
        <Badge tone="success">Verified</Badge>
        <Badge tone="warning">2 inputs to confirm</Badge>
        <Badge tone="danger">Over budget</Badge>
        <Badge tone="accent" variant="dashed">Draft</Badge>
      </Inline>
      <Callout tone="warning" title="Estimate incomplete">One quantity is unknown. This is a partial subtotal, not a complete quote.</Callout>
      <Callout tone="info" title="Customer sees a separate preview">Rates, margins, and site notes are never shared.</Callout>
      <Callout tone="success" title="Proposal P-003 issued">Sent 24 Oct 2026 to Alex Morgan.</Callout>
      <Callout tone="danger" title="Couldn't issue proposal" actions={<Button size="sm">Try again</Button>}>The proposal revision changed after review. Review P-004 before issuing.</Callout>
      <div style={{ maxInlineSize: 360 }}><ProgressBar label="Documents processed" value={3} maxValue={5} valueLabel="3 of 5" /></div>
      <Stack gap={2} style={{ maxInlineSize: 360 }}>
        <Skeleton width="60%" height={16} />
        <Skeleton />
        <Skeleton width="80%" />
      </Stack>
      <Inline gap={3}>
        <Button onPress={() => toast({ title: "Draft saved", description: "S-002 · 2:14 pm", tone: "success" })}>Show toast</Button>
        <FilterChips label="Document type" defaultSelectedKeys={["plans"]} items={[{ id: "plans", label: "Plans", count: 2 }, { id: "photos", label: "Photos", count: 15 }, { id: "notes", label: "Notes", count: 1 }, { id: "quotes", label: "Quotes", count: 3 }]} />
      </Inline>
      <EmptyState icon={<Inbox />} title="No documents yet" action={<Button variant="primary" icon={<Plus />}>Add documents</Button>}>
        Add plans, photos, or site notes. Framed will draft a scope you can review.
      </EmptyState>
    </Section>
  ),
};

export const OverlaysAndNavigation: Story = {
  name: "Overlays & navigation",
  render: () => (
    <Section title="Overlays & navigation">
      <Breadcrumbs items={[{ label: "Projects", href: "#" }, { label: "Alder Street kitchen", href: "#" }, { label: "Estimate" }]} />
      <Inline gap={3}>
        <Dialog
          trigger={<Button variant="primary" icon={<Send />}>Issue proposal…</Button>}
          title="Issue proposal P-003?"
          footer={(close) => (
            <>
              <Button variant="ghost" onPress={close}>Cancel</Button>
              <Button variant="primary" onPress={close}>Issue P-003</Button>
            </>
          )}
        >
          <Text>Alex Morgan will receive the customer preview of revision P-003. Internal rates and notes are not included.</Text>
          <Checkbox defaultSelected>I reviewed scope, exclusions, and totals</Checkbox>
        </Dialog>
        <Menu
          aria-label="Line item actions"
          trigger={<IconButton label="More actions" icon={<MoreHorizontal />} variant="secondary" />}
          items={[
            { id: "edit", label: "Edit", icon: <Pencil /> },
            { id: "dup", label: "Duplicate", icon: <Copy /> },
            { id: "src", label: "View source", icon: <FileText />, description: "Site notes · 22 Oct" },
            { id: "archive", label: "Archive", icon: <Archive />, separatorBefore: true },
            { id: "delete", label: "Delete", icon: <Trash2 />, danger: true },
          ]}
        />
      </Inline>
      <Tabs
        aria-label="Estimate sections"
        tabs={[
          { id: "estimate", label: "Estimate", content: <Text tone="muted">Line items and totals.</Text> },
          { id: "scope", label: "Scope of work", badge: <Badge tone="warning">2</Badge>, content: <Text tone="muted">Scope text.</Text> },
          { id: "decisions", label: "Decisions", content: <Text tone="muted">Customer selections.</Text> },
        ]}
      />
    </Section>
  ),
};

const pastels: CategoryColor[] = ["rose", "clay", "honey", "sage", "lake", "spruce"];
export const ColourAndIdentity: Story = {
  name: "Colour & identity",
  render: () => (
    <Section title="Tags, tiles, avatars, stats">
      <Inline gap={2}>
        <Tag color="clay">Carpentry</Tag>
        <Tag color="lake">Plumbing</Tag>
        <Tag color="honey">Prep</Tag>
        <Tag color="sage">Bathroom</Tag>
        <Tag color="spruce">Lighting</Tag>
        <Tag color="rose">Demolition</Tag>
      </Inline>
      <Inline gap={3}>
        {pastels.map((c, i) => <IconTile key={c} color={c} icon={[<House />, <Hammer />, <Lightbulb />, <Bath />, <Wrench />, <Camera />][i]} />)}
        <AvatarGroup names={["Morgan Lee", "Sam Rivera", "Alex Morgan", "Priya Shah"]} />
        <Avatar name="Jordan Kim" />
      </Inline>
      <Grid layout={3} gap={5}>
        <StatCard label="Partial subtotal" value="$7,490" hint="1 item not priced" icon={<Calculator />} />
        <StatCard label="Documents" value="5" hint="4 processed" icon={<FileText />} />
        <StatCard label="To confirm" value="2" hint="before quoting" icon={<Inbox />} />
      </Grid>
      <Grid layout={3} gap={5}>
        <Card variant="tinted"><Text variant="label">Tinted card · nested panel</Text></Card>
        <Card variant="paper"><Text variant="label">Paper card · documents</Text></Card>
        <Card variant="subtle"><Text variant="label">Subtle card · nested</Text></Card>
      </Grid>
    </Section>
  ),
};

export const Structure: Story = {
  render: () => (
    <Section title="Structure">
      <Accordion defaultExpandedKeys={["kitchen"]}>
        <Disclosure id="kitchen" title="Kitchen" aside={<Badge tone="warning">2 open</Badge>}><Text>Cabinets, countertop, backsplash, lighting.</Text></Disclosure>
        <Disclosure id="bath" title="Main bathroom"><Text>Not in this project.</Text></Disclosure>
      </Accordion>
      <DescriptionList columns={3} items={[
        { label: "Floor area", value: "14.2 m²", meta: <Provenance kind="measured" /> },
        { label: "Ceiling height", value: <Text as="span" tone="muted">Unknown</Text>, meta: <Provenance kind="unknown" /> },
        { label: "Cabinet run", value: "6.1 lin m", meta: <Provenance kind="inferred" /> },
      ]} />
      <Timeline events={[
        { id: "1", title: "Estimate S-002 updated", time: "2026-10-23T14:14:00-02:30", actor: "Morgan Lee", icon: <Pencil />, tone: "accent" },
        { id: "2", title: "Alex answered: keep existing layout", time: "2026-10-22T18:02:00-02:30", actor: "Alex Morgan", icon: <Send />, tone: "success", detail: "“Yes, keep the sink where it is.”" },
        { id: "3", title: "Site notes uploaded", time: "2026-10-22T09:40:00-02:30", actor: "Sam Rivera", icon: <FileText /> },
      ]} />
      <Drawer trigger={<Button>Open line item drawer</Button>} title="Cabinet installation" footer={(close) => <><Button variant="ghost" onPress={close}>Close</Button><Button variant="primary" onPress={close}>Save</Button></>}>
        <NumberField label="Hours" unit="hr" defaultValue={24} labelAside={<Provenance kind="inferred" />} />
        <NumberField label="Rate" hideStepper defaultValue={85} formatOptions={{ style: "currency", currency: "CAD", currencyDisplay: "narrowSymbol" }} />
      </Drawer>
    </Section>
  ),
};

export const Overview: Story = {
  render: (args, ctx) => (
    <Stack gap={6}>
      {Actions.render!(args, ctx)}
      {ColourAndIdentity.render!(args, ctx)}
      {Fields.render!(args, ctx)}
      {Feedback.render!(args, ctx)}
      {OverlaysAndNavigation.render!(args, ctx)}
      {Structure.render!(args, ctx)}
    </Stack>
  ),
};
