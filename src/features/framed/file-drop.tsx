import { cx } from "../../lib/styles/classes";
import {
FileUp
} from "../../lib/icons";
import { useState } from "react";
import {
Button as AriaButton,
DropZone,
FileTrigger
} from "react-aria-components";
import { useMessages } from "../../lib/locale";

/* ---------- File drop (F-C06, F-H03) ---------- */
export interface FileDropProps {
  onFiles: (files: File[]) => void;
  /** MIME types or extensions, e.g. ["application/pdf", "image/*", ".xlsx"]. Enforced for drops and the picker. */
  accept?: string[];
  /** Bytes. */
  maxSize?: number;
  onReject?: (files: File[], reason: "type" | "size") => void;
  hint?: string;
  isDisabled?: boolean;
}
export const matches = (f: File, accept?: string[]) =>
  !accept?.length || accept.some((a) => (a.startsWith(".") ? f.name.toLowerCase().endsWith(a.toLowerCase()) : a.endsWith("/*") ? f.type.startsWith(a.slice(0, -1)) : f.type === a));
/** Drop or choose plans, photos, notes, and quotes. Originals are kept as sources. Type and size are checked here;
 *  servers must check again, since a file's name and type are supplied by the browser. */
export function FileDrop({ onFiles, accept, maxSize, onReject, hint, isDisabled }: FileDropProps) {
  const [message, setMessage] = useState("");
  const { t, plural } = useMessages();
  const take = (files: File[]) => {
    const wrongType = files.filter((f) => !matches(f, accept));
    const tooBig = files.filter((f) => matches(f, accept) && maxSize !== undefined && f.size > maxSize);
    const ok = files.filter((f) => !wrongType.includes(f) && !tooBig.includes(f));
    if (wrongType.length) onReject?.(wrongType, "type");
    if (tooBig.length) onReject?.(tooBig, "size");
    const skipped = wrongType.length + tooBig.length;
    const why = [wrongType.length ? t("typeNotSupported") : "", tooBig.length ? t("tooLarge") : ""].filter(Boolean).join(", ");
    setMessage(skipped ? `${plural("filesSkipped", skipped)} (${why}).` : ok.length ? plural("filesAdded", ok.length) : "");
    if (ok.length) onFiles(ok);
  };
  const fromDrop = async (items: { kind: string; getFile?: () => Promise<File> }[]) =>
    take(await Promise.all(items.filter((i) => i.kind === "file" && i.getFile).map((i) => i.getFile!())));
  return (
    <DropZone className={cx("plumb-drop")} isDisabled={isDisabled} onDrop={(e) => fromDrop(e.items as never)} getDropOperation={() => "copy"}>
      <span className={cx("plumb-element-span", "plumb-drop-icon")} aria-hidden><FileUp /></span>
      <div className={cx("plumb-element-div", "plumb-drop-title")}><span className={cx("plumb-element-span", "plumb-drop-title-desktop")}>{t("dropFiles")}</span><span className={cx("plumb-element-span", "plumb-drop-title-mobile")}>{t("addFiles")}</span></div>
      <div className={cx("plumb-element-div", "plumb-item-description")}>{hint ?? t("dropFilesHint")}</div>
      <FileTrigger allowsMultiple acceptedFileTypes={accept} onSelect={(list) => list && take([...list])}>
        <AriaButton className={cx("plumb-button plumb-focusable")} data-variant="secondary" data-size="sm" isDisabled={isDisabled}>{t("chooseFiles")}</AriaButton>
      </FileTrigger>
      <span role="status" className={cx("plumb-element-span", "plumb-item-description")}>{message}</span>
    </DropZone>
  );
}
