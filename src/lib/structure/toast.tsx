import { toasts } from "./toasts";
import type { ToastContentSpec } from "./types";

/** Shows a toast for 5 s; toasts with an action stay until dismissed (WCAG 2.2.1 timing). */
export function toast(content: ToastContentSpec, options?: { timeout?: number }) {
  return toasts.add(content, { timeout: content.action ? undefined : options?.timeout ?? 5000 });
}
