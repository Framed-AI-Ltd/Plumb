
/* ---------- Toast ---------- */
export interface ToastContentSpec {
  title: string;
  description?: string;
  tone?: "neutral" | "success" | "danger";
  /** One short reversal, e.g. Undo after a delete (F-S21). */
  action?: { label: string; onAction: () => void };
}
