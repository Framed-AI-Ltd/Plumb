import { cx } from "../../lib/styles/classes";
import {
MessageCircleQuestion,
Send
} from "../../lib/icons";
import { useRef,useState } from "react";
import { Button } from "../../lib/actions";
import { Badge,Callout } from "../../lib/feedback";
import { TextArea } from "../../lib/fields";
import { DateTime,useMessages } from "../../lib/locale";
import { settled } from "./settled";

/* ---------- Customer question (F-C11) ---------- */
export interface QuestionCardProps {
  question: string;
  /** Full name for the header; `recipientName` (short) is used on the send button. */
  to: string;
  recipientName?: string;
  status: "draft" | "sent" | "answered";
  answer?: string;
  affects?: string[];
  sentAt?: Date | string;
  isPending?: boolean;
  onSend?: () => unknown;
  onEdit?: () => void;
  /** Record an answer received outside Framed (phone, site visit). Return a promise to keep the text if saving fails. */
  onRecordAnswer?: (text: string) => unknown;
  /** In lists, the send action is secondary so each region keeps one primary. */
  inList?: boolean;
}
/** A targeted clarification. Answers link back to the brief and scope items they affect (F-C11). */
export function QuestionCard({ question, to, recipientName, status, answer, affects, sentAt, isPending, onSend, onEdit, onRecordAnswer, inList }: QuestionCardProps) {
  const { t } = useMessages();
  const [draftAnswer, setDraftAnswer] = useState("");
  const [actionPending, setActionPending] = useState(false);
  const [actionFailed, setActionFailed] = useState(false);
  const statusRef = useRef<HTMLSpanElement>(null);
  const short = recipientName ?? to;
  // After sending or recording, the actions unmount; focus moves to the status so keyboard users keep their place.
  const thenFocusStatus = async (action: () => unknown) => {
    if (actionPending || isPending) return false;
    setActionPending(true); setActionFailed(false);
    const ok = await settled(action);
    setActionPending(false); setActionFailed(!ok);
    if (ok) requestAnimationFrame(() => statusRef.current?.focus());
    return ok;
  };
  return (
    <article className={cx("plumb-element-article", "plumb-question")} data-status={status}>
      <div className={cx("plumb-element-div", "plumb-question-head")}>
        <MessageCircleQuestion aria-hidden />
        <span className={cx("plumb-element-span", "plumb-item-description")}>{t("toRecipient", { name: to })}{sentAt && <> · <DateTime value={sentAt} format="short" /></>}</span>
        <span ref={statusRef} tabIndex={-1} className={cx("plumb-element-span", "plumb-question-status")}>
          <Badge tone={status === "answered" ? "success" : status === "sent" ? "accent" : "neutral"} variant={status === "draft" ? "dashed" : "soft"}>
            {status === "answered" ? t("answered") : status === "sent" ? t("awaitingAnswer") : t("draft")}
          </Badge>
        </span>
      </div>
      <p className={cx("plumb-element-p", "plumb-question-text")}>{question}</p>
      {answer && <blockquote className={cx("plumb-element-blockquote", "plumb-question-answer")}>{answer}</blockquote>}
      {affects && <div className={cx("plumb-element-div", "plumb-item-description")}>{t("affectsIs", { affects: affects.join(", ") })}</div>}
      {status === "draft" && (onSend || onEdit) && (
        <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>
          {onSend && <Button size="sm" variant={inList ? "secondary" : "primary"} icon={<Send />} onPress={() => thenFocusStatus(onSend)} isPending={isPending || actionPending}>{t("sendTo", { name: short })}</Button>}
          {onEdit && <Button size="sm" variant="ghost" onPress={onEdit}>{t("edit")}</Button>}
        </div>
      )}
      {status === "sent" && onRecordAnswer && (
        <div className={cx("plumb-element-div", "plumb-stack plumb-actions")}>
          <TextArea label={t("recordAnswer")} optional value={draftAnswer} onChange={setDraftAnswer} description={t("recordAnswerHelp")} />
          <div className={cx("plumb-element-div")}><Button size="sm" isDisabled={!draftAnswer.trim()} isPending={isPending || actionPending} onPress={async () => {
            const submitted = draftAnswer;
            if (await thenFocusStatus(() => onRecordAnswer(submitted.trim()))) setDraftAnswer((current) => current === submitted ? "" : current);
          }}>{t("saveAnswer")}</Button></div>
        </div>
      )}
      {actionFailed && <Callout tone="danger" live title={t("failed")}>{t("tryAgain")}</Callout>}
    </article>
  );
}
