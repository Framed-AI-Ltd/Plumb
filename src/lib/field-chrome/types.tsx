// Shared field parts: label row, description and error, focus handle, and the calendar grid.
// Internal to Plumb (not exported from the package index).
import { type ReactNode,type Ref } from "react";

export interface FieldChrome {
  label: ReactNode;
  description?: ReactNode;
  errorMessage?: string;
  /** Marks the field optional in its label; required is the default expectation. */
  optional?: boolean;
  /** Right side of the label row, e.g. a `<Provenance>` badge for the value. */
  labelAside?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** `inputRef.current.focus()` moves focus into the field (its input, trigger, first date segment, or radio),
   *  so error summaries can send people to the problem. */
  inputRef?: Ref<FieldFocus>;
}
export interface FieldFocus { focus(): void }
