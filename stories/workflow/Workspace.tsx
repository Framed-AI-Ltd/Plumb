import { useState, type ReactNode } from "react";
import { Bell, Calculator, FolderOpen, House, Lock, Send, Settings } from "lucide-react";
import { CommandMenu, AppShell, Avatar, Breadcrumbs, IconButton, Inline, Journey, SideNav, Text } from "../../src";

function WorkspaceSearch() {
  const [q, setQ] = useState("");
  return <CommandMenu query={q} onQueryChange={setQ} results={[]} onSelect={() => {}} />;
}

export type Step = "intake" | "estimate" | "proposal" | "property";
export const journey = [
  { id: "intake", label: "Intake" },
  { id: "estimate", label: "Scope & estimate" },
  { id: "proposal", label: "Proposal" },
  { id: "property", label: "Property record" },
];

export function Workspace({ step, crumb, children }: { step: Step; crumb: string; children: ReactNode }) {
  return (
    <AppShell
      nav={
        <SideNav
          aria-label="Project"
          current={step}
          sections={[
            {
              title: "Alder Street kitchen",
              items: [
                { id: "intake", label: "Intake", icon: <FolderOpen />, href: "#", count: 5 },
                { id: "estimate", label: "Scope & estimate", icon: <Calculator />, href: "#" },
                { id: "proposal", label: "Proposal & review", icon: <Send />, href: "#" },
                { id: "property", label: "Property record", icon: <House />, href: "#" },
              ],
            },
            { title: "Workspace", items: [{ id: "settings", label: "Settings", icon: <Settings />, href: "#" }] },
          ]}
        />
      }
      sidebarFoot={
        <Inline gap={2} style={{ paddingInline: 8 }}>
          <Lock size={14} aria-hidden color="var(--text-secondary)" />
          <Text variant="caption" tone="muted">Cedar & Co. workspace · private</Text>
        </Inline>
      }
      topbar={
        <>
          <Breadcrumbs items={[{ label: "Projects", href: "#" }, { label: "Alder Street kitchen", href: "#" }, { label: crumb }]} />
          <Inline gap={3}>
            <WorkspaceSearch />
            <IconButton label="Notifications" icon={<Bell />} />
            <Avatar name="Morgan Lee" />
          </Inline>
        </>
      }
    >
      <Journey steps={journey} current={step} />
      {children}
    </AppShell>
  );
}
