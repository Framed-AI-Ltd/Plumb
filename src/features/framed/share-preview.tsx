import {
Eye,EyeOff,
Lock
} from "../../lib/icons";
import { cx } from "../../lib/cx";
import { Avatar } from "../../lib/feedback";
import { Switch } from "../../lib/fields";
import { useMessages } from "../../lib/locale";

/* ---------- Share preview (F-S11, F-S17, F-C30) ---------- */
export interface ShareItem {
  id: string;
  label: string;
  detail?: string;
  included: boolean;
  /** Private items can never be included; shown so the boundary is visible. */
  locked?: boolean;
}
export interface SharePreviewProps {
  recipient: { name: string; role: string };
  revision: string;
  items: ShareItem[];
  onToggle?: (id: string) => void;
  className?: string;
}
/** Exactly what a recipient will receive, and what stays private, before an external action. */
export function SharePreview({ recipient, revision, items, onToggle, className }: SharePreviewProps) {
  const { t } = useMessages();
  const included = items.filter((i) => i.included).length;
  // One stable list: toggling never moves or remounts a row, so keyboard focus stays on the switch.
  return (
    <section className={cx("plumb-element-section", cx("plumb-share", className))} aria-label={t("sharePreview")}>
      <div className={cx("plumb-element-div", "plumb-share-recipient")}>
        <Avatar name={recipient.name} />
        <div className={cx("plumb-element-div")}>
          <div className={cx("plumb-element-div", "plumb-share-name")}>{recipient.name}</div>
          <div className={cx("plumb-element-div", "plumb-item-description")}>{t("receivesRevision", { role: recipient.role, revision })}</div>
        </div>
      </div>
      <div className={cx("plumb-element-div", "plumb-share-heading")} aria-live="polite">{t("sharedCount", { included, total: items.length })}</div>
      <ul className={cx("plumb-element-ul", "plumb-share-list")}>
        {items.map((i) => (
          <li key={i.id} className={cx("plumb-element-li", "plumb-share-item")} data-included={i.included || undefined}>
            {i.included ? <Eye aria-hidden /> : i.locked ? <Lock aria-hidden /> : <EyeOff aria-hidden />}
            <span className={cx("plumb-element-span", "plumb-share-text")}>
              {i.label}
              <span className={cx("plumb-element-span", "plumb-item-description")}>{i.included ? t("willSee") : t("staysPrivate")}{i.detail ? ` · ${i.detail}` : ""}</span>
            </span>
            {i.locked ? <span className={cx("plumb-element-span", "plumb-share-locked")}>{t("alwaysPrivate")}</span> : onToggle && (
              <Switch isSelected={i.included} onChange={() => onToggle(i.id)}><span className={cx("plumb-element-span", "plumb-sr-only")}>{t("shareItem", { label: i.label })}</span></Switch>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
