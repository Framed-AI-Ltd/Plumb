// Proposal document and payment schedule (F-C29, F-C30, F-C26, F-S11).
import { type ReactNode } from "react";
import { type LineItemKind } from "../framed";
import type { ProposalDocumentProps } from "./proposal-document";

export interface Letterhead {
  /** An <img> or SVG; sized to 40px tall. */
  logo?: ReactNode;
  address?: ReactNode;
  /** Licence, registration, or tax number, as the firm must show it. */
  registration?: string;
  contact?: ReactNode;
}
export interface ProposalLine {
  id: string;
  label: string;
  qty: number | null;
  unit: string;
  /** Customer amount (overhead and markup already folded into fixed lines). `null` = not priced. */
  amount: number | null;
  kind?: LineItemKind;
  trade?: string;
}
export interface Milestone {
  id: string;
  label: string;
  /** Share of the total (0–1). Use either percent or amount. */
  percent?: number;
  amount?: number;
  /** ISO date. */
  due?: string;
}
export type ProposalBlocker = { code: "linesTotal" } | { code: "schedule" } | { code: "custom"; message: string };
export type BlockerInput = Pick<ProposalDocumentProps, "lines" | "total" | "taxes" | "milestones" | "issueBlockers">;
