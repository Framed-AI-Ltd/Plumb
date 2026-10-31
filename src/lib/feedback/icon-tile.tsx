import { styleIcon } from "../icons";
import type { ReactNode } from "react";
import { cx } from "../cx";
import type { CategoryColor } from "../layout";

export interface IconTileProps {
  icon: ReactNode;
  color?: CategoryColor;
  size?: "sm" | "md" | "lg";
}
/** CategoryColor square that gives an icon a home. */
export function IconTile({ icon, color = "brand", size = "md", className }: IconTileProps & { className?: string }) {
  return (
    <span className={cx("plumb-element-span", cx("plumb-icon-tile", className))} data-color={color} data-size={size} aria-hidden>
      {styleIcon(icon)}
    </span>
  );
}
