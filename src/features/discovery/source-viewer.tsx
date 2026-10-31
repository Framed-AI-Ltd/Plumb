// Finding, viewing, and bringing in information (F-S07, F-S13, F-S15, F-S17, F-C06, F-C20, F-H03, F-H12).
import {
ChevronLeft,ChevronRight,
FileText,
Maximize,
ZoomIn,ZoomOut
} from "../../lib/icons";
import { useRef,useState,type PointerEvent as ReactPointerEvent } from "react";
import {
Button as AriaButton
} from "react-aria-components";
import { IconButton } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { Badge } from "../../lib/feedback";
import { DateTime,useMessages } from "../../lib/locale";

/* ---------- Source viewer (F-S07, F-C06, F-C09, F-H10) ---------- */
export interface SourceHighlight { factId: string; page: number; label: string; /** Fractions of the page: x, y, width, height (0–1). */ rect: [number, number, number, number] }
export interface SourceViewerProps {
  title: string;
  /** One image URL per page (rendered PDF pages, drawings, or photos). */
  pages: string[];
  highlights?: SourceHighlight[];
  activeFactId?: string;
  onFactSelect?: (factId: string) => void;
  revision?: string;
  date?: Date | string;
  className?: string;
}
export const zooms = [1, 1.5, 2, 3, 4];
/**
 * Shows exactly where a fact came from: the page, with the fact highlighted. Page with the buttons or PageUp/PageDown
 * (←/→ at fit). Zoom with the buttons or +/−/0; when zoomed, drag or use the arrow keys to pan.
 */
export function SourceViewer({ title, pages, highlights = [], activeFactId, onFactSelect, revision, date, className }: SourceViewerProps) {
  const { t } = useMessages();
  const activePage = highlights.find((h) => h.factId === activeFactId)?.page ?? 1;
  const [page, setPage] = useState(activePage);
  const [seenPage, setSeenPage] = useState(activePage);
  if (seenPage !== activePage) { setSeenPage(activePage); setPage(activePage); }
  const [zoom, setZoom] = useState(0);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const onPage = highlights.filter((h) => h.page === page);
  const turn = (d: number) => setPage((p) => Math.min(pages.length, Math.max(1, p + d)));
  const zoomBy = (d: number) => setZoom((z) => Math.min(zooms.length - 1, Math.max(0, z + d)));
  const pan = {
    onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!zoom || e.button !== 0 || (e.target as Element).closest("button")) return;
      const el = e.currentTarget;
      drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop };
      el.setPointerCapture(e.pointerId);
    },
    onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d) return;
      e.currentTarget.scrollLeft = d.left - (e.clientX - d.x);
      e.currentTarget.scrollTop = d.top - (e.clientY - d.y);
    },
    onPointerUp: () => { drag.current = null; },
  };
  return (
    // Keys bubble up from the toolbar buttons and the focusable page region; the section only delegates them.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section className={cx("plumb-element-section", cx("plumb-source-viewer", className))} aria-label={t("pageOf", { title, page, total: pages.length })}
      onKeyDown={(e) => {
        if ((e.target as Element).closest("input, textarea, select")) return;
        if (e.key === "+" || e.key === "=") zoomBy(1);
        else if (e.key === "-") zoomBy(-1);
        else if (e.key === "0") setZoom(0);
        else if (e.key === "PageDown" || (!zoom && e.key === "ArrowRight")) turn(1);
        else if (e.key === "PageUp" || (!zoom && e.key === "ArrowLeft")) turn(-1);
        else return;
        e.preventDefault();
      }}>
      <div className={cx("plumb-element-div", "plumb-source-viewer-bar")}>
        <FileText aria-hidden />
        <span className={cx("plumb-element-span", "plumb-label")}>{title}</span>
        <span className={cx("plumb-element-span", "plumb-item-description")}>{revision && `${revision} · `}{date && <DateTime value={date} />}</span>
        <span className={cx("plumb-element-span", "plumb-source-viewer-tools")}>
          <IconButton size="sm" label={t("zoomOut")} icon={<ZoomOut />} isDisabled={zoom === 0} onPress={() => zoomBy(-1)} />
          <span className={cx("plumb-element-span", "plumb-num plumb-source-zoom")} aria-live="polite">{Math.round(zooms[zoom] * 100)}%</span>
          <IconButton size="sm" label={t("zoomIn")} icon={<ZoomIn />} isDisabled={zoom === zooms.length - 1} onPress={() => zoomBy(1)} />
          <IconButton size="sm" label={t("fitPage")} icon={<Maximize />} isDisabled={zoom === 0} onPress={() => setZoom(0)} />
        </span>
        <span className={cx("plumb-element-span", "plumb-source-viewer-pager")}>
          <IconButton size="sm" label={t("previousPage")} icon={<ChevronLeft />} isDisabled={page <= 1} onPress={() => turn(-1)} />
          <span aria-live="polite" className={cx("plumb-element-span")}>{t("pageNOfTotal", { page, total: pages.length })}</span>
          <IconButton size="sm" label={t("nextPage")} icon={<ChevronRight />} isDisabled={page >= pages.length} onPress={() => turn(1)} />
        </span>
      </div>
      {/* Zoomed pages scroll inside this region; it takes focus so arrow keys pan. */}
      <div className={cx("plumb-element-div", "plumb-source-scroll")} data-zoomed={zoom > 0 || undefined} tabIndex={zoom ? 0 : undefined}
        role={zoom ? "region" : undefined} aria-label={zoom ? t("zoomedPage") : undefined} {...pan}>
        <div className={cx("plumb-element-div", "plumb-source-page")} style={{ inlineSize: `${zooms[zoom] * 100}%` }}>
          <img src={pages[page - 1]} alt={t("pageOfImage", { title, page })} draggable={false} className={cx("plumb-element-img")} />
          {onPage.map((h) => (
            <AriaButton key={h.factId} className={cx("plumb-source-mark plumb-focusable")} data-active={h.factId === activeFactId || undefined}
              style={{ insetInlineStart: `${h.rect[0] * 100}%`, insetBlockStart: `${h.rect[1] * 100}%`, inlineSize: `${h.rect[2] * 100}%`, blockSize: `${h.rect[3] * 100}%` }}
              aria-label={t("sourceOf", { label: h.label })} onPress={() => onFactSelect?.(h.factId)} />
          ))}
        </div>
      </div>
      {onPage.length > 0 && (
        <ul className={cx("plumb-element-ul", "plumb-source-facts")} aria-label={t("factsOnPage")}>
          {onPage.map((h) => <li key={h.factId} className={cx("plumb-element-li")}><Badge tone={h.factId === activeFactId ? "accent" : "neutral"}>{h.label}</Badge></li>)}
        </ul>
      )}
    </section>
  );
}
