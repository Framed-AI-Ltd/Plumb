import { cx } from "../../lib/styles/classes";
import {
ArrowRight,
CircleAlert,
CircleDashed,
CircleSlash,
MessageCircleQuestion,
TriangleAlert
} from "../../lib/icons";
import { Button } from "../../lib/actions";
import { useMessages,type MessageKey } from "../../lib/locale";

/* ---------- Open items: missing and conflicting inputs (F-C10, F-C42) ---------- */
export interface OpenItem {
  id: string;
  title: string;
  kind: "missing" | "conflict" | "outdated" | "question" | "blocked";
  detail?: string;
  nextStep: string;
  owner?: string;
  affects?: string;
}
export const openIcons = { missing: CircleDashed, conflict: TriangleAlert, outdated: CircleAlert, question: MessageCircleQuestion, blocked: CircleSlash };
/** What must be resolved before pricing or work can continue, each with a concrete next step and an owner. */
export function OpenItems({ items, onAction, "aria-label": label }: { items: OpenItem[]; onAction?: (item: OpenItem) => void; "aria-label"?: string }) {
  const { t } = useMessages();
  return (
    <ul className={cx("plumb-element-ul", "plumb-open")} aria-label={label ?? t("openItems")}>
      {items.map((i) => {
        const Icon = openIcons[i.kind];
        const action = i.kind === "question" ? t("draftQuestion") : t("resolve");
        return (
          <li key={i.id} className={cx("plumb-element-li", "plumb-open-item")} data-kind={i.kind}>
            <Icon className={cx("plumb-open-icon")} aria-hidden />
            <div className={cx("plumb-element-div", "plumb-open-body")}>
              <div className={cx("plumb-element-div", "plumb-open-title")}>{i.title} <span className={cx("plumb-element-span", "plumb-open-kind")}>{t(`open_${i.kind}` as MessageKey)}</span></div>
              {i.detail && <div className={cx("plumb-element-div", "plumb-item-description")}>{i.detail}</div>}
              <div className={cx("plumb-element-div", "plumb-open-next")}><ArrowRight aria-hidden /> {i.nextStep}{i.owner && <> · {t("ownerIs", { owner: i.owner })}</>}{i.affects && <> · {t("affectsIs", { affects: i.affects })}</>}</div>
            </div>
            {onAction && <Button size="sm" variant="secondary" onPress={() => onAction(i)} aria-label={`${action}: ${i.title}`}>{action}</Button>}
          </li>
        );
      })}
    </ul>
  );
}
