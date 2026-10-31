import type { ReactNode } from "react";
import { cx } from "../cx";

/** A keyboard key or shortcut, e.g. <Kbd>⌘K</Kbd>. */
export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return <kbd className={cx("plumb-element-kbd", cx("plumb-kbd", className))}>{children}</kbd>;
}
