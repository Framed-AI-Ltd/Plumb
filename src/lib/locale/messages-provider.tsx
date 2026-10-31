import { type ReactNode } from "react";
import { MessagesContext } from "./helpers";
import type { Messages } from "./types";

/** Overrides component text for part of the tree (keys from `src/i18n/en.json`). */
export function MessagesProvider({ messages, children }: { messages: Partial<Messages>; children: ReactNode }) {
  return <MessagesContext value={messages}>{children}</MessagesContext>;
}
