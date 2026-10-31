// Working together: threads and RFIs, tasks and punch lists, assistant task progress, notifications
// (F-S12, F-S14, F-C39, F-C40, F-C41, F-C42, F-C59, F-M24).
import {
CircleCheck,
Lock,MessageSquare,RotateCcw,Sparkles,TriangleAlert,Users
} from "../../lib/icons";
import { useState,type ReactNode } from "react";
import { Button } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { Avatar,Badge,Callout } from "../../lib/feedback";
import { SegmentedControl,TextArea } from "../../lib/fields";
import { DateTime,useMessages,type MessageKey } from "../../lib/locale";
import { settled } from "../framed";
import { isPast } from "./helpers";

/* ---------- Comment thread / RFI (F-C39) ---------- */
export interface ThreadComment {
  id: string;
  author: string;
  body: ReactNode;
  at: Date | string;
  /** `private` comments are visible to the firm only (principle 11). */
  visibility?: "private" | "shared";
  /** Drafted by the assistant; never a professional instruction until a person posts it. */
  fromAssistant?: boolean;
  edited?: boolean;
}
export interface CommentThreadProps {
  /** e.g. "RFI-012 · Cabinet depth at window wall". */
  title: ReactNode;
  comments: ThreadComment[];
  status?: "open" | "answered" | "resolved";
  assignee?: string;
  due?: Date | string;
  /** Linked sources, scope items, or drawings. */
  links?: ReactNode;
  /** Return a promise; the text is kept if posting fails. */
  onPost?: (text: string, visibility: "private" | "shared") => unknown;
  onResolve?: () => void;
  onReopen?: () => void;
  /** Whether the customer can be included; when false every post is private. */
  canShare?: boolean;
  className?: string;
}
/** A question or discussion with an owner, a due date, and a clear private/shared boundary on every message. */
export function CommentThread({ title, comments, status = "open", assignee, due, links, onPost, onResolve, onReopen, canShare = true, className }: CommentThreadProps) {
  const { t } = useMessages();
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState<"private" | "shared">("private");
  const [posting, setPosting] = useState(false);
  const [postFailed, setPostFailed] = useState(false);
  const overdue = due && status === "open" && isPast(due);
  const post = async () => {
    if (!text.trim() || !onPost || posting) return;
    setPosting(true); setPostFailed(false);
    const submitted = text;
    const ok = await settled(() => onPost(submitted.trim(), canShare ? visibility : "private"));
    setPosting(false); setPostFailed(!ok);
    // Each reply starts internal again, so a customer post is always a deliberate choice.
    if (ok) { setText((current) => current === submitted ? "" : current); setVisibility("private"); }
  };
  return (
    <section className={cx("plumb-element-section", cx("plumb-thread-card", className))} aria-label={typeof title === "string" ? title : t("thread")}>
      <header className={cx("plumb-element-header", "plumb-thread-head")}>
        <MessageSquare aria-hidden />
        <div className={cx("plumb-element-div", "plumb-thread-title")}>
          <span className={cx("plumb-element-span", "plumb-heading")} data-level="subheading">{title}</span>
          <span className={cx("plumb-element-span", "plumb-item-description")}>
            {assignee && t("assignedTo", { name: assignee })}
            {assignee && due && " · "}
            {due && <span data-overdue={overdue || undefined} className={cx("plumb-element-span", "plumb-thread-due")}>{overdue && <TriangleAlert aria-hidden />}{t("dueOn")} <DateTime value={due} format="short" />{overdue && <> · {t("overdue")}</>}</span>}
          </span>
        </div>
        <Badge tone={status === "resolved" ? "success" : status === "answered" ? "accent" : "neutral"} variant={status === "open" ? "outline" : "soft"}>{t(`thread_${status}` as MessageKey)}</Badge>
      </header>
      {links && <div className={cx("plumb-element-div", "plumb-thread-links")}>{links}</div>}
      <ol className={cx("plumb-element-ol", "plumb-comments")}>
        {comments.map((c) => (
          <li key={c.id} className={cx("plumb-element-li", "plumb-comment")} data-visibility={c.visibility ?? "private"}>
            {c.fromAssistant ? <span className={cx("plumb-element-span", "plumb-msg-avatar")} aria-hidden><Sparkles /></span> : <Avatar name={c.author} />}
            <div className={cx("plumb-element-div", "plumb-comment-body")}>
              <div className={cx("plumb-element-div", "plumb-comment-meta")}>
                <span className={cx("plumb-element-span", "plumb-label")}>{c.author}</span>
                <span className={cx("plumb-element-span", "plumb-item-description")}><DateTime value={c.at} format="datetime" />{c.edited && ` · ${t("edited")}`}</span>
                {(c.visibility ?? "private") === "private"
                  ? <span className={cx("plumb-element-span", "plumb-comment-vis")}><Lock aria-hidden />{t("internal")}</span>
                  : <span className={cx("plumb-element-span", "plumb-comment-vis")} data-shared><Users aria-hidden />{t("sharedWithCustomer")}</span>}
                {c.fromAssistant && <Badge tone="accent" variant="dashed" icon={<Sparkles aria-hidden />}>{t("aiDraft")}</Badge>}
              </div>
              <div className={cx("plumb-element-div", "plumb-comment-text")}>{c.body}</div>
            </div>
          </li>
        ))}
        {!comments.length && <li className={cx("plumb-element-li", "plumb-item-description")}>{t("noCommentsYet")}</li>}
      </ol>
      {status !== "resolved" && onPost && (
        <form className={cx("plumb-element-form", "plumb-comment-form")} onSubmit={(e) => { e.preventDefault(); post(); }}>
          {postFailed && <Callout tone="danger" live title={t("failed")}>{t("tryAgain")}</Callout>}
          <TextArea label={t("reply")} value={text} onChange={setText} />
          <div className={cx("plumb-element-div", "plumb-inline plumb-actions plumb-comment-actions")}>
            {canShare && (
              <SegmentedControl aria-label={t("whoCanSee")} size="sm" selectedKey={visibility} onSelectionChange={(k) => setVisibility(k as "private" | "shared")}
                options={[{ id: "private", label: t("internal"), icon: <Lock aria-hidden /> }, { id: "shared", label: t("withCustomer"), icon: <Users aria-hidden /> }]} />
            )}
            <span className={cx("plumb-element-span", "plumb-spacer")} />
            {onResolve && <Button size="sm" variant="ghost" icon={<CircleCheck />} onPress={onResolve}>{t("markResolved")}</Button>}
            <Button type="submit" size="sm" variant="primary" isDisabled={!text.trim()} isPending={posting}>{visibility === "shared" && canShare ? t("postToCustomer") : t("postInternal")}</Button>
          </div>
        </form>
      )}
      {status === "resolved" && onReopen && <div className={cx("plumb-element-div")}><Button size="sm" variant="ghost" icon={<RotateCcw />} onPress={onReopen}>{t("reopen")}</Button></div>}
    </section>
  );
}
