import { cx } from "../../lib/styles/classes";
import {
CircleAlert,
Loader,
Sparkles
} from "../../lib/icons";
import { type ReactNode } from "react";
import { Button } from "../../lib/actions";
import { useMessages } from "../../lib/locale";
import type {AssistantMessageProps } from "./assistant-message";
import { AssistantMessage } from "./assistant-message";

export interface ThreadMessage extends Omit<AssistantMessageProps, "children"> {
  id: string;
  text: ReactNode;
}
export interface AssistantThreadProps {
  messages: ThreadMessage[];
  isResponding?: boolean;
  error?: string;
  onRetry?: () => void;
  /** What the assistant can see under the viewer's permissions. */
  context?: { project: string; sourceCount: number; hiddenCount?: number };
  composer?: ReactNode;
}
/** The assistant conversation: a live log with context, pending, and error states. */
export function AssistantThread({ messages, isResponding, error, onRetry, context, composer }: AssistantThreadProps) {
  const { t, plural } = useMessages();
  return (
    <section className={cx("plumb-element-section", "plumb-thread")} aria-label={t("assistantName")}>
      {context && (
        <div className={cx("plumb-element-div", "plumb-thread-context")}>
          <Sparkles aria-hidden /> {plural("answeringFrom", context.sourceCount, { project: context.project })}
          {context.hiddenCount ? ` · ${plural("hiddenExcluded", context.hiddenCount)}` : ""}
        </div>
      )}
      <div className={cx("plumb-element-div", "plumb-thread-log")} role="log" aria-live="polite" aria-busy={isResponding || undefined}>
        {messages.map(({ id, text, ...m }) => <AssistantMessage key={id} {...m}>{text}</AssistantMessage>)}
        {isResponding && (
          <div className={cx("plumb-element-div", "plumb-msg")} data-from="assistant">
            <span className={cx("plumb-element-span", "plumb-msg-avatar")} aria-hidden><Sparkles /></span>
            <div className={cx("plumb-element-div", "plumb-msg-bubble plumb-msg-typing")}><Loader className={cx("plumb-spin")} aria-hidden /> {t("checkingSources")}</div>
          </div>
        )}
        {error && (
          <div className={cx("plumb-element-div", "plumb-thread-error")} role="alert">
            <CircleAlert aria-hidden /><span className={cx("plumb-element-span")}>{error}</span>
            {onRetry && <Button size="sm" variant="secondary" onPress={onRetry}>{t("tryAnother")}</Button>}
          </div>
        )}
      </div>
      {composer}
    </section>
  );
}
