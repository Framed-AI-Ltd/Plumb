import { cx } from "../../lib/styles/classes";
import {
Send,
Square
} from "../../lib/icons";
import { useState } from "react";
import { IconButton } from "../../lib/actions";
import { Callout } from "../../lib/feedback";
import { TextArea } from "../../lib/fields";
import { useMessages } from "../../lib/locale";
import { settled } from "./settled";

/* ---------- Composer and thread (F-S09, F-S10) ---------- */
export interface ComposerProps {
  label?: string;
  placeholder?: string;
  /** Return a promise to keep the text until it resolves; on rejection the text stays for another try. */
  onSubmit?: (text: string) => unknown;
  /** While the assistant is answering: send becomes Stop. */
  isPending?: boolean;
  onStop?: () => void;
  /** Enter sends, Shift+Enter adds a line. ⌘/Ctrl+Enter always sends. */
  submitOnEnter?: boolean;
}
/** The message box for asking the assistant: Enter sends, Shift+Enter adds a line, Stop while answering. */
export function Composer({ label, placeholder, onSubmit, isPending, onStop, submitOnEnter = true }: ComposerProps) {
  const { t } = useMessages();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const ready = text.trim().length > 0 && !isPending && !sending;
  const send = async () => {
    if (!ready) return;
    setSending(true); setSendFailed(false);
    const submitted = text;
    const ok = await settled(() => onSubmit?.(submitted.trim()));
    setSending(false); setSendFailed(!ok);
    if (ok) setText((current) => current === submitted ? "" : current);
  };
  return (
    <div className={cx("plumb-element-div", "plumb-composer")}>
      <TextArea onKeyDown={(e) => {
        if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
        if (e.metaKey || e.ctrlKey || (submitOnEnter && !e.shiftKey)) { e.preventDefault(); send(); }
      }} label={label ?? t("askProject")} placeholder={placeholder ?? t("askPlaceholder")} value={text} onChange={setText} description={submitOnEnter ? t("composerHelpEnter") : t("composerHelpMod")} />
      <span className={cx("plumb-element-span", "plumb-composer-send")}>
        {isPending && onStop
          ? <IconButton label={t("stopAnswering")} icon={<Square />} size="sm" variant="secondary" onPress={onStop} />
          : <IconButton label={t("send")} icon={<Send />} size="sm" variant={ready ? "primary" : "secondary"} isDisabled={!ready} isPending={sending} onPress={send} />}
      </span>
      {sendFailed && <Callout tone="danger" live title={t("failed")}>{t("tryAgain")}</Callout>}
    </div>
  );
}
