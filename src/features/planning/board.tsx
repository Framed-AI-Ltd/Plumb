// Delivering the work: schedules, selections, bid levelling, budgets, proposal status, offline sync
// (F-C04, F-C24, F-C33, F-C35, F-C43, F-C51, F-H30, F-H36, F-S16, F-C47).
import { ArrowRightLeft } from "../../lib/icons";
import { useId,useRef,useState,type ReactNode } from "react";
import { Button as AriaButton } from "react-aria-components";
import { IconButton } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { useMessages } from "../../lib/locale";
import { Menu } from "../../lib/overlays";

/* ---------- Board (F-C04, F-M14) ---------- */
export interface BoardCard { id: string; column: string; title: string; meta?: ReactNode }
export interface BoardProps {
  "aria-label": string;
  columns: { id: string; label: string }[];
  cards: BoardCard[];
  /** Move a card to another column. Every card also has a "Move to" menu, so moving never needs dragging. */
  onMove: (cardId: string, columnId: string) => void;
  onOpen?: (card: BoardCard) => void;
  /** Heading level of the column titles, to match the page outline. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}
/** Leads or requests in stages (new → qualifying → bidding → won/lost). Drag between columns, or use "Move to". */
export function Board({ columns, cards, onMove, onOpen, headingLevel = 3, className, ...aria }: BoardProps) {
  const H = `h${headingLevel}` as const;
  const { t } = useMessages();
  const boardId = useId();
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const move = (card: BoardCard, columnId: string) => {
    onMove(card.id, columnId);
    setAnnouncement(t("movedTo", { name: card.title, column: columns.find((x) => x.id === columnId)?.label ?? "" }));
    // The card remounts in its new column; keep keyboard focus on it.
    setTimeout(() => rootRef.current?.querySelector<HTMLElement>(`[data-card="${CSS.escape(card.id)}"] button`)?.focus(), 0);
  };
  return (
    <div ref={rootRef} className={cx("plumb-element-div", cx("plumb-board", className))} role="group" aria-label={aria["aria-label"]}>
      <span className={cx("plumb-element-span", "plumb-sr-only")} role="status">{announcement}</span>
      {columns.map((col) => {
        const list = cards.filter((c) => c.column === col.id);
        return (
          <div key={col.id} className={cx("plumb-element-div", "plumb-board-column")} role="group" aria-labelledby={`${boardId}-${col.id}`} data-over={over === col.id || undefined}
            onDragOver={(e) => { if (dragging) { e.preventDefault(); setOver(col.id); } }} onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOver(null); }}
            onDrop={(e) => { e.preventDefault(); const card = cards.find((c) => c.id === dragging); if (card && card.column !== col.id) move(card, col.id); setDragging(null); setOver(null); }}>
            <H className={cx("plumb-board-title")} id={`${boardId}-${col.id}`}>{col.label} <span className={cx("plumb-element-span", "plumb-navlink-count")}>{list.length}</span></H>
            <ul className={cx("plumb-element-ul", "plumb-board-cards")}>
              {list.map((c) => (
                <li key={c.id} data-card={c.id} className={cx("plumb-element-li", "plumb-board-card")} draggable onDragStart={(e) => { e.dataTransfer.setData("text/plain", c.id); e.dataTransfer.effectAllowed = "move"; setDragging(c.id); }} onDragEnd={() => { setDragging(null); setOver(null); }} data-dragging={dragging === c.id || undefined}>
                  {onOpen ? <AriaButton className={cx("plumb-board-card-title plumb-focusable")} onPress={() => onOpen(c)}>{c.title}</AriaButton> : <span className={cx("plumb-element-span", "plumb-board-card-title")}>{c.title}</span>}
                  {c.meta && <div className={cx("plumb-element-div", "plumb-item-description")}>{c.meta}</div>}
                  <Menu aria-label={t("moveTo")} placement="bottom end" trigger={<IconButton size="sm" label={t("moveName", { name: c.title })} icon={<ArrowRightLeft />} />}
                    items={columns.filter((x) => x.id !== c.column).map((x) => ({ id: x.id, label: x.label }))} onAction={(k) => move(c, String(k))} />
                </li>
              ))}
              {!list.length && <li className={cx("plumb-element-li", "plumb-item-description plumb-board-empty")}>{t("noneYet")}</li>}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
