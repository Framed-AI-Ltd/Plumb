import {
UNSTABLE_ToastQueue as ToastQueue
} from "react-aria-components";
import type { ToastContentSpec } from "./types";

/** One queue per app. Toasts confirm completed actions; they never carry decisions or errors that need fixing. */
export const toasts = new ToastQueue<ToastContentSpec>({ maxVisibleToasts: 3 });
