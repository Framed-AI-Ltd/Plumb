import { itemKinds } from "./helpers";
import type { LineItemKind } from "./types";

/** Every line item kind, in display order. */
export const lineItemKinds = Object.keys(itemKinds) as LineItemKind[];
