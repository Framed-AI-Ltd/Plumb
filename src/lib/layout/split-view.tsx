import { ChevronLeft } from "../icons";
import { useEffect,useRef,type HTMLAttributes,type ReactNode } from "react";
import { Button } from "../actions";
import { cx } from "../cx";
import { useMessages } from "../locale";
import { useMediaQuery } from "./use-media-query";

export interface SplitViewProps extends HTMLAttributes<HTMLDivElement> {
  /** The list or navigation pane (e.g. a NavList). */
  list: ReactNode;
  /** The selected item. */
  detail: ReactNode;
  /** Below 960px only one pane shows: the detail when something is selected, otherwise the list. */
  showDetail?: boolean;
  /** Below 960px, a back button above the detail calls this (usually clearing the selection). */
  onBack?: () => void;
  listLabel?: string;
  detailLabel?: string;
}
/**
 * List and detail side by side (inbox, documents, punch list); one pane at a time below 960px. On narrow screens,
 * opening an item moves focus to the detail, and going back returns focus to the list.
 */
export function SplitView({ list, detail, showDetail, onBack, listLabel, detailLabel, className, ...props }: SplitViewProps) {
  const { t } = useMessages();
  const listRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const narrow = useMediaQuery("(max-width: 960px)");
  const shown = useRef(showDetail);
  useEffect(() => {
    // Only a change of selection moves focus; resizing across the breakpoint never does.
    if (shown.current === showDetail) return;
    shown.current = showDetail;
    if (!narrow) return;
    // The other pane just disappeared; focus would otherwise fall to the page.
    const target = showDetail ? detailRef.current : listRef.current?.querySelector<HTMLElement>("[aria-selected=true], [aria-current], [tabindex='0']") ?? listRef.current;
    target?.focus();
  }, [showDetail, narrow]);
  return (
    <div {...props} className={cx("plumb-element-div", cx("plumb-split", className))} data-show={showDetail ? "detail" : "list"}>
      <section ref={listRef} className={cx("plumb-element-section", "plumb-split-list")} aria-label={listLabel} tabIndex={-1}>{list}</section>
      <section ref={detailRef} className={cx("plumb-element-section", "plumb-split-detail")} aria-label={detailLabel} tabIndex={-1}>
        {onBack && <div className={cx("plumb-element-div", "plumb-split-back")}><Button size="sm" variant="ghost" icon={<ChevronLeft />} onPress={onBack}>{t("backToList")}</Button></div>}
        {detail}
      </section>
    </div>
  );
}
