// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import { Bold,Italic,List } from "../icons";
import { useRef,useState } from "react";
import {
Button as AriaButton
} from "react-aria-components";
import { cx } from "../cx";
import { TextArea,type TextFieldProps } from "../fields";
import { useMessages } from "../locale";
import { FormattedText } from "./formatted-text";
import { Toolbar } from "./toolbar";

export interface FormattedTextFieldProps extends Omit<TextFieldProps, "prefix" | "suffix" | "size" | "type"> {
  /** Show a live preview under the field. */
  preview?: boolean;
}
/** Multi-line text with bold, italic, and list buttons (Ctrl/⌘+B, Ctrl/⌘+I). Stores Markdown; render with FormattedText. */
export function FormattedTextField({ preview, value, defaultValue, onChange, className, ...props }: FormattedTextFieldProps) {
  const { t } = useMessages();
  const [own, setOwn] = useState(defaultValue ?? "");
  const text = value ?? own;
  const set = (v: string) => { if (value === undefined) setOwn(v); onChange?.(v); };
  const area = useRef<HTMLTextAreaElement | null>(null);
  const wrap = (mark: string) => {
    const el = area.current; if (!el) return;
    const { selectionStart: a, selectionEnd: b } = el;
    set(text.slice(0, a) + mark + text.slice(a, b) + mark + text.slice(b));
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(a + mark.length, b + mark.length); });
  };
  const list = () => {
    const el = area.current; if (!el) return;
    const start = text.lastIndexOf("\n", el.selectionStart - 1) + 1;
    set(text.slice(0, start) + "- " + text.slice(start));
    requestAnimationFrame(() => el.focus());
  };
  return (
    <div className={cx("plumb-element-div", cx("plumb-formatted-field", className))}>
      <TextArea {...props} value={text} onChange={set} inputRef={area as never}
        onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && (e.key === "b" || e.key === "i")) { e.preventDefault(); wrap(e.key === "b" ? "**" : "*"); } }} />
      <Toolbar aria-label={t("formatting")} className={cx("plumb-formatted-toolbar")}>
        <AriaButton className={cx("plumb-button plumb-focusable")} data-variant="ghost" data-size="sm" data-icon-only aria-label={t("bold")} onPress={() => wrap("**")}><Bold aria-hidden /></AriaButton>
        <AriaButton className={cx("plumb-button plumb-focusable")} data-variant="ghost" data-size="sm" data-icon-only aria-label={t("italic")} onPress={() => wrap("*")}><Italic aria-hidden /></AriaButton>
        <AriaButton className={cx("plumb-button plumb-focusable")} data-variant="ghost" data-size="sm" data-icon-only aria-label={t("bulletList")} onPress={list}><List aria-hidden /></AriaButton>
      </Toolbar>
      {preview && text.trim() && <div className={cx("plumb-element-div", "plumb-formatted-preview")}><span className={cx("plumb-element-span", "plumb-text")} data-variant="caption" data-tone="muted">{t("preview")}</span><FormattedText>{text}</FormattedText></div>}
    </div>
  );
}
