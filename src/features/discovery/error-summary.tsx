import { cx } from "../../lib/styles/classes";
// Finding, viewing, and bringing in information (F-S07, F-S13, F-S15, F-S17, F-C06, F-C20, F-H03, F-H12).
import {
CircleAlert
} from "../../lib/icons";
import { useEffect,useId,useRef } from "react";
import {
Button as AriaButton
} from "react-aria-components";
import { type FieldFocus } from "../../lib/fields";
import { useMessages } from "../../lib/locale";

/* ---------- Error summary (F-S15) ---------- */
export interface FormError { id: string; message: string; inputRef?: { current: FieldFocus | null } }
/** Lists every problem after a failed submit, takes focus, and each item moves focus to its field (GOV.UK pattern). */
export function ErrorSummary({ errors, title }: { errors: FormError[]; title?: string }) {
  const { t } = useMessages();
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const key = errors.map((e) => e.id).join("|");
  useEffect(() => { if (key) ref.current?.focus(); }, [key]);
  if (!errors.length) return null;
  return (
    <div ref={ref} tabIndex={-1} role="alert" aria-labelledby={titleId} className={cx("plumb-element-div", "plumb-error-summary")}>
      <div className={cx("plumb-element-div", "plumb-error-summary-head")}><CircleAlert aria-hidden /><h2 id={titleId} className={cx("plumb-element-h2", "plumb-heading")} data-level="subheading">{title ?? t("fixBeforeContinuing")}</h2></div>
      <ul className={cx("plumb-element-ul")}>
        {errors.map((e) => (
          <li key={e.id} className={cx("plumb-element-li")}>
            <AriaButton className={cx("plumb-link plumb-focusable plumb-error-link")} onPress={() => e.inputRef?.current?.focus()}>{e.message}</AriaButton>
          </li>
        ))}
      </ul>
    </div>
  );
}
