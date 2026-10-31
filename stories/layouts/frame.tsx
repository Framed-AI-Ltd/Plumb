// Shared frame for the layout gallery: the contractor workspace with its standard top bar.
import { useState, type ReactNode } from "react";
import { Calculator, FolderOpen, Sparkles, Home, Inbox, LayoutDashboard, Library, Settings, Users } from "lucide-react";
import { AppShell, Avatar, IconButton, Breadcrumbs, CommandMenu, Inline, NotificationsPopover, SideNav, SyncStatus, WorkspaceSwitcher } from "../../src";

export type LayoutPage = "dashboard" | "projects" | "inbox" | "rates" | "people" | "settings";

/** The workspace every contractor page sits in: switcher, navigation, search, notifications, account. */
export function WorkspaceFrame({ page, crumbs, children, aside, sync }: { page: LayoutPage; crumbs: { label: string; href?: string }[]; children: ReactNode; aside?: ReactNode; sync?: ReactNode }) {
  const [assistantOpen, setAssistantOpen] = useState(true);
  const [q, setQ] = useState("");
  const [ws, setWs] = useState("cedar");
  return (
    <AppShell
      sidebarHead={<WorkspaceSwitcher currentId={ws} onSwitch={setWs} workspaces={[{ id: "cedar", name: "Cedar & Co.", detail: "Firm · 6 people" }, { id: "home", name: "14 Alder Street", detail: "Household" }]} actions={[{ id: "new", label: "Add a workspace" }]} />}
      nav={
        <SideNav aria-label="Workspace" current={page} sections={[
          { items: [
            { id: "dashboard", label: "Today", icon: <LayoutDashboard />, href: "#" },
            { id: "projects", label: "Projects", icon: <FolderOpen />, href: "#", count: 12 },
            { id: "inbox", label: "Questions & RFIs", icon: <Inbox />, href: "#", count: 3 },
          ] },
          { title: "Library", items: [
            { id: "rates", label: "Rates & assemblies", icon: <Calculator />, href: "#" },
            { id: "templates", label: "Templates", icon: <Library />, href: "#" },
            { id: "properties", label: "Properties", icon: <Home />, href: "#" },
          ] },
          { title: "Firm", items: [
            { id: "people", label: "People", icon: <Users />, href: "#" },
            { id: "settings", label: "Settings", icon: <Settings />, href: "#" },
          ] },
        ]} />
      }
      sidebarFoot={sync ?? <SyncStatus state="synced" />}
      aside={aside}
      asideLabel="Assistant"
      isAsideOpen={assistantOpen}
      onAsideOpenChange={setAssistantOpen}
      topbar={
        <>
          <Breadcrumbs items={crumbs} />
          <Inline gap={3}>
            <CommandMenu triggerLabel="Search everything" query={q} onQueryChange={setQ} results={[]} onSelect={() => {}} />
            {aside && <IconButton label="Assistant" icon={<Sparkles />} onPress={() => setAssistantOpen(!assistantOpen)} aria-pressed={assistantOpen} />}
            <NotificationsPopover items={[{ id: "1", kind: "approval", title: "Alex approved P-002", at: "2026-10-28T16:40:00Z", context: "Alder Street kitchen" }]} />
            <Avatar name="Morgan Lee" />
          </Inline>
        </>
      }
    >
      {children}
    </AppShell>
  );
}
