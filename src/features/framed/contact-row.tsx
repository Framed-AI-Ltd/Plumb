import { cx } from "../../lib/styles/classes";
import {
Lock,Mail,
Phone,
Users
} from "../../lib/icons";
import { Avatar,Badge } from "../../lib/feedback";
import { useMessages } from "../../lib/locale";

/* ---------- Contacts (F-C03) ---------- */
export interface ContactProps {
  name: string;
  role: string;
  company?: string;
  email?: string;
  phone?: string;
  access?: "private" | "portal" | "none";
}
/** A project contact with role and what they can access. */
export function ContactRow({ name, role, company, email, phone, access = "none" }: ContactProps) {
  const { t } = useMessages();
  return (
    <div className={cx("plumb-element-div", "plumb-contact")}>
      <Avatar name={name} />
      <div className={cx("plumb-element-div", "plumb-contact-body")}>
        <div className={cx("plumb-element-div", "plumb-contact-name")}>{name}</div>
        <div className={cx("plumb-element-div", "plumb-item-description")}>{role}{company && ` · ${company}`}</div>
      </div>
      <div className={cx("plumb-element-div", "plumb-contact-actions")}>
        {access === "portal" && <Badge tone="accent" icon={<Users aria-hidden />}>{t("portalAccess")}</Badge>}
        {access === "private" && <Badge icon={<Lock aria-hidden />}>{t("teamOnly")}</Badge>}
        <span className={cx("plumb-element-span", "plumb-contact-slot")}>{email && <a className={cx("plumb-element-a", "plumb-button plumb-focusable")} data-variant="ghost" data-size="sm" data-icon-only href={`mailto:${encodeURIComponent(email)}`} aria-label={t("emailName", { name })}><Mail aria-hidden /></a>}</span>
        <span className={cx("plumb-element-span", "plumb-contact-slot")}>{phone && <a className={cx("plumb-element-a", "plumb-button plumb-focusable")} data-variant="ghost" data-size="sm" data-icon-only href={`tel:${phone.replace(/[^\d+]/g, "")}`} aria-label={t("callName", { name })}><Phone aria-hidden /></a>}</span>
      </div>
    </div>
  );
}
