// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import { type ReactNode } from "react";
import { cx } from "../cx";
import { inlineTokens } from "./inline-tokens";

/* ---------- Formatted text (F-C29, F-C31, F-C40) ---------- */
/**
 * Renders a small, safe Markdown subset (paragraphs, **bold**, *italic*, "- " lists, "1. " lists, [links](https://…))
 * as React elements: never HTML, so text from customers and the assistant can't inject markup. Links must be
 * http(s) or mailto; anything else is shown as text.
 */
export function FormattedText({ children, className }: { children: string; className?: string }) {
  const inline = (s: string, key: string): ReactNode[] => inlineTokens(s).map((token, i) => {
    const k = `${key}-${i}`;
    if (token.kind === "strong") return <strong key={k} className={cx("plumb-element-strong")}>{token.value}</strong>;
    if (token.kind === "em") return <em key={k} className={cx("plumb-element-em")}>{token.value}</em>;
    if (token.kind === "link") return <a key={k} className={cx("plumb-element-a", "plumb-link")} href={token.href} rel="noopener noreferrer">{token.value}</a>;
    return token.value;
  });
  const blocks = children.replace(/\r\n/g, "\n").split(/\n{2,}/);
  return (
    <div className={cx("plumb-element-div", cx("plumb-formatted", className))}>
      {blocks.map((block, b) => {
        const lines = block.split("\n").filter((l) => l.trim());
        if (lines.length && lines.every((l) => /^\s*[-*] /.test(l))) return <ul key={b} className={cx("plumb-element-ul")}>{lines.map((l, i) => <li key={i} className={cx("plumb-element-li")}>{inline(l.replace(/^\s*[-*] /, ""), `${b}-${i}`)}</li>)}</ul>;
        if (lines.length && lines.every((l) => /^\s*\d+[.)] /.test(l))) return <ol key={b} className={cx("plumb-element-ol")}>{lines.map((l, i) => <li key={i} className={cx("plumb-element-li")}>{inline(l.replace(/^\s*\d+[.)] /, ""), `${b}-${i}`)}</li>)}</ol>;
        return <p key={b} className={cx("plumb-element-p")}>{lines.flatMap((l, i) => (i ? [<br key={`br${i}`} className={cx("plumb-element-br")} />, ...inline(l, `${b}-${i}`)] : inline(l, `${b}-${i}`)))}</p>;
      })}
    </div>
  );
}
