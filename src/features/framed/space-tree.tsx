import { styleIcon } from "../../lib/icons";
import { cx } from "../../lib/styles/classes";
import { ChevronRight } from "../../lib/icons";
import { type ReactNode } from "react";
import { Button as AriaButton, Tree, TreeItem, TreeItemContent, type Key } from "react-aria-components";
/* ---------- Space tree (F-S05, F-H02) ---------- */
export interface SpaceNode {
    id: string;
    name: string;
    icon?: ReactNode;
    /** Counts or coverage, e.g. "9 records" or <Provenance kind="unknown" />. */
    meta?: ReactNode;
    children?: SpaceNode[];
}
export function SpaceItem({ node }: {
    node: SpaceNode;
}) {
    return (<TreeItem id={node.id} textValue={node.name} className={cx("plumb-tree-item")}>
      <TreeItemContent>
        {({ hasChildItems, isExpanded }) => (<div className={cx("plumb-element-div", "plumb-tree-row")}>
            {hasChildItems ? (<AriaButton slot="chevron" className={cx("plumb-tree-chevron")} data-expanded={isExpanded || undefined}><ChevronRight aria-hidden/></AriaButton>) : <span className={cx("plumb-element-span", "plumb-tree-spacer")}/>}
            {node.icon && <span className={cx("plumb-element-span", "plumb-tree-icon")} aria-hidden>{styleIcon(node.icon)}</span>}
            <span className={cx("plumb-element-span", "plumb-tree-name")}>{node.name}</span>
            {node.meta && <span className={cx("plumb-element-span", "plumb-tree-meta")}>{node.meta}</span>}
          </div>)}
      </TreeItemContent>
      {node.children?.map((c) => <SpaceItem key={c.id} node={c}/>)}
    </TreeItem>);
}
/** Property → floors → rooms → assets, with keyboard navigation and partial coverage. */
export function SpaceTree({ nodes, "aria-label": label, defaultExpandedKeys, selectedKey, onSelect }: {
    nodes: SpaceNode[];
    "aria-label": string;
    defaultExpandedKeys?: Key[];
    selectedKey?: Key;
    onSelect?: (key: Key) => void;
}) {
    return (<Tree aria-label={label} className={cx("plumb-tree")} defaultExpandedKeys={defaultExpandedKeys} selectionMode={onSelect ? "single" : "none"} selectedKeys={selectedKey ? [selectedKey] : undefined} onSelectionChange={(keys) => { const [k] = keys === "all" ? [] : [...keys]; if (k !== undefined)
        onSelect?.(k); }}>
      {nodes.map((n) => <SpaceItem key={n.id} node={n}/>)}
    </Tree>);
}
