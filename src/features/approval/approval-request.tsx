import { cx } from "../../lib/styles/classes";
// Customer decisions and reusable checklists (F-C34, F-C38, F-S11, F-M22, F-C16, F-C01).
import { CircleCheck,TriangleAlert } from "../../lib/icons";
import { useId,useRef,useState,type ReactNode } from "react";
import { Button } from "../../lib/actions";
import { Callout } from "../../lib/feedback";
import { Checkbox,TextArea,TextField } from "../../lib/fields";
import { DateTime,useCurrency,useMessages } from "../../lib/locale";
import { Money } from "../domain";

export interface ApprovalRequestProps {
  revision: string;
  option: string;
  /** The amount being approved, and whether it includes tax (the customer must know which). */
  amount: number;
  taxBasis: "incl" | "excl";
  currency?: string;
  scopeSummary?: ReactNode;
  conditions?: string[];
  expiresAt?: Date | string;
  /** When set, the revision changed after it was sent and can't be approved. */
  staleReason?: string;
  /** The app's approved legal wording, in the customer's language. */
  consentText: string;
  isPending?: boolean;
  /** Shown above the actions when approving or sending fails; what was typed is kept. */
  errorMessage?: string;
  onApprove?: (decision: { signerName: string; acceptedAt: string }) => void;
  onRequestChanges?: (reason: string) => void;
}
/**
 * The customer's decision on one exact revision. Approval needs a typed name and explicit consent, and is refused
 * for stale revisions. Recording the result is the app's job (pair with ApprovalSnapshot).
 */
export function ApprovalRequest({ revision, option, amount, taxBasis, currency, scopeSummary, conditions, expiresAt, staleReason, consentText, isPending, errorMessage, onApprove, onRequestChanges }: ApprovalRequestProps) {
  const code = useCurrency();
  const { t, rich } = useMessages();
  const changesRef = useRef<HTMLButtonElement>(null);
  const hintId = useId();
  const expiry = expiresAt ? new Date(typeof expiresAt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(expiresAt) ? `${expiresAt}T23:59:59` : expiresAt).getTime() : null;
  const isExpired = () => expiry !== null && expiry < new Date().getTime();
  const [expiredAtSubmit, setExpiredAtSubmit] = useState(false);
  const expired = isExpired() || expiredAtSubmit;
  const [mode, setMode] = useState<"approve" | "changes">("approve");
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [reason, setReason] = useState("");
  const identity = JSON.stringify([revision, option, amount, taxBasis, currency ?? code, consentText, conditions, expiry]);
  const [consentedIdentity, setConsentedIdentity] = useState(identity);
  // Consent belongs to the exact decision displayed, including its price and terms.
  if (consentedIdentity !== identity) {
    setConsentedIdentity(identity);
    setAgreed(false);
    setExpiredAtSubmit(false);
  }
  return (
    <section className={cx("plumb-element-section", "plumb-approval-request")} aria-label={t("approveRevision", { revision })}>
      <div className={cx("plumb-element-div", "plumb-approval-request-head")}>
        <div className={cx("plumb-element-div")}>
          <div className={cx("plumb-element-div", "plumb-heading")} data-level="subheading">{t("yourDecision")} {revision}</div>
          <div className={cx("plumb-element-div", "plumb-item-description")}>{option}{expiresAt && <> · {rich("validUntil", { date: <DateTime value={expiresAt} /> })}</>}</div>
        </div>
        <div className={cx("plumb-element-div", "plumb-approval-amount")}>
          <span className={cx("plumb-element-span", "plumb-item-description")}>{taxBasis === "incl" ? t("totalInclTax") : t("totalBeforeTax")} ({currency ?? code})</span>
          <Money amount={amount} currency={currency} emphasis="strong" />
        </div>
      </div>
      {scopeSummary && <div className={cx("plumb-element-div", "plumb-text")} data-variant="body">{scopeSummary}</div>}
      {conditions?.length ? <ul className={cx("plumb-element-ul", "plumb-approval-conditions")}>{conditions.map((c) => <li key={c} className={cx("plumb-element-li")}>{c}</li>)}</ul> : null}
      {errorMessage && <Callout tone="danger" live title={t("failed")}>{errorMessage}</Callout>}
      {staleReason || expired ? (
        <div className={cx("plumb-element-div", "plumb-approval-stale")} role="status"><TriangleAlert aria-hidden /><span className={cx("plumb-element-span")}>
          {staleReason ? `${staleReason} ${t("askUpdatedRevision")}` : rich("expiredOn", { date: <DateTime value={expiresAt!} /> })}
        </span></div>
      ) : mode === "approve" ? (
        <form className={cx("plumb-element-form", "plumb-stack")} data-gap="4" onSubmit={(e) => {
          e.preventDefault();
          // An open page may pass its expiry without rendering again.
          if (isExpired()) { setExpiredAtSubmit(true); return; }
          if (!staleReason && !isPending && name.trim() && agreed) onApprove?.({ signerName: name.trim(), acceptedAt: new Date().toISOString() });
        }}>
          <TextField label={t("signName")} value={name} onChange={setName} autoComplete="name" isRequired />
          <Checkbox isSelected={agreed} onChange={setAgreed} isRequired>{consentText}</Checkbox>
          <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>
            <Button type="submit" variant="primary" icon={<CircleCheck />} isDisabled={!name.trim() || !agreed} isPending={isPending} aria-describedby={!name.trim() || !agreed ? hintId : undefined}>{t("approve")} {revision}</Button>
            {onRequestChanges && <Button ref={changesRef} variant="ghost" onPress={() => setMode("changes")}>{t("requestChanges")}</Button>}
          </div>
          {/* A disabled action always says why. */}
          {(!name.trim() || !agreed) && <span className={cx("plumb-element-span", "plumb-item-description")} id={hintId}>{t("approveHint")}</span>}
        </form>
      ) : (
        <form className={cx("plumb-element-form", "plumb-stack")} data-gap="4" onSubmit={(e) => { e.preventDefault(); if (reason.trim()) onRequestChanges?.(reason.trim()); }}>
          <TextArea label={t("whatChange")} value={reason} onChange={setReason} isRequired autoFocus />
          <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>
            <Button type="submit" variant="primary" isDisabled={!reason.trim()} isPending={isPending}>{t("sendRequest")}</Button>
            <Button variant="ghost" onPress={() => { setMode("approve"); requestAnimationFrame(() => changesRef.current?.focus()); }}>{t("back")}</Button>
          </div>
        </form>
      )}
    </section>
  );
}
