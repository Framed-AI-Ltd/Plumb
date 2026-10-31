// More inputs: checkbox groups, sliders, time and date ranges, a standalone calendar, ratings, toggles, toolbars.
import { useState } from "react";
import { cx } from "../cx";
import { TextField,type TextFieldProps } from "../fields";

export interface OneTimeCodeFieldProps extends Omit<TextFieldProps, "type" | "prefix" | "suffix" | "inputMode"> {
  /** Number of characters; the field accepts digits only. */
  length?: number;
}
/** A one-time sign-in or confirmation code. One input (not one box per digit), so paste and autofill work. */
export function OneTimeCodeField({ length = 6, value, defaultValue, onChange, className, ...props }: OneTimeCodeFieldProps) {
  // Keep only digits, so a pasted "123 456" or "123-456" becomes "123456" (no maxLength: it would cut the paste first).
  const [own, setOwn] = useState(defaultValue ?? "");
  const shown = value ?? own;
  return (
    <TextField {...props} className={cx("plumb-otp", className)} inputMode="numeric" autoComplete="one-time-code" pattern={`\\d{${length}}`}
      value={shown} onChange={(v) => { const digits = v.replace(/\D/g, "").slice(0, length); if (value === undefined) setOwn(digits); onChange?.(digits); }}
      style={{ ["--otp-length" as string]: length }} />
  );
}
