import { cx } from "../../lib/styles/classes";
// Truth primitives: unknowns, money, quantities, sources, lifecycle, visibility, and AI drafts.
import {
Sparkles
} from "../../lib/icons";
import { useState,type ReactNode } from "react";
import { Button } from "../../lib/actions";
import { Badge } from "../../lib/feedback";
import { TextArea } from "../../lib/fields";
import { useMessages } from "../../lib/locale";
import type {SourceTagProps } from "./source-tag";
import { SourceTag } from "./source-tag";

export type DraftStatus = "draft" | "accepted" | "dismissed";
export interface DraftSuggestionProps {
  title: ReactNode;
  source: SourceTagProps;
  original?: ReactNode;
  /** When this changes (e.g. after regenerating), the editable text resets to it. */
  suggestion: string;
  /** Controlled status; omit to let the component track it. */
  status?: DraftStatus;
  onStatusChange?: (status: DraftStatus) => void;
  onAccept?: (text: string) => void;
  onDismiss?: () => void;
  /** Ask the assistant for another version (F-S10). */
  onRegenerate?: () => void;
  /** Reverse an accept or dismiss. */
  onUndo?: () => void;
  isPending?: boolean;
}
/** AI output stays an editable draft until a person accepts it (principle 9). */
export function DraftSuggestion({ title, source, original, suggestion, status, onStatusChange, onAccept, onDismiss, onRegenerate, onUndo, isPending }: DraftSuggestionProps) {
  const { t } = useMessages();
  const [text, setText] = useState(suggestion);
  const [seen, setSeen] = useState(suggestion);
  if (seen !== suggestion) { setSeen(suggestion); setText(suggestion); }
  const [ownStatus, setOwnStatus] = useState<DraftStatus>("draft");
  const state = status ?? ownStatus;
  const setState = (s: DraftStatus) => { setOwnStatus(s); onStatusChange?.(s); };
  if (state !== "draft")
    return (
      <div className={cx("plumb-element-div", "plumb-draft plumb-draft-done")} role="status">
        <Badge tone={state === "accepted" ? "success" : "neutral"}>
          {state === "accepted" ? t("draftAccepted") : t("draftDismissed")}
        </Badge>
        {/* Focus moves here after Accept/Dismiss so keyboard users aren't dropped to the page. */}
        <Button size="sm" variant="ghost" autoFocus onPress={() => { setState("draft"); onUndo?.(); }}>{t("undo")}</Button>
      </div>
    );
  return (
    <section className={cx("plumb-element-section", "plumb-draft")} aria-label={t("aiSuggestion")} aria-busy={isPending || undefined}>
      <div className={cx("plumb-element-div", "plumb-draft-head")}>
        <p className={cx("plumb-element-p", "plumb-heading")} data-level="subheading">{title}</p>
        <Badge tone="accent" variant="dashed" icon={<Sparkles aria-hidden />}>{t("aiDraft")}</Badge>
      </div>
      <SourceTag {...source} />
      {original && (
        <div className={cx("plumb-element-div", "plumb-diff")}>
          <span className={cx("plumb-element-span", "plumb-text")} data-variant="caption" data-tone="muted">{t("original")}</span>
          <del className={cx("plumb-element-del")}>{original}</del>
        </div>
      )}
      <TextArea label={t("suggestedWording")} value={text} onChange={setText} isDisabled={isPending} description={t("suggestedWordingHelp")} />
      <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>
        <Button variant="primary" isDisabled={isPending || !text.trim()} onPress={() => { setState("accepted"); onAccept?.(text); }}>{t("acceptIntoDraft")}</Button>
        {onRegenerate && <Button variant="ghost" isPending={isPending} onPress={onRegenerate}>{t("tryAnother")}</Button>}
        <Button variant="ghost" isDisabled={isPending} onPress={() => { setState("dismissed"); onDismiss?.(); }}>{t("dismissSuggestion")}</Button>
      </div>
    </section>
  );
}
