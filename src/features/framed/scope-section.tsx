import { cx } from "../../lib/styles/classes";
import {
TriangleAlert
} from "../../lib/icons";
import { Badge } from "../../lib/feedback";
import { useMessages } from "../../lib/locale";
import { Disclosure } from "../../lib/structure";
import { Money } from "../domain";

/* ---------- Scope section (F-C13) ---------- */
export interface ScopeSectionProps {
  title: string;
  total: number | null;
  inclusions: string[];
  exclusions?: string[];
  assumptions?: string[];
  openQuestions?: number;
  defaultExpanded?: boolean;
}
/** A room or trade package with inclusions, exclusions, assumptions, and open questions (read view; edit with ScopeItemEditor). */
export function ScopeSection({ title, total, inclusions, exclusions = [], assumptions = [], openQuestions = 0, defaultExpanded }: ScopeSectionProps) {
  const { t, plural } = useMessages();
  const list = (label: string, items: string[], kind: string) =>
    items.length > 0 && (
      <div className={cx("plumb-element-div", "plumb-scope-list")} data-kind={kind}>
        <div className={cx("plumb-element-div", "plumb-scope-list-title")}>{label}</div>
        <ul className={cx("plumb-element-ul")}>{items.map((i) => <li key={i} className={cx("plumb-element-li")}>{i}</li>)}</ul>
      </div>
    );
  return (
    <Disclosure
      title={title}
      defaultExpanded={defaultExpanded}
      aside={<><span className={cx("plumb-element-span", "plumb-slot-badge")}>{openQuestions > 0 && <Badge tone="warning" icon={<TriangleAlert aria-hidden />}>{plural("openCount", openQuestions)}</Badge>}</span><span className={cx("plumb-element-span", "plumb-slot-amount")}><Money amount={total} emphasis="strong" /></span></>}
    >
      <div className={cx("plumb-element-div", "plumb-scope-grid")}>
        {list(t("scope_inclusion"), inclusions, "in")}
        {list(t("scope_exclusion"), exclusions, "out")}
        {list(t("scope_assumption"), assumptions, "assume")}
      </div>
    </Disclosure>
  );
}
