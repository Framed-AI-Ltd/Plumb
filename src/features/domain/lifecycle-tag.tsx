import { cx } from "../../lib/styles/classes";
// Truth primitives: unknowns, money, quantities, sources, lifecycle, visibility, and AI drafts.
import {
BadgeCheck,
Check,
CircleDashed,
CircleDot
} from "../../lib/icons";
import { type ReactNode } from "react";
import { Badge } from "../../lib/feedback";
import { useMessages,type MessageKey } from "../../lib/locale";

export const lifecycle = {
  current: { label: "lifecycleCurrent", tone: "neutral", variant: "outline", Icon: CircleDot },
  proposed: { label: "lifecycleProposed", tone: "accent", variant: "dashed", Icon: CircleDashed },
  approved: { label: "lifecycleApproved", tone: "neutral", variant: "solid", Icon: Check },
  completed: { label: "lifecycleCompleted", tone: "success", variant: "soft", Icon: BadgeCheck },
} as const satisfies Record<string, { label: MessageKey; tone: string; variant: string; Icon: unknown }>;
export type LifecycleState = keyof typeof lifecycle;
/** Distinguishes the current record from proposed, approved, and completed work by shape, not only colour. */
export function LifecycleTag({ state, children }: { state: LifecycleState; children?: ReactNode }) {
  const { t } = useMessages();
  const { label, tone, variant, Icon } = lifecycle[state];
  return (
    <Badge tone={tone} variant={variant} icon={<Icon className={cx("plumb-lifecycle-icon")} aria-hidden />}>
      {children ?? t(label)}
    </Badge>
  );
}
