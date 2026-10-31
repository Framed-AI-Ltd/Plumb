import { cx } from "../../lib/styles/classes";
// Page frames: the contractor workspace, public and customer pages, page headers, and project progress.
import { Check,ChevronsUpDown,House } from "../../lib/icons";
import { type ReactNode } from "react";
import { Button as AriaButton,type Key } from "react-aria-components";
import { useMessages } from "../../lib/locale";
import { Menu } from "../../lib/overlays";

export interface WorkspaceOption {
  id: string;
  name: string;
  /** e.g. "Firm", "Household", "3 homes". */
  detail?: string;
}
export interface WorkspaceSwitcherProps {
  workspaces: WorkspaceOption[];
  currentId: string;
  onSwitch: (id: string) => void;
  /** Extra menu entries, e.g. "Add a home". */
  actions?: { id: string; label: string; icon?: ReactNode }[];
  onAction?: (id: Key) => void;
}
/** Switch between firms, households, and homes without mixing their records (F-S02, F-H41). */
export function WorkspaceSwitcher({ workspaces, currentId, onSwitch, actions = [], onAction }: WorkspaceSwitcherProps) {
  const { t } = useMessages();
  const current = workspaces.find((w) => w.id === currentId);
  return (
    <Menu
      aria-label={t("switchWorkspace")}
      placement="bottom start"
      trigger={
        <AriaButton className={cx("plumb-workspace plumb-focusable")}>
          <span className={cx("plumb-element-span", "plumb-shell-mark")} aria-hidden><House /></span>
          <span className={cx("plumb-element-span", "plumb-workspace-text")}>
            <span className={cx("plumb-element-span", "plumb-workspace-name")}>{current?.name}</span>
            {current?.detail && <span className={cx("plumb-element-span", "plumb-item-description")}>{current.detail}</span>}
            <span className={cx("plumb-element-span", "plumb-sr-only")}>{t("switchWorkspaceHint")}</span>
          </span>
          <ChevronsUpDown aria-hidden />
        </AriaButton>
      }
      items={[
        ...workspaces.map((w) => ({ id: w.id, label: w.name, description: w.detail, icon: w.id === currentId ? <Check aria-hidden /> : <span className={cx("plumb-element-span", "plumb-menu-icon-gap")} /> })),
        ...actions.map((a, i) => ({ ...a, separatorBefore: i === 0 })),
      ]}
      onAction={(id) => (workspaces.some((w) => w.id === id) ? onSwitch(String(id)) : onAction?.(id))}
    />
  );
}
