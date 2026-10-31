import type { ReactNode } from "react";
import {
DisclosureGroup,
type Key
} from "react-aria-components";
import { cx } from "../cx";

/** Groups Disclosures; several can be open at once unless `allowsMultipleExpanded` is false. */
export function Accordion({ children, allowsMultipleExpanded = true, defaultExpandedKeys, className }: { children: ReactNode; allowsMultipleExpanded?: boolean; defaultExpandedKeys?: Key[]; className?: string }) {
  return (
    <DisclosureGroup className={cx("plumb-accordion", className)} allowsMultipleExpanded={allowsMultipleExpanded} defaultExpandedKeys={defaultExpandedKeys}>
      {children}
    </DisclosureGroup>
  );
}
