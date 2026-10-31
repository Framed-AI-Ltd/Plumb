import { cx } from "../../lib/styles/classes";
import { Badge } from "../../lib/feedback";
import { itemKinds } from "./helpers";
import type { LineItemKind } from "./types";
import { useItemKindLabel } from "./use-item-kind-label";

/** Keeps allowances, provisional sums, contingency, and exclusions visibly distinct from fixed amounts. */
export function ItemKind({ kind, inline }: { kind: LineItemKind; /** Plain text with icon, for meta lines. */ inline?: boolean }) {
  const label = useItemKindLabel()(kind);
  const Icon = itemKinds[kind];
  if (inline) return <span className={cx("plumb-element-span", "plumb-kind-inline")}><Icon aria-hidden />{label}</span>;
  return <Badge tone={kind === "option" ? "accent" : "neutral"} variant="outline" icon={<Icon aria-hidden />}>{label}</Badge>;
}
