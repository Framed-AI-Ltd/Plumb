import { cx } from "../../lib/styles/classes";
import {
Sparkles
} from "../../lib/icons";
import { type ReactNode } from "react";
import { Avatar } from "../../lib/feedback";
import { useMessages } from "../../lib/locale";
import { SourceTag,type SourceTagProps } from "../domain";

/* ---------- Assistant (F-S09, F-S10) ---------- */
export interface AssistantMessageProps {
  from: "assistant" | "person";
  name?: string;
  children: ReactNode;
  sources?: SourceTagProps[];
  /** Actions on an assistant suggestion, e.g. "Apply to draft". */
  actions?: ReactNode;
}
/** Conversation turn. Assistant answers cite sources and never apply changes on their own. */
export function AssistantMessage({ from, name, children, sources, actions }: AssistantMessageProps) {
  const { t } = useMessages();
  return (
    <div className={cx("plumb-element-div", "plumb-msg")} data-from={from}>
      {from === "assistant" ? <span className={cx("plumb-element-span", "plumb-msg-avatar")} aria-hidden><Sparkles /></span> : <Avatar name={name ?? t("you")} />}
      <div className={cx("plumb-element-div", "plumb-msg-bubble")}>
        <div className={cx("plumb-element-div", "plumb-msg-name")}>{from === "assistant" ? t("assistantName") : name ?? t("you")}</div>
        <div className={cx("plumb-element-div", "plumb-msg-text")}>{children}</div>
        {sources && sources.length > 0 && (
          <div className={cx("plumb-element-div", "plumb-msg-sources")}>{sources.map((s, i) => <SourceTag key={i} {...s} />)}</div>
        )}
        {actions && <div className={cx("plumb-element-div", "plumb-msg-actions")}>{actions}</div>}
      </div>
    </div>
  );
}
