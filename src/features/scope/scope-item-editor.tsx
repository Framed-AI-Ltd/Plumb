import { cx } from "../../lib/styles/classes";
// Editable scope and the rate library (F-C05, F-C13, F-C14, F-C16, F-C20, F-C21, F-C25, F-S19).
import { ArrowDown,ArrowUp,Check,GripVertical,Library,Pencil,Plus,Sparkles,Trash2,X } from "../../lib/icons";
import { useRef,useState,type DragEvent } from "react";
import { Button,IconButton } from "../../lib/actions";
import { Badge } from "../../lib/feedback";
import { Select,TextArea } from "../../lib/fields";
import { useMessages,type MessageKey } from "../../lib/locale";
import { Menu } from "../../lib/overlays";
import { SourceTag,type SourceTagProps } from "../domain";
import { Provenance,type ProvenanceKind } from "../framed";
import { scopeItemKinds } from "./scope-item-kinds";
import type { ScopeItemKind } from "./types";

export interface ScopeItem {
  id: string;
  text: string;
  kind: ScopeItemKind;
  /** Where the item came from: a document, a site visit, a template. */
  source?: SourceTagProps;
  provenance?: ProvenanceKind;
  /** Proposed by the assistant or a template; stays dashed until a person accepts it. */
  draft?: boolean;
}
export interface ScopeTemplate { id: string; name: string; items: Pick<ScopeItem, "text" | "kind">[] }
export interface ScopeItemEditorProps {
  "aria-label": string;
  items: ScopeItem[];
  onItemsChange: (items: ScopeItem[]) => void;
  /** Reviewed work packages and checklists that can be inserted (F-C16). Inserted items arrive as drafts. */
  templates?: ScopeTemplate[];
  /** Creates ids for new items; defaults to `crypto.randomUUID()`. */
  createId?: () => string;
  isReadOnly?: boolean;
}
/**
 * Inclusions, exclusions, assumptions, and open questions for a room or trade package: add, edit, reorder (move
 * buttons, or drag), change kind, accept drafts, and insert saved templates. Every item can carry its source.
 */
export function ScopeItemEditor({ items, onItemsChange, templates = [], createId, isReadOnly, ...aria }: ScopeItemEditorProps) {
  const { t, plural } = useMessages();
  const newId = createId ?? (() => crypto.randomUUID());
  const [editing, setEditing] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const focus = (selector: string) => requestAnimationFrame(() => listRef.current?.querySelector<HTMLElement>(selector)?.focus());
  const update = (id: string, patch: Partial<ScopeItem>) => onItemsChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const remove = (item: ScopeItem) => {
    const siblings = items.filter((i) => i.kind === item.kind);
    const next = siblings[siblings.indexOf(item) + 1] ?? siblings[siblings.indexOf(item) - 1];
    onItemsChange(items.filter((i) => i.id !== item.id));
    focus(next ? `[data-item="${next.id}"] [data-edit]` : `[data-add="${item.kind}"]`);
  };
  // Moves within the same kind, keeping every other item where it is.
  const move = (item: ScopeItem, by: number, to?: string) => {
    const siblings = items.filter((i) => i.kind === item.kind);
    const from = siblings.indexOf(item);
    const target = to ? siblings.findIndex((i) => i.id === to) : from + by;
    if (target < 0 || target >= siblings.length || target === from) return;
    const reordered = [...siblings];
    reordered.splice(from, 1);
    reordered.splice(target, 0, item);
    let k = 0;
    onItemsChange(items.map((i) => (i.kind === item.kind ? reordered[k++] : i)));
    if (!to) focus(`[data-item="${item.id}"] [data-move="${by < 0 ? "up" : "down"}"]`);
  };
  const add = (kind: ScopeItemKind) => {
    const id = newId();
    onItemsChange([...items, { id, kind, text: "" }]);
    setEditing(id);
  };
  const insertTemplate = (templateId: string) => {
    const tpl = templates.find((x) => x.id === templateId);
    if (!tpl) return;
    onItemsChange([...items, ...tpl.items.map((x) => ({ ...x, id: newId(), draft: true, source: { source: tpl.name } }))]);
  };
  return (
    <section className={cx("plumb-element-section", "plumb-scope-editor")} aria-label={aria["aria-label"]}>
      {!isReadOnly && templates.length > 0 && (
        <div className={cx("plumb-element-div", "plumb-scope-editor-bar")}>
          <Menu aria-label={t("insertTemplate")} placement="bottom start" trigger={<Button size="sm" variant="secondary" icon={<Library />}>{t("insertTemplate")}</Button>}
            items={templates.map((x) => ({ id: x.id, label: x.name, description: plural("itemsCount", x.items.length) }))} onAction={(k) => insertTemplate(String(k))} />
        </div>
      )}
      <div ref={listRef} className={cx("plumb-element-div", "plumb-scope-editor-groups")}>
        {scopeItemKinds.map((kind) => {
          const group = items.filter((i) => i.kind === kind);
          if (isReadOnly && !group.length) return null;
          return (
            <div key={kind} className={cx("plumb-element-div", "plumb-scope-editor-group")} data-kind={kind}>
              <h3 className={cx("plumb-element-h3", "plumb-scope-list-title")}>{t(`scope_${kind}` as MessageKey)}</h3>
              <ul className={cx("plumb-element-ul", "plumb-scope-editor-list")} aria-label={t(`scope_${kind}` as MessageKey)}>
                {group.map((item, index) => (
                  <ScopeRow key={item.id} item={item} index={index} count={group.length} isReadOnly={isReadOnly}
                    isEditing={editing === item.id} isDragging={dragging === item.id}
                    onEdit={() => setEditing(item.id)}
                    onDone={(patch) => {
                      if (patch === null && !item.text) { remove(item); setEditing(null); return; }
                      if (patch) update(item.id, patch);
                      setEditing(null);
                      focus(`[data-item="${item.id}"] [data-edit]`);
                    }}
                    onRemove={() => remove(item)} onMove={(by) => move(item, by)}
                    onAccept={() => { update(item.id, { draft: false }); focus(`[data-item="${item.id}"] [data-edit]`); }}
                    drag={{
                      draggable: !isReadOnly,
                      onDragStart: (e: DragEvent) => { setDragging(item.id); e.dataTransfer.effectAllowed = "move"; },
                      onDragEnd: () => setDragging(null),
                      onDragOver: (e: DragEvent) => { if (dragging && items.find((i) => i.id === dragging)?.kind === kind) e.preventDefault(); },
                      onDrop: (e: DragEvent) => { e.preventDefault(); const d = items.find((i) => i.id === dragging); if (d) move(d, 0, item.id); setDragging(null); },
                    }} />
                ))}
                {!group.length && <li className={cx("plumb-element-li", "plumb-item-description")}>{t("noneYet")}</li>}
              </ul>
              {!isReadOnly && <Button size="sm" variant="ghost" icon={<Plus />} data-add={kind} onPress={() => add(kind)}>{t(`add_${kind}` as MessageKey)}</Button>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
export interface ScopeRowProps {
  item: ScopeItem;
  index: number;
  count: number;
  isReadOnly?: boolean;
  isEditing: boolean;
  isDragging: boolean;
  onEdit: () => void;
  /** `null` cancels; a patch saves. */
  onDone: (patch: Partial<ScopeItem> | null) => void;
  onRemove: () => void;
  onMove: (by: number) => void;
  onAccept: () => void;
  drag: Record<string, unknown>;
}
export function ScopeRow({ item, index, count, isReadOnly, isEditing, isDragging, onEdit, onDone, onRemove, onMove, onAccept, drag }: ScopeRowProps) {
  const { t } = useMessages();
  const label = item.text || t("untitledItem");
  // A fresh editor per edit session starts from the item's current text, never from a cancelled draft.
  if (isEditing) return <ScopeRowEditor item={item} onDone={onDone} />;
  return (
    <li className={cx("plumb-element-li", "plumb-scope-row")} data-item={item.id} data-draft={item.draft || undefined} data-dragging={isDragging || undefined} {...drag}>
      {!isReadOnly && <span className={cx("plumb-element-span", "plumb-scope-grip")} aria-hidden><GripVertical /></span>}
      <div className={cx("plumb-element-div", "plumb-scope-row-body")}>
        <span className={cx("plumb-element-span", "plumb-scope-text")}>{item.text || <span className={cx("plumb-element-span", "plumb-text")} data-tone="muted">{t("untitledItem")}</span>}</span>
        {(item.draft || item.source || item.provenance) && (
          <span className={cx("plumb-element-span", "plumb-scope-meta")}>
            {item.draft && <Badge tone="accent" variant="dashed" icon={<Sparkles aria-hidden />}>{t("draft")}</Badge>}
            {item.provenance && <Provenance kind={item.provenance} />}
            {item.source && <SourceTag {...item.source} />}
          </span>
        )}
      </div>
      {!isReadOnly && (
        <span className={cx("plumb-element-span", "plumb-scope-actions")}>
          {item.draft && <Button size="sm" variant="soft" icon={<Check />} onPress={onAccept} aria-label={t("acceptName", { name: label })}>{t("accept")}</Button>}
          <IconButton size="sm" data-move="up" label={t("moveUp", { name: label })} icon={<ArrowUp />} isDisabled={index === 0} onPress={() => onMove(-1)} />
          <IconButton size="sm" data-move="down" label={t("moveDown", { name: label })} icon={<ArrowDown />} isDisabled={index === count - 1} onPress={() => onMove(1)} />
          <IconButton size="sm" data-edit label={t("editName", { name: label })} icon={<Pencil />} onPress={onEdit} />
          <IconButton size="sm" label={t("removeName", { name: label })} icon={item.draft ? <X /> : <Trash2 />} onPress={onRemove} />
        </span>
      )}
    </li>
  );
}
export function ScopeRowEditor({ item, onDone }: Pick<ScopeRowProps, "item" | "onDone">) {
  const { t } = useMessages();
  const [text, setText] = useState(item.text);
  const [kind, setKind] = useState<ScopeItemKind>(item.kind);
  return (
      <li className={cx("plumb-element-li", "plumb-scope-row")} data-item={item.id} data-editing>
        {/* Esc and Enter bubble up from the text area; the form only delegates them. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <form className={cx("plumb-element-form", "plumb-scope-edit")} onSubmit={(e) => { e.preventDefault(); if (text.trim()) onDone({ text: text.trim(), kind }); }}
          onKeyDown={(e) => {
            if (e.key === "Escape") { e.preventDefault(); onDone(null); }
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && (e.target as Element).tagName === "TEXTAREA") { e.preventDefault(); if (text.trim()) onDone({ text: text.trim(), kind }); }
          }}>
          <TextArea label={t("itemText")} value={text} onChange={setText} autoFocus description={t("scopeEditHelp")} />
          <Select label={t("kind")} size="sm" options={scopeItemKinds.map((k) => ({ id: k, label: t(`scope_${k}` as MessageKey) }))} selectedKey={kind} onSelectionChange={(k) => setKind(k as ScopeItemKind)} />
          <div className={cx("plumb-element-div", "plumb-inline plumb-actions")}>
            <Button type="submit" size="sm" variant="primary" icon={<Check />} isDisabled={!text.trim()}>{t("save")}</Button>
            <Button size="sm" variant="ghost" onPress={() => onDone(null)}>{t("cancel")}</Button>
          </div>
        </form>
      </li>
  );
}
