import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Heading, Inline, Stack, Text } from "../src";

const meta: Meta = { title: "Foundations", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const groups = [
  { title: "Brand", note: "Primary action, selection, links, focus. Switch presets from the toolbar.", ramps: [["brand", "Brand"]] },
  { title: "Functional", note: "Meaning only: never decoration.", ramps: [["success", "Success"], ["warning", "Warning · unknowns"], ["error", "Error · destructive"]] },
  { title: "Decorative", note: "Categories in small doses: tags, avatars, small icon tiles.", ramps: [["rose", "Rose"], ["clay", "Clay"], ["honey", "Honey"], ["sage", "Sage"], ["lake", "Lake"], ["spruce", "Spruce"]] },
] as const;
const jobs = ["bg", "hover bg", "border", "hover border", "", "base", "solid · text", "hover · strong text", "", ""];
const neutralLevels = ["bg-layout", "bg-container", "fill-quaternary", "fill-tertiary", "fill-secondary", "border-secondary", "border", "control-border", "text-tertiary", "text-secondary", "text"];

export const Colour: Story = {
  render: () => (
    <Stack gap={7}>
      <Stack gap={2}>
        <Heading level="title">Colour</Heading>
        <Text tone="muted">Ant Design's system: each colour is a 10-shade ramp generated from one base (shade 6), and each shade has one job. Neutrals do most of the work; colour informs.</Text>
      </Stack>
      <Stack gap={3}>
        <Heading level="subheading">Neutrals (cream)</Heading>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${neutralLevels.length}, minmax(44px, 1fr))`, gap: 6, overflowX: "auto" }}>
          {neutralLevels.map((n) => (
            <Stack key={n} gap={2}>
              <div style={{ blockSize: 44, borderRadius: 8, background: `var(--${n})`, boxShadow: "inset 0 0 0 1px var(--border-secondary)" }} />
              <Text variant="caption" tone="muted">{n}</Text>
            </Stack>
          ))}
        </div>
      </Stack>
      {groups.map((g) => (
        <Stack key={g.title} gap={3}>
          <Stack gap={1}>
            <Heading level="subheading">{g.title}</Heading>
            <Text variant="caption" tone="muted">{g.note}</Text>
          </Stack>
          <div style={{ display: "grid", gridTemplateColumns: "140px repeat(10, minmax(36px, 1fr))", gap: 6, alignItems: "center", overflowX: "auto" }}>
            <span />
            {jobs.map((j, i) => <Text key={i} variant="caption" tone="muted" style={{ textAlign: "center" }}>{i + 1}{j && <><br />{j}</>}</Text>)}
            {g.ramps.map(([name, label]) => (
              <div key={name} style={{ display: "contents" }}>
                <Text variant="label">{label}</Text>
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} title={`--${name}-${i + 1}`} style={{ blockSize: 36, borderRadius: 6, background: `var(--${name}-${i + 1})` }} />
                ))}
              </div>
            ))}
          </div>
        </Stack>
      ))}
      <Heading level="heading">Semantic tokens</Heading>
      <Inline gap={4} align="stretch">
        {[
          ["--bg-layout", "--text"], ["--bg-container", "--text-secondary"], ["--fill-layout", "--text-secondary"],
          ["--accent-solid", "--on-accent"], ["--accent-bg", "--accent-text"],
          ["--error-bg", "--error-text"], ["--warning-bg", "--warning-text"], ["--success-bg", "--success-text"],
          ["--clay-1", "--clay-8"], ["--lake-1", "--lake-8"],
        ].map(([bg, fg]) => (
          <div key={bg} style={{ background: `var(${bg})`, color: `var(${fg})`, padding: 16, borderRadius: 12, boxShadow: "var(--shadow-1)", minInlineSize: 150 }}>
            <Text variant="label" style={{ color: "inherit" }}>Aa 1,250.00</Text>
            <Text variant="caption" style={{ color: "inherit" }}>{fg} on {bg}</Text>
          </div>
        ))}
      </Inline>
    </Stack>
  ),
};

export const Typography: Story = {
  render: () => (
    <Card>
      <Stack gap={5}>
        <Heading level="display">Display · Plus Jakarta Sans 32</Heading>
        <Heading level="title">Title · Make the scope feel certain</Heading>
        <Heading level="heading">Heading · Alder Street kitchen</Heading>
        <Heading level="subheading">Subheading · Assumptions & exclusions</Heading>
        <Text>Body · Inter 14/21. Existing layout retained. No structural changes included.</Text>
        <Text variant="label">Label · Inter 13 medium</Text>
        <Text variant="caption" tone="muted">Caption · Inter 12 — source and date metadata</Text>
        <Text variant="overline" tone="muted">Overline · section eyebrow</Text>
        <Text numeric>Tabular · $1,250.00 · $12,480.50 · 24 hr · 18.5 m²</Text>
      </Stack>
    </Card>
  ),
};

export const SpaceRadiusElevation: Story = {
  name: "Space, radius & elevation",
  render: () => (
    <Stack gap={7}>
      <Inline gap={3} align="end">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((s) => (
          <Stack key={s} gap={2} align="center">
            <div style={{ inlineSize: `var(--space-${s})`, blockSize: `var(--space-${s})`, background: "var(--accent-solid)", borderRadius: 2 }} />
            <Text variant="caption" tone="muted">{s}</Text>
          </Stack>
        ))}
      </Inline>
      <Inline gap={5}>
        {["xs", "sm", "md", "lg", "xl", "pill"].map((r) => (
          <div key={r} style={{ inlineSize: 96, blockSize: 56, borderRadius: `var(--radius-${r})`, boxShadow: "var(--shadow-1)", background: "var(--bg-container)", display: "grid", placeItems: "center" }}>
            <Text variant="caption">{r}</Text>
          </div>
        ))}
      </Inline>
      <Inline gap={6}>
        {[["shadow-1", "cards, stats"], ["shadow-2", "popovers, dialogs, documents"], ["control-shadow", "secondary buttons"]].map(([e, use]) => (
          <div key={e} style={{ inlineSize: 180, blockSize: 88, borderRadius: 12, background: "var(--bg-container)", boxShadow: `var(--${e})`, display: "grid", placeItems: "center", textAlign: "center" }}>
            <Text variant="caption">{e}<br />{use}</Text>
          </div>
        ))}
      </Inline>
    </Stack>
  ),
};
