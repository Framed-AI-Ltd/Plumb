import { cx } from "../../lib/styles/classes";
// Finding, viewing, and bringing in information (F-S07, F-S13, F-S15, F-S17, F-C06, F-C20, F-H03, F-H12).
import {
ChevronLeft,ChevronRight,
X
} from "../../lib/icons";
import { useEffect,useEffectEvent } from "react";
import {
Dialog as AriaDialog,
Heading as AriaHeading,
Modal,
ModalOverlay
} from "react-aria-components";
import { IconButton } from "../../lib/actions";
import { DateTime,useMessages } from "../../lib/locale";
import { MediaImage } from "./media-image";
import type { MediaItem } from "./types";

/** Full-screen photo viewer with previous/next (also ←/→); returns focus on close. */
export function Lightbox({ items, index, onIndexChange }: { items: MediaItem[]; index: number | null; onIndexChange: (i: number | null) => void }) {
  const { t } = useMessages();
  const item = index === null ? null : items[index];
  const go = (d: number) => index !== null && onIndexChange((index + d + items.length) % items.length);
  const step = useEffectEvent((d: number) => go(d));
  const isOpen = index !== null;
  // ←/→ page through photos wherever focus is inside the lightbox.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);
  return (
    <ModalOverlay className={cx("plumb-overlay plumb-lightbox-overlay")} isDismissable isOpen={isOpen} onOpenChange={(o) => !o && onIndexChange(null)}>
      <Modal className={cx("plumb-lightbox")}>
        <AriaDialog className={cx("plumb-lightbox-dialog")} aria-label={item?.alt ?? t("photo")}>
          {({ close }) => item && (
            <div className={cx("plumb-element-div", "plumb-lightbox-body")}>
              <div className={cx("plumb-element-div", "plumb-lightbox-bar")}>
                <AriaHeading slot="title" className={cx("plumb-lightbox-title")}>{item.alt}</AriaHeading>
                <span className={cx("plumb-element-span", "plumb-lightbox-count")}>{t("nOfTotal", { n: (index ?? 0) + 1, total: items.length })}</span>
                <IconButton label={t("close")} icon={<X />} onPress={close} />
              </div>
              <MediaImage src={item.src} alt={item.alt} className={cx("plumb-lightbox-img")} />
              <div className={cx("plumb-element-div", "plumb-lightbox-bar")}>
                <IconButton label={t("previousPhoto")} icon={<ChevronLeft />} onPress={() => go(-1)} />
                <span className={cx("plumb-element-span", "plumb-lightbox-meta")}>{item.generated && <>{t("generatedBy", { by: item.generated.by })} · </>}{[item.room, item.source].filter(Boolean).join(" · ")}{item.takenAt && <> · <DateTime value={item.takenAt} /></>}</span>
                <IconButton label={t("nextPhoto")} icon={<ChevronRight />} onPress={() => go(1)} />
              </div>
            </div>
          )}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}
