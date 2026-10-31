// Shared field parts: label row, description and error, focus handle, and the calendar grid.
// Internal to Plumb (not exported from the package index).
import { useImperativeHandle,useRef,type Ref } from "react";
import type { FieldFocus } from "./types";

/** Exposes `focus()` for composite fields: focuses the first element matching the first selector that matches. */
export function useFieldFocus(inputRef: Ref<FieldFocus> | undefined, ...selectors: string[]) {
  const container = useRef<HTMLDivElement>(null);
  const key = selectors.join("|");
  useImperativeHandle(inputRef, () => ({
    focus: () => { for (const s of key.split("|")) { const el = container.current?.querySelector<HTMLElement>(s); if (el) return el.focus(); } },
  }), [key]);
  return container;
}
