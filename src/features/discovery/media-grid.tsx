// Finding, viewing, and bringing in information (F-S07, F-S13, F-S15, F-S17, F-C06, F-C20, F-H03, F-H12).
import {
Check,
ImageOff,
Sparkles
} from "../../lib/icons";
import { useState,type ReactNode } from "react";
import {
GridList,
GridListItem,
type Key
} from "react-aria-components";
import { cx } from "../../lib/cx";
import { EmptyState } from "../../lib/feedback";
import { Checkbox } from "../../lib/fields";
import { DateTime,useMessages } from "../../lib/locale";
import { Lightbox } from "./lightbox";
import { MediaImage } from "./media-image";
import type { MediaItem } from "./types";

export interface MediaGridProps {
  "aria-label": string;
  items: MediaItem[];
  selectionMode?: "none" | "multiple";
  selectedKeys?: Iterable<Key>;
  onSelectionChange?: (keys: Set<Key>) => void;
  /** Shown when there are no photos, e.g. with an action to add some. */
  emptyState?: ReactNode;
  className?: string;
}
/** Photo grid with arrow-key navigation; opening a photo shows a lightbox that returns focus to it on close.
 *  With selection on, each photo has a checkbox (selection is never shown by colour alone). */
export function MediaGrid({ items, selectionMode = "none", selectedKeys, onSelectionChange, emptyState, className, ...aria }: MediaGridProps) {
  const { t } = useMessages();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <GridList {...aria} items={items} layout="grid" className={cx("plumb-media-grid", className)} selectionMode={selectionMode} selectedKeys={selectedKeys}
        onSelectionChange={(k) => onSelectionChange?.(k === "all" ? new Set(items.map((i) => i.id)) : new Set(k))}
        onAction={(k) => setOpen(items.findIndex((i) => i.id === k))}
        renderEmptyState={() => emptyState ?? <EmptyState icon={<ImageOff />} title={t("noPhotos")} />}>
        {(item) => (
          <GridListItem id={item.id} textValue={item.alt} className={cx("plumb-media-item")}>
            {({ selectionMode: mode, isSelected }) => (
              <>
                <MediaImage src={item.src} alt={item.alt} />
                {mode !== "none" && <span className={cx("plumb-element-span", "plumb-media-select")}><Checkbox slot="selection" aria-label={t("selectName", { name: item.alt })} /></span>}
                {isSelected && <span className={cx("plumb-element-span", "plumb-media-selected")} aria-hidden><Check /></span>}
                {item.generated && <span className={cx("plumb-element-span", "plumb-media-generated")}><Sparkles aria-hidden />{t("generatedImage")}</span>}
                <span className={cx("plumb-element-span", "plumb-media-caption")}>{item.room ?? item.alt}{item.takenAt && <> · <DateTime value={item.takenAt} format="short" /></>}</span>
              </>
            )}
          </GridListItem>
        )}
      </GridList>
      <Lightbox items={items} index={open} onIndexChange={setOpen} />
    </>
  );
}
