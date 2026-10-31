import { ChevronLeft,ChevronRight } from "../icons";
import {
Breadcrumbs as AriaBreadcrumbs,
Link as AriaLink,
Breadcrumb
} from "react-aria-components";
import { cx } from "../cx";

/** On narrow screens Breadcrumbs collapse to a back link to the parent. */
export function Breadcrumbs({ items, className }: { items: { label: string; href?: string }[]; className?: string }) {
  const parent = items.length > 1 ? items[items.length - 2] : undefined;
  return (
    <>
    {parent?.href && <AriaLink href={parent.href} className={cx("plumb-link plumb-focusable plumb-back-link")} data-variant="quiet"><ChevronLeft aria-hidden /><span className={cx("plumb-element-span", "plumb-back-label")}>{parent.label}</span></AriaLink>}
    <AriaBreadcrumbs className={cx("plumb-breadcrumbs", className)}>
      {items.map((item, i) => (
        <Breadcrumb key={item.label} className={cx("plumb-breadcrumb")}>
          <AriaLink href={item.href} className={cx("plumb-link plumb-focusable")}>
            {item.label}
          </AriaLink>
          {i < items.length - 1 && <ChevronRight aria-hidden />}
        </Breadcrumb>
      ))}
    </AriaBreadcrumbs>
    </>
  );
}
