import { cx } from "../../lib/styles/classes";
// Truth primitives: unknowns, money, quantities, sources, lifecycle, visibility, and AI drafts.
import {
CircleCheck,
CircleDashed,
FileText
} from "../../lib/icons";
import { DateTime,useMessages } from "../../lib/locale";

export interface SourceTagProps {
  source: string;
  /** Date or ISO string (preferred); free text is shown as given. */
  date?: Date | string;
  verified?: boolean;
}
/** Provenance for a fact: where it came from, when, and whether it is verified. */
export function SourceTag({ source, date, verified }: SourceTagProps) {
  const { t } = useMessages();
  return (
    <span className={cx("plumb-element-span", "plumb-source")} data-verified={verified || undefined}>
      <FileText aria-hidden />
      <span className={cx("plumb-element-span")}>
        {source}
        {date && <> · <DateTime value={date} format="short" /></>}
      </span>
      {verified ? (
        <span className={cx("plumb-element-span", "plumb-source-status plumb-source-check")}>· <CircleCheck aria-hidden />{t("verified")}</span>
      ) : (
        <span className={cx("plumb-element-span", "plumb-source-status")}>· <CircleDashed aria-hidden />{t("unverified")}</span>
      )}
    </span>
  );
}
