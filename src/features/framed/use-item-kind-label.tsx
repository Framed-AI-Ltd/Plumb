import { useMessages,type MessageKey } from "../../lib/locale";
import type { LineItemKind } from "./types";

/** Localized name of a line item kind, e.g. for a select. */
export function useItemKindLabel() {
  const { t } = useMessages();
  return (kind: LineItemKind) => t(`kind_${kind}` as MessageKey);
}
