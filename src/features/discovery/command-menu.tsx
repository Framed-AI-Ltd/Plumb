import { cx } from "../../lib/styles/classes";
// Finding, viewing, and bringing in information (F-S07, F-S13, F-S15, F-S17, F-C06, F-C20, F-H03, F-H12).
import {
ArrowRight,
ClipboardList,FileText,House,
Lock,
MessageCircleQuestion,Search,Sparkles
} from "../../lib/icons";
import { useEffect,useEffectEvent,useMemo,useState,useSyncExternalStore } from "react";
import {
Button as AriaButton,
Dialog as AriaDialog,
SearchField as AriaSearchField,
Autocomplete,
Header,
Input,
ListBox,
ListBoxItem,
ListBoxSection,
Modal,
ModalOverlay
} from "react-aria-components";
import { useMessages,type MessageKey } from "../../lib/locale";
import { SourceTag,type SourceTagProps } from "../domain";

/* ---------- Search and command menu (F-S13) ---------- */
export type ResultKind = "document" | "scope" | "decision" | "asset" | "answer" | "action";
export interface SearchResult {
  id: string;
  kind: ResultKind;
  title: string;
  snippet?: string;
  source?: SourceTagProps;
  revision?: string;
  visibility?: "private" | "shared";
}
export const resultIcons: Record<ResultKind, typeof FileText> = { document: FileText, scope: ClipboardList, decision: MessageCircleQuestion, asset: House, answer: Sparkles, action: ArrowRight };
export interface CommandMenuProps {
  results: SearchResult[];
  query: string;
  onQueryChange: (q: string) => void;
  onSelect: (result: SearchResult) => void;
  isLoading?: boolean;
  /** Results the viewer can't open under their permissions; counted, never shown. */
  hiddenCount?: number;
  /** Open with ⌘K / Ctrl+K. */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Visible trigger label; also the trigger's name on narrow screens. */
  triggerLabel?: string;
}
export const noSubscribe = () => () => {};
export const isApple = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
/** The platform's shortcut; the server renders the non-Apple label, so hydration may update it once. */
export function useShortcutLabel() {
  return useSyncExternalStore(noSubscribe, isApple, () => false) ? "⌘K" : "Ctrl K";
}
/** Permission-aware search across documents, scope, decisions and assets; also a ⌘K command palette. */
export function CommandMenu({ results, query, onQueryChange, onSelect, isLoading, hiddenCount, isOpen: controlled, onOpenChange, triggerLabel }: CommandMenuProps) {
  const { t, plural } = useMessages();
  const [own, setOwn] = useState(false);
  const isOpen = controlled ?? own;
  const setOpen = (o: boolean) => (onOpenChange ? onOpenChange(o) : setOwn(o));
  const openFromShortcut = useEffectEvent(() => setOpen(true));
  const shortcut = useShortcutLabel();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openFromShortcut(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const groups = useMemo(() => {
    const m = new Map<ResultKind, SearchResult[]>();
    results.forEach((r) => m.set(r.kind, [...(m.get(r.kind) ?? []), r]));
    return [...m];
  }, [results]);
  const label = triggerLabel ?? t("searchProject");
  return (
    <>
      <AriaButton className={cx("plumb-command-trigger plumb-focusable")} aria-keyshortcuts="Control+K Meta+K" onPress={() => setOpen(true)}>
        {/* The visible label is the name (WCAG 2.5.3); on narrow screens it is visually hidden but still read. */}
        <Search aria-hidden /> <span className={cx("plumb-element-span", "plumb-command-label")}>{label}</span> <kbd aria-hidden className={cx("plumb-element-kbd")}>{shortcut}</kbd>
      </AriaButton>
      <ModalOverlay className={cx("plumb-overlay plumb-command-overlay")} isDismissable isOpen={isOpen} onOpenChange={setOpen}>
        <Modal className={cx("plumb-modal plumb-command")}>
          <AriaDialog className={cx("plumb-dialog")} aria-label={t("search")}>
            <Autocomplete inputValue={query} onInputChange={onQueryChange}>
              <AriaSearchField aria-label={t("searchEverything")} className={cx("plumb-command-field")} autoFocus>
                <Search className={cx("plumb-search-icon")} aria-hidden />
                <Input className={cx("plumb-input")} placeholder={t("searchEverythingPlaceholder")} />
              </AriaSearchField>
              <ListBox className={cx("plumb-listbox plumb-command-list")} aria-label={t("results")} aria-busy={isLoading || undefined}
                onAction={(k) => { const r = results.find((x) => x.id === k); if (r) { onSelect(r); setOpen(false); } }}
                renderEmptyState={() => <div className={cx("plumb-element-div", "plumb-command-empty")} role="status">{isLoading ? t("searching") : query ? t("nothingMatches", { query }) : t("typeToSearch")}</div>}>
                {groups.map(([kind, rs]) => (
                  <ListBoxSection key={kind} className={cx("plumb-command-section")}>
                    <Header className={cx("plumb-command-header")}>{t(`result_${kind}` as MessageKey)}</Header>
                    {rs.map((r) => {
                      const Icon = resultIcons[r.kind];
                      return (
                        <ListBoxItem key={r.id} id={r.id} textValue={r.title} className={cx("plumb-item plumb-command-item")}>
                          <Icon aria-hidden />
                          <span className={cx("plumb-element-span", "plumb-command-text")}>
                            <span className={cx("plumb-element-span")}>{r.title}{r.revision && <span className={cx("plumb-element-span", "plumb-item-description")}> · {r.revision}</span>}</span>
                            {r.snippet && <span className={cx("plumb-element-span", "plumb-item-description")}>{r.snippet}</span>}
                            {r.source && <SourceTag {...r.source} />}
                          </span>
                          {r.visibility === "private" && <Lock aria-label={t("contractorOnly")} className={cx("plumb-command-lock")} />}
                        </ListBoxItem>
                      );
                    })}
                  </ListBoxSection>
                ))}
              </ListBox>
            </Autocomplete>
            {isLoading && results.length > 0 && <div className={cx("plumb-element-div", "plumb-command-foot")} role="status">{t("searching")}</div>}
            {hiddenCount ? <div className={cx("plumb-element-div", "plumb-command-foot")}>{plural("hiddenResults", hiddenCount)}</div> : null}
          </AriaDialog>
        </Modal>
      </ModalOverlay>
    </>
  );
}
