import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "../icons";
import type { ReactNode } from "react";
import {
Button as AriaButton,
Disclosure as AriaDisclosure,
Heading as AriaHeading,
DisclosurePanel,
type Key
} from "react-aria-components";
import { cx } from "../cx";

/* ---------- Disclosure / Accordion ---------- */
export interface DisclosureProps {
  id?: Key;
  title: ReactNode;
  /** Right side of the header: totals, counts, badges. */
  aside?: ReactNode;
  defaultExpanded?: boolean;
  /** Controlled open state. */
  isExpanded?: boolean;
  onExpandedChange?: (open: boolean) => void;
  className?: string;
  children: ReactNode;
}
/** Collapsible section: scope by room or trade, estimate working, history. */
export function Disclosure({ id, title, aside, defaultExpanded, isExpanded, onExpandedChange, className, children }: DisclosureProps) {
  return (
    <AriaDisclosure id={id} defaultExpanded={defaultExpanded} isExpanded={isExpanded} onExpandedChange={onExpandedChange} className={cx("plumb-disclosure", className)}>
      <div className={cx("plumb-element-div", "plumb-disclosure-head")}>
        <AriaHeading level={3} {...stylex.props(styles.heading)}>
          <AriaButton slot="trigger" className={cx("plumb-disclosure-trigger plumb-focusable")}>
            <ChevronRight className={cx("plumb-disclosure-chevron")} aria-hidden />
            {title}
          </AriaButton>
        </AriaHeading>
        {aside && <div className={cx("plumb-element-div", "plumb-disclosure-aside")}>{aside}</div>}
      </div>
      <DisclosurePanel className={cx("plumb-disclosure-panel")}><div className={cx("plumb-element-div", "plumb-disclosure-inner")}>{children}</div></DisclosurePanel>
    </AriaDisclosure>
  );
}

const styles = stylex.create({ heading: { margin: 0, flex: "1", display: "flex" } });
