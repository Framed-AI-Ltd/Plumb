import { cx } from "../styles/classes";
// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import { Eye,EyeOff } from "../icons";
import { useState } from "react";
import {
ToggleButton as AriaToggleButton
} from "react-aria-components";
import { TextField,type TextFieldProps } from "../fields";
import { useMessages } from "../locale";

/* ---------- Sign-in fields (F-S01) ---------- */
export interface PasswordFieldProps extends Omit<TextFieldProps, "type" | "prefix" | "suffix"> {
  /** `current-password` to sign in, `new-password` when creating one (lets password managers help). */
  autoComplete?: "current-password" | "new-password";
}
/** Password entry with a show/hide button. Paste and password managers always work (WCAG 3.3.8). */
export function PasswordField({ autoComplete = "current-password", ...props }: PasswordFieldProps) {
  const { t } = useMessages();
  const [shown, setShown] = useState(false);
  return (
    <TextField {...props} type={shown ? "text" : "password"} autoComplete={autoComplete} spellCheck="false"
      suffix={<AriaToggleButton isSelected={shown} onChange={setShown} aria-label={t("showPassword")} className={cx("plumb-clear plumb-focusable")}>{shown ? <EyeOff size={16} aria-hidden /> : <Eye size={16} aria-hidden />}</AriaToggleButton>} />
  );
}
