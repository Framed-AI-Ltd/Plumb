import { cx } from "../../lib/styles/classes";
import {
BadgeCheck,
CircleHelp,
FileText,
Ruler,
Sparkles,
TriangleAlert
} from "../../lib/icons";
import {
Button as AriaButton,
Dialog as AriaDialog,
DialogTrigger,
Popover
} from "react-aria-components";
import { Badge } from "../../lib/feedback";
import { useMessages,type MessageKey } from "../../lib/locale";

/* ---------- Provenance (F-S07, F-H17) ---------- */
export const provenance = {
  supplied: { tone: "neutral", Icon: FileText },
  inferred: { tone: "neutral", Icon: Sparkles },
  measured: { tone: "neutral", Icon: Ruler },
  verified: { tone: "success", Icon: BadgeCheck },
  conflict: { tone: "warning", Icon: TriangleAlert },
  unknown: { tone: "warning", Icon: CircleHelp },
} as const;
export type ProvenanceKind = keyof typeof provenance;
export const provenanceText = (kind: ProvenanceKind) => [`provenance_${kind}`, `provenance_${kind}_help`] as [MessageKey, MessageKey];
/** How a fact is known. Pair with `SourceTag` for where it came from. */
export function Provenance({ kind }: { kind: ProvenanceKind }) {
  const { t } = useMessages();
  const p = provenance[kind];
  const [labelKey, helpKey] = provenanceText(kind);
  const name = t("whatThisMeans", { label: t(labelKey) });
  // Help must reach keyboard and touch users, so it lives in a popover on a real button (not `title`).
  return (
    <DialogTrigger>
      <AriaButton className={cx("plumb-provenance plumb-focusable")} aria-label={name}>
        <Badge tone={p.tone} variant={kind === "inferred" || kind === "measured" ? "outline" : "soft"} icon={<p.Icon aria-hidden className={cx("plumb-element-p.Icon")} />}>
          {t(labelKey)}
        </Badge>
      </AriaButton>
      <Popover className={cx("plumb-popover")} placement="bottom start" offset={6}>
        <AriaDialog className={cx("plumb-help")} aria-label={name}>
          <strong className={cx("plumb-element-strong")}>{t(labelKey)}</strong>
          <p className={cx("plumb-element-p")}>{t(helpKey)}</p>
        </AriaDialog>
      </Popover>
    </DialogTrigger>
  );
}
