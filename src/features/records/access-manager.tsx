import { cx } from "../../lib/styles/classes";
// Revisions, facts, and access (F-S01, F-S03, F-S04, F-S06, F-S07, F-C05, F-C34, F-C38, F-H10, F-H35, F-M19).
import { getLocalTimeZone,today,type CalendarDate } from "@internationalized/date";
import { UserPlus } from "../../lib/icons";
import { useRef,useState } from "react";
import { Button } from "../../lib/actions";
import { Avatar,Badge,Callout } from "../../lib/feedback";
import { DatePicker,Select,TextField,type FieldFocus } from "../../lib/fields";
import { DateTime,useMessages } from "../../lib/locale";
import { Dialog } from "../../lib/overlays";
import { settled } from "../framed";

/* ---------- Access ---------- */
export interface Member { id: string; name: string; email: string; role: string; status?: "active" | "invited"; expiresAt?: Date | string }
export interface AccessManagerProps {
  members: Member[];
  roles: { id: string; label: string; description?: string }[];
  /** Least-privilege role preselected for invites (never the owner role). */
  defaultInviteRole: string;
  /** Roles the current user may grant; defaults to all except the first (owner). */
  assignableRoles?: string[];
  /** Return a promise: the typed email is kept if the invite fails. */
  onInvite?: (invite: { email: string; role: string; expiresAt?: string }) => unknown;
  onChangeRole?: (memberId: string, role: string) => void;
  /** Return a promise: the confirmation stays open until it resolves and shows the error if it rejects. */
  onRevoke?: (memberId: string) => unknown;
  /** Who can't be changed (e.g. the owner, or yourself). */
  lockedIds?: string[];
  isPending?: boolean;
  errorMessage?: string;
}
/** Who can see this project or home, in which role, and until when; with invite and revoke (F-S03, F-C38, F-H35, F-M10). */
export function AccessManager({ members, roles, defaultInviteRole, assignableRoles, onInvite, onChangeRole, onRevoke, lockedIds = [], isPending, errorMessage }: AccessManagerProps) {
  const { t } = useMessages();
  const grantable = roles.filter((r) => (assignableRoles ?? roles.slice(1).map((x) => x.id)).includes(r.id));
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(defaultInviteRole);
  const [expires, setExpires] = useState<CalendarDate | null>(null);
  const [inviting, setInviting] = useState(false);
  const [inviteFailed, setInviteFailed] = useState(false);
  const [revokeOpen, setRevokeOpen] = useState(false);
  // Kept after the dialog closes so its title doesn't change during the exit animation.
  const [revoking, setRevoking] = useState<Member | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const emailRef = useRef<FieldFocus>(null);
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const confirmRevoke = async () => {
    if (!revoking) return;
    const index = members.findIndex((x) => x.id === revoking.id);
    await onRevoke?.(revoking.id);
    // Focus moves to the next person's Remove button, or the invite field when none are left.
    setTimeout(() => {
      const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>("[data-revoke]");
      const next = buttons?.[Math.min(index, (buttons?.length ?? 1) - 1)];
      if (next) next.focus(); else emailRef.current?.focus();
    }, 0);
  };
  return (
    <section className={cx("plumb-element-section", "plumb-access")} aria-label={t("peopleWithAccess")} aria-busy={isPending || inviting || undefined}>
      {errorMessage && <Callout tone="danger" live title={t("failed")}>{errorMessage}</Callout>}
      <ul className={cx("plumb-element-ul", "plumb-access-list")} ref={listRef}>
        {members.map((m) => {
          const locked = lockedIds.includes(m.id);
          return (
            <li key={m.id} className={cx("plumb-element-li", "plumb-access-row")}>
              <Avatar name={m.name} />
              <div className={cx("plumb-element-div", "plumb-contact-body")}>
                <div className={cx("plumb-element-div", "plumb-contact-name")}>{m.name}{m.status === "invited" && <Badge>{t("invited")}</Badge>}</div>
                <div className={cx("plumb-element-div", "plumb-item-description")}>{m.email}{m.expiresAt && <> · {t("accessUntil")} <DateTime value={m.expiresAt} /></>}</div>
              </div>
              {locked || !onChangeRole
                ? <span className={cx("plumb-element-span", "plumb-text")} data-variant="caption" data-tone="muted">{roles.find((r) => r.id === m.role)?.label ?? m.role}</span>
                : <Select aria-label={t("roleFor", { name: m.name })} label="" size="sm" options={grantable} selectedKey={m.role} isDisabled={isPending} onSelectionChange={(k) => onChangeRole(m.id, String(k))} />}
              {onRevoke && !locked
                ? <Button size="sm" variant="ghost" data-revoke isDisabled={isPending} onPress={() => { setRevoking(m); setRevokeOpen(true); }} aria-label={t("removeAccessOf", { name: m.name })}>{t("remove")}</Button>
                : <span className={cx("plumb-element-span")} />}
            </li>
          );
        })}
      </ul>
      {onInvite && (
        <form className={cx("plumb-element-form", "plumb-access-invite")} onSubmit={async (e) => {
          e.preventDefault();
          if (!validEmail || inviting || isPending) return;
          setInviting(true); setInviteFailed(false);
          const ok = await settled(() => onInvite({ email, role, expiresAt: expires?.toString() }));
          setInviting(false); setInviteFailed(!ok);
          if (ok) { setEmail(""); setExpires(null); }
        }}>
          {inviteFailed && <Callout tone="danger" live title={t("failed")}>{t("tryAgain")}</Callout>}
          <TextField label={t("inviteByEmail")} type="email" value={email} onChange={setEmail} autoComplete="email" inputRef={emailRef} isDisabled={isPending || inviting} />
          <Select label={t("role")} options={grantable} selectedKey={role} isDisabled={isPending || inviting} onSelectionChange={(k) => setRole(String(k))} />
          <DatePicker label={t("accessUntilLabel")} optional value={expires} isDisabled={isPending || inviting} onChange={setExpires} minValue={today(getLocalTimeZone())} />
          <Button type="submit" icon={<UserPlus />} isDisabled={!validEmail} isPending={isPending || inviting}>{t("invite")}</Button>
        </form>
      )}
      <Dialog isOpen={revokeOpen} onOpenChange={setRevokeOpen} role="alertdialog" title={t("removeAccessQuestion", { name: revoking?.name ?? "" })}
        confirmLabel={t("removeAccess")} confirmVariant="danger" onConfirm={confirmRevoke}>
        <p className={cx("plumb-element-p", "plumb-text")} data-variant="body">{t("removeAccessBody")}</p>
      </Dialog>
    </section>
  );
}
