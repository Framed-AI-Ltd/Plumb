import {
CircleSlash,
GitBranch,Hourglass,
Lock,
ShieldCheck,
Wallet
} from "../../lib/icons";
import type { LineItemKind } from "./types";

/* ---------- Line item kind (F-C26) ---------- */
// Kinds are neutral by design: a priced allowance is healthy. Ochre is reserved for unknown or unresolved.
export const itemKinds = {
  fixed: Lock,
  allowance: Wallet,
  provisional: Hourglass,
  contingency: ShieldCheck,
  option: GitBranch,
  excluded: CircleSlash,
} as const;
export const faceValue: (LineItemKind | "credit")[] = ["allowance", "provisional", "contingency", "credit"];
export const r2 = (n: number) => Math.round(n * 100) / 100;
