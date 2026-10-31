import { ChevronLeft,ChevronRight } from "../icons";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "../cx";
import { useMessages,useNumberFormat } from "../locale";

export interface PaginationProps {
  /** 1-based. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Names what is paged, e.g. "Rate library pages". */
  "aria-label"?: string;
  className?: string;
}
/** Page through long server-side lists (admin, rate libraries, marketplace results). Shows first, last, and nearby pages. */
export function Pagination({ page, pageCount, onPageChange, "aria-label": label, className }: PaginationProps) {
  const { t } = useMessages();
  const nf = useNumberFormat();
  if (pageCount <= 1) return null;
  const near = [1, page - 1, page, page + 1, pageCount].filter((p, i, a) => p >= 1 && p <= pageCount && a.indexOf(p) === i).sort((a, b) => a - b);
  const items = near.flatMap((p, i) => (i && p - near[i - 1] > 1 ? [null, p] : [p]));
  return (
    <nav className={cx("plumb-element-nav", cx("plumb-pagination", className))} aria-label={label ?? t("pagination")}>
      <AriaButton className={cx("plumb-button plumb-focusable")} data-variant="ghost" data-size="sm" isDisabled={page <= 1} onPress={() => onPageChange(page - 1)}>
        <ChevronLeft aria-hidden />{t("previous")}
      </AriaButton>
      <ol className={cx("plumb-element-ol", "plumb-pagination-pages")}>
        {items.map((p, i) => p === null
          ? <li key={`gap${i}`} aria-hidden className={cx("plumb-element-li", "plumb-pagination-gap")}>…</li>
          : (
            <li key={p} className={cx("plumb-element-li")}>
              <AriaButton className={cx("plumb-button plumb-focusable plumb-page-button")} data-variant={p === page ? "soft" : "ghost"} data-size="sm"
                aria-current={p === page ? "page" : undefined} aria-label={t("pageN", { page: nf.format(p) })} onPress={() => onPageChange(p)}>{nf.format(p)}</AriaButton>
            </li>
          ))}
      </ol>
      <AriaButton className={cx("plumb-button plumb-focusable")} data-variant="ghost" data-size="sm" isDisabled={page >= pageCount} onPress={() => onPageChange(page + 1)}>
        {t("next")}<ChevronRight aria-hidden />
      </AriaButton>
    </nav>
  );
}
