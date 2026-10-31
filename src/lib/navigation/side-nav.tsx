import { styleIcon } from "../icons";
import { useId, type ReactNode } from "react";
import { Link as AriaLink } from "react-aria-components";
import { cx } from "../cx";
export interface NavItem {
    id: string;
    label: string;
    icon?: ReactNode;
    href?: string;
    count?: ReactNode;
}
export interface SideNavProps {
    "aria-label": string;
    sections: {
        title?: string;
        items: NavItem[];
    }[];
    current?: string;
    onNavigate?: (id: string) => void;
}
/** Sidebar navigation in titled sections; marks the current page with `aria-current`. */
export function SideNav({ sections, current, onNavigate, className, ...props }: SideNavProps & {
    className?: string;
}) {
    const navId = useId();
    return (<nav className={cx("plumb-element-nav", cx("plumb-sidenav", className))} {...props}>
      {sections.map((section, i) => (<div key={section.title ?? i} className={cx("plumb-element-div", "plumb-sidenav-group")} role={section.title ? "group" : undefined} aria-labelledby={section.title ? `${navId}-${i}` : undefined}>
          {section.title && <div className={cx("plumb-element-div", "plumb-sidenav-section")} id={`${navId}-${i}`}>{section.title}</div>}
          {section.items.map((item) => (<AriaLink key={item.id} href={item.href} onPress={() => onNavigate?.(item.id)} aria-current={item.id === current ? "page" : undefined} data-current={item.id === current || undefined} className={cx("plumb-navlink plumb-focusable")}>
              {styleIcon(item.icon)}
              {item.label}
              {item.count !== undefined && <span className={cx("plumb-element-span", "plumb-navlink-count")}>{item.count}</span>}
            </AriaLink>))}
        </div>))}
    </nav>);
}
